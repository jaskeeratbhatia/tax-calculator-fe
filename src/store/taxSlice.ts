import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchTaxBandsAPI } from '../services/taxService';
import type { RootState } from './store'
import { TaxBand, TaxState } from './types'
import { taxDataTransformer } from './transformer'

// Define the initial state using that type
const initialState: TaxState = {
  totalTax: 0,
  taxBands: [],
  loading: false,
  error: '',
  salary: 0
}

export const fetchTaxBands = createAsyncThunk<
  { taxBands: TaxBand[]; totalTax: number, salary: number },
  { salary: number, year: number },
  { rejectValue: string }
>(
  "tax/fetchTaxBands",
  async ({ salary, year }, { rejectWithValue }) => {
    try {
      const data = await fetchTaxBandsAPI(year);
      const transformedData = taxDataTransformer(data.taxBands, salary)
      return transformedData;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch tax data");
    }
  }
);

export const taxSlice = createSlice({
  name: 'tax',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaxBands.pending, (state) => {
        state.totalTax = 0;
        state.taxBands = [];
        state.loading = true;
        state.salary = 0;
        state.error = "";
      })
      .addCase(fetchTaxBands.fulfilled, (state, action) => {
        state.taxBands = action.payload.taxBands;
        state.totalTax = action.payload.totalTax;
        state.salary = action.payload.salary;
        state.error = "";
        state.loading = false;
      })
      .addCase(fetchTaxBands.rejected, (state, action) => {
        state.totalTax = 0;
        state.taxBands = [];
        state.loading = false;
        state.salary = 0;
        state.error = action.payload as string;
      });
  },
})

// Other code such as selectors can use the imported `RootState` type
export const selectTaxDetails = (state: RootState) => state.tax
export default taxSlice.reducer