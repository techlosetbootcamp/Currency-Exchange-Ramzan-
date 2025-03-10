import { useState } from "react";
import { axiosInstance } from "../utiles/axiosInstance.ts";
import { useAppDispatch } from "../store/store.ts";
import { fetchCountryByName } from "../store/slices/countrySlice.tsx";

export const useCurrencyConverter = () => {
  const [selamount, setSelAmount] = useState<number | string>(0);
  const [selUpdatedAmount, setSelUpdatedAmount] = useState<number | string>(0);
  const [resultData, setResultData] = useState("");
const dispatch = useAppDispatch()
  const convertHandler = async (
    from: string,
    to: string,
    amount: number | string
  ) => {
    if (!selamount) {
      return alert("Enter amount");
    }

    try {
      const endpoint = `/pair/${from}/${to}/${amount}`;
      const response = await axiosInstance.get(endpoint);
      const result = response?.data?.conversion_result || 0;
      setSelUpdatedAmount(result);
      dispatch(fetchCountryByName(from));
      setResultData(from)
    } catch (error) {
      console.error("Error fetching conversion data:", error);
      alert("Failed to fetch conversion data. Please try again.");
    }
  };

  return {
    selamount,
    setSelAmount,
    selUpdatedAmount,
    setSelUpdatedAmount,
    resultData,
    setResultData,
    convertHandler,
  };
};