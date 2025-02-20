import { TaxBandDTO, TaxState } from './types'

export const taxDataTransformer: (taxBands: Array<TaxBandDTO>, salary: number) => Pick<TaxState, 'taxBands' | 'totalTax' | 'salary'> = (taxBands, salary) => {
    let totalTax = 0;
    const sortedBands = taxBands.sort((a, b) => a.min - b.min);
    const updatedBands = sortedBands.map((band) => {
        const { min, max, rate } = band;
        const taxableIncome = Math.max(0, Math.min(salary, max ?? salary) - min);
        const taxAmount = taxableIncome * rate;
        totalTax += taxAmount;

        return {
            ...band,
            taxAmount: parseFloat(taxAmount.toFixed(2)),
        };
    });
    return {
        taxBands: updatedBands,
        totalTax: parseFloat(totalTax.toFixed(2)),
        salary
    };
}
