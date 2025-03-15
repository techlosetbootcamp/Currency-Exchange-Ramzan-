import { useState } from "react";
import { axiosInstance } from "../utiles/axiosInstance.ts";
import { fetchCountryByName } from "../store/slices/countrySlice.ts";
import { useAppDispatch, useAppSelector } from "../store/store.ts";
import toast from "react-hot-toast";

export function useConverterHome() {
  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState<number | string>(0);
  const [updatedAmount, setUpdatedAmount] = useState<number | string>(0);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [resultData, setResultData] = useState<string>("");
  const [iconVisible, setIconVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<number | string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpenDrop, setIsOpenDrop] = useState<boolean>(false);
  const [isOpenMainDrop, setIsOpenMainDrop] = useState<boolean>(false);
  const [isOpenSubMainDrop, setIsOpenSubMainDrop] = useState<boolean>(false);

  // Redux state selectors
  const conNames = useAppSelector((store) => store.countrySlice.rates) || [];
  const dataData = useAppSelector((store) => store.countrySlice.dataData) || [];
  const resultRates =
    useAppSelector((store) => store.countrySlice.resultName) || [];
  const resultName =
    useAppSelector((store) => store.countrySlice.resultRates) || [];

  const rateIndex = resultName.indexOf(toCurrency) || "";

  const handleAmountChange = () => {
    setAmount(updatedAmount);
    setUpdatedAmount(amount);
  };

  const convertHandle = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const response = await axiosInstance.get(
        `pair/${fromCurrency}/${toCurrency}/${amount}`
      );
      setUpdatedAmount(response.data.conversion_result);
      setResultData(fromCurrency);
      dispatch(fetchCountryByName(fromCurrency));

      toast.success(`Converted ${amount} ${fromCurrency} to ${toCurrency}`);
    } catch (error) {
      console.error("Error fetching conversion data:", error);
      toast.error("Failed to fetch conversion data. Please try again.");
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
    iconVisible,
    setIconVisible,
    selected,
    setSelected,
    inputValue,
    setInputValue,
    isOpenDrop,
    setIsOpenDrop,
    isOpenMainDrop,
    setIsOpenMainDrop,
    isOpenSubMainDrop,
    setIsOpenSubMainDrop,
    conNames,
    dataData,
    resultRates,
    resultName,
    rateIndex,
  };
}
