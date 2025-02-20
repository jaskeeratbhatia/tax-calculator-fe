import axios from "axios";
import { TaxBandDTO } from "../store/types";

const API_BASE_URL = "http://localhost:5001";
const TAX_YEAR_ENDPOINT = "tax-calculator/tax-year"

export const fetchTaxBandsAPI = async (
    year: number
): Promise<{ taxBands: TaxBandDTO[] }> => {
    const response = await axios.get(`${API_BASE_URL}/${TAX_YEAR_ENDPOINT}/${year}`);
    if (response.data && response.data?.tax_brackets) {
        return { taxBands: response.data.tax_brackets }
    }
    return { taxBands: [] }
};
