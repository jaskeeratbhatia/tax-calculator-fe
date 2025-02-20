import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TaxInfo from './TaxInfo';
import { ChakraProvider } from '@chakra-ui/react';
import { vi } from 'vitest';
import * as hooks from '../../store/hooks';


// Mock Charts component
vi.mock('../charts/Charts', () => ({
  default: () => <div>Mocked Charts</div>,
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => (options?.bandRate ? `${options.bandRate}%` : key),
    i18n: {
      changeLanguage: vi.fn(),
      language: 'en',
    },
  }),
}));

describe('TaxInfo Component', () => {
  const renderWithChakra = () => {
    return render(
      <ChakraProvider>
        <TaxInfo />
      </ChakraProvider>
    );
  };

  // Mock useAppSelector
  const mockUseAppSelector = vi.spyOn(hooks, 'useAppSelector');

  it('renders loading spinner when loading is true', () => {
    mockUseAppSelector.mockReturnValue({
      loading: true,
      taxBands: [],
      totalTax: 0,
      error: '',
      salary: 0,
    });

    renderWithChakra();

    const spinner = screen.getByTestId('spinner-loader');
    expect(spinner).toBeInTheDocument();
  });

  it('renders error alert when there is an error', () => {
    mockUseAppSelector.mockReturnValue({
      loading: false,
      taxBands: [],
      totalTax: 0,
      error: 'Failed to fetch tax details',
      salary: 0,
    });

    renderWithChakra();

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText('error.message')).toBeInTheDocument();
    expect(screen.getByText('error.tryAgain')).toBeInTheDocument();
  });

  it('renders tax information correctly when data is available', () => {
    mockUseAppSelector.mockReturnValue({
      loading: false,
      taxBands: [
        { rate: 0.15, taxAmount: 1500 },
        { rate: 0.2, taxAmount: 2000 },
      ],
      totalTax: 3500,
      error: '',
      salary: 50000,
    });

    renderWithChakra();

    expect(screen.getByText('taxInfo.title')).toBeInTheDocument();
    expect(screen.getByText('taxInfo.taxPerBand')).toBeInTheDocument();

    expect(screen.getByText('15.0%')).toBeInTheDocument();
    expect(screen.getByText('20.0%')).toBeInTheDocument();
    expect(screen.getByText('taxInfo.totalTaxPaid')).toBeInTheDocument();
    expect(screen.getByText('$3,500.00')).toBeInTheDocument();

    // Check if Charts component is rendered
    expect(screen.getByText('Mocked Charts')).toBeInTheDocument();
  });
});
