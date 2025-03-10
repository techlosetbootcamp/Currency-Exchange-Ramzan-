import { useState } from "react";
import { axiosInstance } from "../utiles/axiosInstance.ts";
import { fetchCountryByName } from "../store/slices/countrySlice.ts";
import { useAppDispatch } from "../store/store.ts";

export function useConverterHome() {
  const [amount, setAmount] = useState(0);
  const [updatedAmount, setUpdatedAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const[resultData,setResultData] = useState('')
  const dispatch = useAppDispatch()

  const handleAmountChange = () => {
    setAmount(updatedAmount);
    setUpdatedAmount(amount);
  };

  const convertHandle = async () => {
    if (!amount) {
      return alert("Enter amount");
    }
    try {
      const response = await axiosInstance.get(
        `pair/${fromCurrency}/${toCurrency}/${amount}`
      );
      setUpdatedAmount(response.data.conversion_result);
      setResultData(fromCurrency);
      dispatch(fetchCountryByName(fromCurrency));
    } catch (error) {
      console.error("Error fetching conversion data:", error);
      alert("Failed to fetch conversion data. Please try again.");
    }
  };

  return {
    amount,
    updatedAmount,
    setUpdatedAmount,
    fromCurrency,
    toCurrency,
    setAmount,
    setFromCurrency,
    setToCurrency,
    resultData,
    convertHandle,
    handleAmountChange,
  };
}