import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SalaryForm from './SalaryForm';
import { ChakraProvider } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'en',
    },
  }),
}));

// Mock useAppDispatch and useAppSelector
vi.mock('../../store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('SalaryForm Component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    // Mock the dispatch and selector
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({ loading: false });
  });

  const renderWithChakra = () => {
    return render(
      <ChakraProvider>
        <SalaryForm />
      </ChakraProvider>
    );
  };

  it('renders the SalaryForm component with inputs and submit button', () => {
    renderWithChakra();

    const salaryInput = screen.getByPlaceholderText('salaryForm.salaryPlaceholder');
    expect(salaryInput).toBeInTheDocument();

    const yearInput = screen.getByPlaceholderText('salaryForm.yearPlaceholder');
    expect(yearInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /salaryForm.submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('validates form and shows error messages for empty fields', async () => {
    renderWithChakra();

    const submitButton = screen.getByRole('button', { name: /salaryForm.submit/i });

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('salaryForm.salary')).toBeInTheDocument();
      expect(screen.getByText('salaryForm.year')).toBeInTheDocument();
    });
  });

  it('updates salary input and masks the value correctly', async () => {
    renderWithChakra();

    const salaryInput = screen.getByPlaceholderText('salaryForm.salaryPlaceholder') as HTMLInputElement;

    fireEvent.change(salaryInput, { target: { value: '50000' } });

    await waitFor(() => {
      expect(salaryInput.value).toBe('50,000');
    });
  });

  it('disables inputs and button when loading is true', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ loading: true });
    renderWithChakra();

    const salaryInput = screen.getByPlaceholderText('salaryForm.salaryPlaceholder');
    const yearInput = screen.getByPlaceholderText('salaryForm.yearPlaceholder');
    const submitButton = screen.getByRole('button', { name: /salaryForm.submit/i });

    expect(salaryInput).toBeDisabled();
    expect(yearInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
});
