import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Dashboard from './Dashboard';
import { ChakraProvider } from '@chakra-ui/react';

// Mock SalaryForm and TaxInfo to isolate Dashboard testing
vi.mock('../salary-form/SalaryForm', () => ({
  default: () => <div>Mocked SalaryForm</div>,
}));

vi.mock('../tax-info/TaxInfo', () => ({
  default: () => <div>Mocked TaxInfo</div>,
}));

describe('Dashboard Component', () => {
  const renderWithChakra = () => {
    return render(
      <ChakraProvider>
        <Dashboard />
      </ChakraProvider>
    );
  };


  it('renders SalaryForm component', () => {
    renderWithChakra();
    const salaryForm = screen.getByText('Mocked SalaryForm');
    expect(salaryForm).toBeInTheDocument();
  });

  it('renders TaxInfo component', () => {
    renderWithChakra();
    const taxInfo = screen.getByText('Mocked TaxInfo');
    expect(taxInfo).toBeInTheDocument();
  });

  it('applies correct layout styling', () => {
    renderWithChakra();
    const salaryFormBox = screen.getByText('Mocked SalaryForm').parentElement;
    const taxInfoBox = screen.getByText('Mocked TaxInfo').parentElement;

    expect(salaryFormBox).toHaveStyle('width: 100%');
    expect(taxInfoBox).toHaveStyle('width: 100%');
  });
});
