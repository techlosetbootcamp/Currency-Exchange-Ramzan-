
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypeOfArray } from "../../types/Type.tsx";
import axios from "axios";
import { countryData } from "../../constants/Constants.tsx";

export const axiosInstance = axios.create({
  baseURL: "https://api.freecurrencyapi.com/v1/",
  timeout: 5000,
});

export const fetchCountry = createAsyncThunk("country/fetch", async () => {
  try {
    const response = await axiosInstance.get("/latest?apikey=fca_live_Z5ASNND7PH9Zv6nodjyWIhFdbKTt3dcMdSSajX10");
    const ratesArray = Object.keys(response.data.data) as string[];
    const nameArray = Object.values(response.data.data) as string[];
    return { nameArray, ratesArray };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch currency data");
  }
});

const initialState: TypeOfArray = {
  names: [],
  rates: [],
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
  },
});

export const { CountryNames, Rates } = countries.actions;

export default countries.reducer;
