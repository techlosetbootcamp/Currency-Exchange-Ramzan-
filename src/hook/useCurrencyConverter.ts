import { useState } from "react";
import { axiosInstance } from "../utiles/axiosInstance.ts";
import { useAppDispatch } from "../store/store.ts";
import { fetchCountryByName } from "../store/slices/countrySlice.tsx";
import { toast } from "react-hot-toast";

export const useCurrencyConverter = () => {
  const [selamount, setSelAmount] = useState<number | string>(0);
  const [selUpdatedAmount, setSelUpdatedAmount] = useState<number | string>(0);
  const [resultData, setResultData] = useState("");

  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [iconVisible, setIconVisible] = useState<boolean>(false);
  const [isOpenDrop, setIsOpenDrop] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpenHo, setIsOpenHo] = useState<boolean>(false);
  const [conNames, setConNames] = useState<string[]>([]);
  const [dataData, setDataData] = useState<any[]>([]);
  const [resultRates, setResultRates] = useState<number[]>([]);
  const [resultName, setResultName] = useState<string[]>([]);
  const [rateIndex, setRateIndex] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  const convertHandler = async (
    from: string,
    to: string,
    amount: number | string
  ) => {
    if (!selamount || isNaN(Number(selamount))) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const endpoint = `/pair/${from}/${to}/${amount}`;
      const response = await axiosInstance.get(endpoint);
      const result = response?.data?.conversion_result || 0;

      setSelUpdatedAmount(result);
      dispatch(fetchCountryByName(from));
      setResultData(from);

      toast.success(`Successfully converted ${amount} ${from} to ${to}`);
    } catch (error) {
      console.error("Error fetching conversion data:", error);
      toast.error("Failed to fetch conversion data. Please try again.");
    }
  };

  const handleConvert = (from: string, to: string) => {
    convertHandler(from, to, selamount);
    toast.success("Currency successfully converted!");
  };

  const handleAmountChange = (value: string | number) => {
    setSelAmount(value);
  };

  const showInfo = () => {
    toast("This is an information message.");
  };

  return {
    selamount,
    setSelAmount,
    selUpdatedAmount,
    setSelUpdatedAmount,
    resultData,
    setResultData,
    convertHandler,
    handleConvert,
    selectedCurrency,
    setSelectedCurrency,
    iconVisible,
    setIconVisible,
    isOpenDrop,
    setIsOpenDrop,
    selected,
    setSelected,
    inputValue,
    setInputValue,
    isOpenHo,
    setIsOpenHo,
    conNames,
    setConNames,
    dataData,
    setDataData,
    resultRates,
    setResultRates,
    resultName,
    setResultName,
    rateIndex,
    setRateIndex,
    handleAmountChange,
    showInfo,
  };
};
