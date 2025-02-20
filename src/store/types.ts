export interface TaxState {
    totalTax: number;
    taxBands: Array<TaxBand>
    loading: boolean;
    error: string;
    salary: number;

}
export interface TaxBandDTO {
    min: number,
    max?: number,
    rate: number,
}

export interface TaxBand extends TaxBandDTO {
    taxAmount: number
}