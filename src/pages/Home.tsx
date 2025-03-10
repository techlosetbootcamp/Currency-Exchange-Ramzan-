
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/button/Button.tsx";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { fetchCountry } from "../store/slices/countrySlice.tsx";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../store/store.tsx";

export default function Home() {
  const [amount, setAmount] = useState<number>(0);
  const [updatedAmount, setUpdatedAmount] = useState<number>(0);
  const [toCurrency, setToCurrency] = useState("EUR");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [iconVisible, setIconVisible] = useState(false);
  const [selected, setSelected] = useState<number | string>("");

  const [inputValue, setInputValue] = useState<string>("");

  const [isOpenDrop, setIsOpenDrop] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDropPopular, setIsOpenDropPopular] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const ConNames = useAppSelector((store) => store.countrySlice.rates) || [];
  const ConRates = useAppSelector((store) => store.countrySlice.names) || [];
  const dataData = useAppSelector((store) => store.countrySlice.dataData) || [];

  const nameIndex = ConNames.indexOf(fromCurrency) >= 0 ? ConNames.indexOf(fromCurrency) : -1;
  const rateIndex = ConNames.indexOf(toCurrency) >= 0 ? ConNames.indexOf(toCurrency) : -1;

  useEffect(() => {
    dispatch(fetchCountry());
  }, [dispatch]);

  const handleAmountChange = () => {
    setAmount(updatedAmount);
    setUpdatedAmount(amount);
  };

  const showInfo = () => {
    setIconVisible(true);
    setTimeout(() => {
      setIconVisible(false);
    }, 5000);
  };

  const convertHandle = async () => {
    if (!amount) {
      return alert("Enter amount");
    }

    try {
      const response = await axios.get(
        `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Z5ASNND7PH9Zv6nodjyWIhFdbKTt3dcMdSSajX10`
      );

      const conversionRates = response.data.data;

      const conversionRate =
        conversionRates[toCurrency] / conversionRates[fromCurrency];

      const result = amount * conversionRate;
      setUpdatedAmount(result);
    } catch (error) {
      console.error("Error fetching conversion data:", error);
      alert("Failed to fetch conversion data. Please try again.");
    }
  };

  const handleCurrencyChange = (currency: string) => {
    setToCurrency(currency);
    setIsOpen(false);
  };

  const handlePopularCurrencyDropdown = () => {
    setIsOpenDropPopular(!isOpenDropPopular);
    setIsOpenDrop(false);
  };

  return (
    <>
      <div className="bg-[#F0F5FF] text-center mt-20 py-10 max-h-[550px]">
        <h1 className="lg:text-5xl font-bold text-center text-3xl md:text-4xl">
          Currency Converter
        </h1>
        <p className="text-center mt-7 px-10 md:px-5">
          Need to make an international business payment? Take a look at our
          live foreign exchange rates.
        </p>

        <div className="px-5 md:px-0">
          <div className="bg-white py-9 md:w-[750px] lg:w-[850px] md:mx-auto md:mt-16 mt-8 rounded-md shadow-md hover:shadow-lg">
            <h1 className="lg:text-3xl text-xl md:text-2xl font-bold text-center max-w-[540px] mx-auto">
              Make fast and affordable international business payments
            </h1>
            <p className="text-center mt-7 px-4 md:px-5">
              Send secure international business payments in{" "}
              <span className="font-bold">XX</span> currencies, all at
              competitive rates with no hidden fees.
            </p>
            <div className="mt-8 px-11 md:px-8 flex flex-col space-y-2 md:flex md:flex-row justify-between items-center">
              <div className="flex flex-row">
                <div className="flex flex-col w-32 md:w-48 lg:w-56 text-start border space-y-1 border-[#C6C6C6] px-4 py-1">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="text"
                    className="outline-none focus:border focus:border-none bg-none font-bold text-xl md:text-2xl"
                    name="amount"
                    id="amount"
                    placeholder="0"
                    value={amount || ""}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>

                {/* From Currency Dropdown */}
                <div className="flex flex-col text-start border space-y-1 w-32 h-19 border-[#C6C6C6] relative">
                  <div
                    onClick={() => setIsOpenDrop(!isOpenDrop)}
                    className="border-none focus:border focus:h-16 mt-7 px-5 focus-within:outline-none font-bold text-xl md:text-2xl cursor-pointer bg-white rounded-md shadow-md p-3"
                  >
                    {fromCurrency || "Select Currency"}

                    <span className="ml-8 text-gray-500  text-sm ">
                      {isOpenDrop ? "˄" : "˅"}
                    </span>
                  </div>

                  {isOpenDrop && (
                    <ul className="absolute top-full left-0 w-full bg-white rounded-md shadow-lg mt-1 z-50 max-h-56 overflow-y-auto">
                      {ConNames?.map((con, i) => (
                        <li
                          key={con}
                          className={`p-2 hover:bg-gray-100 text-lg font-medium cursor-pointer ${
                            con.toLowerCase() === fromCurrency.toLowerCase()
                              ? "bg-gray-200 text-black"
                              : ""
                          }`}
                          onClick={() => {
                            setFromCurrency(con);
                            setIsOpenDrop(false);
                          }}
                        >
                          {con}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <button onClick={handleAmountChange} className="text-3xl mt-2">
                <LiaExchangeAltSolid />
              </button>

              <div className="flex flex-row">
                <div className="flex flex-col w-32 md:w-48 lg:w-56 text-start border space-y-1 border-[#C6C6C6] px-4 py-1">
                  <label htmlFor="fromCurrency">Converted to</label>
                  <input
                    type="text"
                    className="outline-none focus:border focus:border-none font-bold text-xl md:text-2xl"
                    name="fromCurrency"
                    id="fromCurrency"
                    readOnly
                    value={updatedAmount || 0}
                    onChange={(e) => setUpdatedAmount(Number(e.target.value))}
                  />
                </div>

                {/* To Currency Dropdown */}
                <div className="flex flex-col text-start border space-y-1 w-32 h-20 border-[#C6C6C6] relative">
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between border-none focus:border mt-7 px-5 focus-within:outline-none font-bold text-xl md:text-2xl cursor-pointer bg-white rounded-md shadow-md p-2"
                  >
                    <span>{toCurrency || "Select Currency"}</span>
                    <span className="text-gray-500  ml-8  text-sm ">{isOpen ? "˄" : "˅"}</span>
                  </div>

                  {isOpen && (
                    <ul className="absolute top-full left-0 w-full bg-white rounded-md shadow-lg mt-1 z-50 max-h-56 overflow-y-auto">
                      {ConNames?.length ? (
                        ConNames.map((con, i) => (
                          <li
                            key={con}
                            className={`p-2 hover:bg-gray-100 text-lg font-medium cursor-pointer ${
                              con === toCurrency ? "bg-gray-200 text-black" : ""
                            }`}
                            onClick={() => handleCurrencyChange(con)}
                          >
                            {con}
                          </li>
                        ))
                      ) : (
                        <li className="p-2 text-center text-gray-500">
                          No currencies available
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="text-start pl-12 mt-5">
              {updatedAmount ? (
                <>
                  <div className="flex items-center gap-2">
                    <p className="text-md font-medium">
                      {ConRates[nameIndex]} {"  "} {fromCurrency} ={"  "}
                      {ConRates[rateIndex]} {"  "} {toCurrency}
                    </p>
                    <div className="relative">
                      <p
                        onClick={showInfo}
                        className="bg-[#3D55DD] text-white rounded-full w-5 h-5 font-bold cursor-pointer text-center"
                      >
                        i
                      </p>
                      {iconVisible && (
                        <div className="fixed -ml-40 -mt-14 inset-0 bg-opacity- z-10 flex items-center justify-center">
                          <div className="bg-[#F0F5FF] text-[#3D55DD] p-[20px] rounded-md shadow-lg">
                            <p className="text-xl font-bold text-[#3D55DD]">
                              Exchange rate at 14:00 GMT.
                            </p>
                            <p className="mt-[25px]">
                              Live rates vary minute to minute. The <br />{" "}
                              quotes you receive here will differ to <br /> your
                              final trade amount.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div onClick={convertHandle} className="md:pr-14 md:text-end mt-9">
              <Button text="Get Started" pad="24" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-96 md:mt-72 md:ml-32 mx-5">
        <h1 className="lg:text-3xl text-xl md:text-2xl font-bold">
          Let's save you some time
        </h1>
        <p className="md:w-[550px] mt-7">
          If you've got a target exchange rate in mind but haven't got time to
          keep tabs on market movement, then a firm order could be perfect for
          you. When your chosen rate is reached, we'll act immediately, leaving
          you free to concentrate on your business.
        </p>
        <div className="mt-6">
          <Button link="/individual-currency" text="Find out more" />
        </div>
      </div>

      <div className="bg-[#F0F5FF] my-40 md:mt-64">
        <div
          style={{
            background: `url(${require("../assets/images/back.png")}) no-repeat center/cover`,
          }}
          className="p-6 sm:p-10 md:p-20"
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">
            Popular currencies
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-6 relative">
            <div className="relative w-full max-w-xs">
              <div
                onClick={handlePopularCurrencyDropdown}
                className={`text-xl flex select-none bg-white border-red-600 border-2 rounded-md justify-between p-2 items-center md:text-2xl font-bold cursor-pointer shadow-md`}
              >
                <span
                  className={`ml-2 ${selected === "" ? "text-[16px]" : ""} ${
                    selected === "" ? "text-gray-300" : ""
                  }`}
                >
                  {selected || "Select the Country"}
                </span>
                <span className="mr-2 text-gray-600">
                  <BiChevronDown size={20} />
                </span>
              </div>

              {isOpenDropPopular && (
                <div className="absolute top-full left-0 w-full bg-white rounded-md shadow-lg mt-1 z-50 max-h-56 overflow-y-auto">
                  <ul className="px-3 py-2 transition-all">
                    <div className="flex items-center bg-white py-2 px-3 sticky top-0 z-10 border-b border-gray-200">
                      <span className="text-gray-500">
                        <AiOutlineSearch size={20} />
                      </span>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                        placeholder="Search"
                        className="ml-2 w-full p-2 outline-none placeholder:text-gray-400 text-sm"
                      />
                    </div>
                    {dataData.length > 0 ? (
                      dataData
                        .filter((country) =>
                          country?.currency?.toLowerCase().includes(inputValue)
                        )
                        .map((country, i) => (
                          <li
                            key={i}
                            className={`p-2 hover:bg-gray-100 text-lg font-medium cursor-pointer ${
                              country?.currency?.toLowerCase() ===
                              selected.toLowerCase()
                                ? "bg-gray-200 text-black"
                                : ""
                            }`}
                            onClick={() => {
                              setSelected(country?.currency);
                              setIsOpenDropPopular(false);
                            }}
                          >
                            {country?.currency}
                          </li>
                        ))
                    ) : (
                      <li className="p-2 text-center text-gray-500">
                        No popular currencies found
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Positioning the Button Below the Search Bar */}
            <div className= "ml-1 ">
              <Button
                link={`convert?currency=${selected || "USD"}`}
                text="Go"
                pad="24"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


