import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialStateType } from "../../types/type.tsx";
import { countryData } from "../../constants/constants.tsx";
import { axiosInstance } from "../../utiles/axiosInstance.ts";

export const fetchCountry = createAsyncThunk("country/fetch", async () => {
  const response = await axiosInstance.get("/latest/USD");
  const ratesArray = Object.keys(response.data.conversion_rates) as string[];
  const nameArray = Object.values(response.data.conversion_rates) as string[];
  return { nameArray, ratesArray };
});

export const fetchCountryByName = createAsyncThunk(
  "countryByName/fetch",
  async (name: string) => {
    const response = await axiosInstance.get(`/latest/${name}`);
    const ratesArray = Object.keys(response.data.conversion_rates) as string[];
    const nameArray = Object.values(response.data.conversion_rates) as string[];
    return { nameArray, ratesArray };
  }
);

const initialState: initialStateType = {
  names: [],
  rates: [],
  resultName: [],
  resultRates: [],
  dataData: countryData,
};

const countries = createSlice({
  name: "country",
  initialState,
  reducers: {
    CountryNames: (state, action) => {
      state.names = action.payload || [];
    },
    Rates: (state, action) => {
      state.rates = action.payload || [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCountry.fulfilled, (state, action) => {
      state.names = action.payload.nameArray || [];
      state.rates = action.payload.ratesArray || [];
    });
    builder.addCase(fetchCountryByName.fulfilled, (state, action) => {
      state.resultName = action.payload.nameArray || [];
      state.resultRates = action.payload.ratesArray || [];
    });
  },
});

export const { CountryNames, Rates } = countries.actions;

export default countries.reducer;