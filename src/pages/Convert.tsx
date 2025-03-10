
import React, { useState, useEffect } from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import Button from "../components/button/Button.tsx";
import { fetchCountry } from "../store/slices/countrySlice.tsx";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../store/store.ts";
import { useQueryParams } from "../hook/useQueryParams";
import { useCurrencyConverter } from "../hook/useCurrencyConverter";
import { ImCross } from "react-icons/im";

export default function Convert() {
  const getQueryParam = useQueryParams();
  const {
    selamount,
    setSelAmount,
    selUpdatedAmount,
    setSelUpdatedAmount,
    resultData,
    convertHandler,
  } = useCurrencyConverter();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [iconVisible, setIconVisible] = useState<boolean>(false);
  const [isOpenDrop, setIsOpenDrop] = useState<boolean>(false);
  const [selected, setSelected] = useState<number | string>("EUR");
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpenHo, setIsOpenHo] = useState<boolean>(false);

  const conNames = useAppSelector((store) => store.countrySlice.rates) || [];
  const dataData = useAppSelector((store) => store.countrySlice.dataData) || [];
  const resultRates =
    useAppSelector((store) => store.countrySlice.resultName) || [];
  const resultName =
    useAppSelector((store) => store.countrySlice.resultRates) || [];

  const rateIndex = resultName.indexOf(selected) || "";

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCountry());
    const currency = getQueryParam("currency") || "";
    const to = getQueryParam("to") || "";
    const from = getQueryParam("from") || "";

    if (currency) setSelectedCurrency(currency);
    if (from) setSelectedCurrency(from);
    if (to) setSelected(to);
  }, [dispatch]);

  const handleAmountChange = () => {
    setSelAmount(selUpdatedAmount);
    setSelUpdatedAmount(selamount);
  };

  const showInfo = () => {
    setIconVisible(!iconVisible);
  };

  return (
    <>
      <div className="pt-5 pl-2">
        <Button text="Home" link="/" />
      </div>
      <div className="bg-light md:px-14 px-4 items-center mt-16 py-16 max-h-[450px]">
        <div className="md:max-w-[350px] mx-auto lg:max-w-[590px]">
          <h1 className="lg:text-5xl font-bold text-center text-3xl md:text-4xl">
            Convert {selectedCurrency || "USD"} to {selected || "GBP"}
          </h1>
        </div>

        <div className="px-5 md:px-0">
          <div className="bg-white mb-20 py-9 md:w-[750px] lg:w-[850px] md:mx-auto md:mt-16 mt-8 rounded-md shadow-md hover:shadow-lg">
            <h1 className="lg:text-3xl text-xl md:text-2xl font-bold text-center max-w-[540px] mx-auto">
              Make fast and affordable international business payments
            </h1>
            <p className="text-center mt-7 px-4 md:px-5">
              Send secure international business payments in{" "}
              <span className="font-bold">{dataData.length}</span> currencies,
              all at competitive rates with no hidden fees.
            </p>
              <div className="mt-8 px-11 md:px-8 flex flex-col space-y-2 md:flex md:flex-row justify-between items-center">
              <div className="flex flex-row">
                <div className="flex flex-col w-32 md:w-48 lg:w-56 text-start border space-y-1 border-secondary px-4 py-1">
                  <label htmlFor="selamount">Amount</label>
                  <input
                    type="text"
                    className="outline-none focus:border-none bg-none font-bold text-xl md:text-2xl"
                    name="selamount"
                    id="selamount"
                    placeholder="0"
                    value={selamount || ""}
                    onChange={(e) => setSelAmount(e.target.value)}
                  />
                </div>
                <div className="flex flex-col text-start border space-y-1 w-32 h-20 border-secondary">
                  <div
                    onClick={() => setIsOpenHo(!isOpenHo)}
                    className="text-center flex ml-5 items-center gap-3 font-bold mt-7 text-xl md:text-2xl"
                  >
                    <div className="select-none">
                      {selectedCurrency || "USD"}
                    </div>
                    <div className="ml-5">
                      <BiChevronDown size={20} />
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={handleAmountChange} className="text-3xl mt-2">
                <LiaExchangeAltSolid />
              </button>
              <div className="flex flex-row">
                <div className="flex flex-col w-32 md:w-48 lg:w-56 text-start border space-y-1 border-secondary px-4 py-1">
                  <label htmlFor="fromCurrency">Converted to</label>
                  <input
                    type="text"
                    className="outline-none focus:border-none font-bold text-xl md:text-2xl"
                    name="fromCurrency"
                    readOnly
                    value={selUpdatedAmount}
                  />
                </div>
                <div className="flex select-none flex-col text-start border space-y-1 w-32 h-20 border-secondary">
                  <div
                    onClick={() => setIsOpenDrop(!isOpenDrop)}
                    className="text-xl flex select-none mb-4 justify-between items-center md:text-2xl font-bold text-center mt-7"
                  >
                    <span className="ml-5">{selected}</span>
                    <BiChevronDown size={20} />
                  </div>
                  {isOpenDrop && (
                    <div className="sm:w-[350px] md:w-[320px] md:-ml-48 lg:-ml-56 lg:w-[350px] w-[255px] z-50 -ml-32 sm:-ml-56 shadow-lg">
                      <ul className="bg-white px-3 rounded-lg shadow-md overflow-y-auto max-h-60 transition-all">
                        <div className="flex items-center bg-white py-2 px-3 sticky top-0 z-10 border-b border-gray-200">
                          <span className="text-gray-500">
                            <AiOutlineSearch size={25} />
                          </span>
                          <input
                            type="text"
                            value={inputValue}
                            onChange={(e) =>
                              setInputValue(e.target.value.toLowerCase())
                            }
                            placeholder="Search"
                            className="w-full p-2 outline-none placeholder:text-gray-400 text-sm"/>
                          
                        </div>
                        <hr className="border border-gray-300" />
                        {dataData.length > 0
                          ? dataData
                              .filter((country) =>
                                country?.name
                                  ?.toLowerCase()
                                  .includes(inputValue)
                              )
                              ?.map((country, i) => (
                                <li
                                  key={i}
                                  className={`p-2 hover:bg-gray-100 text-xl font-bold hover:text-black cursor-pointer ${
                                    country?.currency?.toLowerCase() ===
                                    selected.toLowerCase()
                                      ? "bg-gray-200 text-black"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    setSelected(country?.currency);
                                    setIsOpenDrop(false);
                                    setInputValue("");
                                  }}>
                                
                                  {country?.currency}{" "}
                                  <span className="ml-3 text-sm">
                                    {country?.name}
                                  </span>
                                </li>
                              ))
                          : ""}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isOpenHo && (
              <div
                className={`absolute lg:-mt-[5px] -mt-[125px] lg:w-[355px] md:w-[315px] lg:ml-8 md:ml-[80px] ml-[24px] ${
                  selUpdatedAmount
                    ? "md:-mt-[144px] -mt-[267px]"
                    : "-mt-[102px]"
                } z-30 md:w-[352px] w-[256px] bg-white border-2 rounded-md shadow-md overflow-y-auto max-h-56`}
              >
                {conNames?.map((con, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedCurrency(con);
                        setIsOpenHo(false);
                      }}
                      className="px-4 py-2 text-xl pr-11 text-end font-bold hover:bg-gray-100 cursor-pointer"
                    >
                      {con}
                    </div>
                  );
                })}
              </div>
            )}

            {resultData === selectedCurrency ? (
              <div className="text-start pl-12 mt-5">
                {selUpdatedAmount ? (
                  <>
                    <div className="flex items-center gap-2">
                      <p className="text-md font-medium">
                        {1}
                        {"  "} {selectedCurrency} ={"  "}
                        {resultRates[rateIndex]}
                        {"  "} {selected}
                      </p>
                      <div className="relative">
                        <p
                          onClick={showInfo}
                          className="bg-primary text-white rounded-full w-5 h-5 font-bold cursor-pointer text-center"
                        >
                          i
                        </p>
                        {iconVisible && (
                          <div className="fixed -ml-40 -mt-14 inset-0 bg-opacity- z-10 flex items-center justify-center">
                            <div className="bg-light text-primary p-[20px] rounded-md shadow-lg">
                              <p
                                className="float-end cursor-pointer"
                                onClick={() => setIconVisible(false)}
                              >
                                <ImCross />
                              </p>
                              <p className="text-xl font-bold text-primary">
                                Exchange rate at 14:00 GMT.
                              </p>
                              <p className="mt-[25px]">
                                Live rates vary minute to minute. The <br />{" "}
                                quotes you receive here will differ to <br />{" "}
                                your final trade amount.
                                <br />
                                <p className="mt-[20px]">
                                  Lorem ipsum dolor sit amet <br /> consectetur
                                  adipiscing elit mod duo sed <br /> eiusmod
                                  lorem ipsum dolor sit amet
                                  <br /> consectetur adipiscing elit mod duo.
                                </p>
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
            ) : (
              ""
            )}
            <div
              onClick={() =>
                convertHandler(selectedCurrency, selected, selamount)
              }
              className="md:pr-14 text-center md:text-end mt-9"
            >
              <Button text="Convert" pad={24} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}