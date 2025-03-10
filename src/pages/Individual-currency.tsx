

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Button from "../components/button/Button.tsx";
import Card from "../components/card/Card.tsx";
import { cardData } from "../constants/Constants.tsx";

export default function IndividualCurrency() {
  const [isIPhone14, setIsIPhone14] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (
      /iphone/.test(userAgent) &&
      [844, 852, 932].includes(window.screen.height)
    ) {
      setIsIPhone14(true);
    }
  }, []);

  const filteredCardData = cardData.filter((card) =>
    card.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.from.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGoClick = () => {
    navigate(`/convert?from=${searchTerm.split(' → ')[0]}&to=${searchTerm.split(' → ')[1]}`);
  };

  return (
    <>
      {isIPhone14 ? (
        <>
          <div className="mt-24 text-center">
            <h1 className="lg:text-3xl text-xl md:text-2xl font-bold max-w-[540px] mx-auto">
              Exchange USD without hidden fees
            </h1>
            <p className="lg:w-[850px] md:w-[700px] px-3 mx-auto mt-5">
              Wherever you need to send US dollars, our pricing is clear and simple. Our model is made up of two parts: an FX rate and a small payment fee - that's it. So what you see at the time of your transaction is exactly what you'll pay - there are no hidden charges.
            </p>
          </div>

          <div className="w-[374px] h-[463px] border border-gray-300 rounded-lg fixed top-[500px] left-[27px] p-4 bg-white shadow-md flex flex-col justify-between">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 fixed bottom-28 left-0 w-full text-center">
                Lock in a great USD rate
              </h2>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed fixed bottom-3 left-0 w-full text-center">
                Worried about movement in the currency market? Lock in an exchange rate for up to two years with a forward contract.
              </p>
            </div>
          </div>

          <div className="w-full max-w-[400px] mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)} 
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} 
                placeholder="Select a currency"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />

              {isDropdownOpen && filteredCardData.length > 0 && (
                <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md max-h-60 overflow-y-auto">
                  {filteredCardData.map((card, index) => (
                    <li
                      key={index}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={() => {
                        setSearchTerm(`${card.to} → ${card.from}`);
                        setIsDropdownOpen(false); 
                      }}
                    >
                      {card.to} → {card.from}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex justify-center"> 
                <button
                  className="mt-4 w-[250px] py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-blue-300"
                  onClick={handleGoClick}
                >
                  Go
                </button>
              </div>

            </div>
          </div>
        </>
      ) : (
        <>
          {/* Non-iPhone 14 users get the full content */}
          <div className="bg-[#F0F5FF] overflow-hidden md:flex justify-center gap-16 md:px-14 px-4 items-center mt-16 py-16 max-h-[650px]">
            <div className="md:max-w-[350px] lg:max-w-[590px]">
              <h1 className="lg:text-5xl font-bold text-start text-3xl md:text-4xl">
                United States Dollar
              </h1>
              <p className="mt-7">
                The United States Dollar is the official currency of the United States and several other countries. Its currency code is USD and it's symbolised using the $ sign. $1 is made up of 100 cents. With a World Account, you can pay and collect USD using local bank details - and you don't need an overseas address.
              </p>
              <div className="mt-8">
                <Button text="Compare rates" pad="16" link="/" />
              </div>
            </div>
            <div className="mt-8">
              <img src={require("../assets/images/vector.png")} alt="USD Illustration" />
            </div>
          </div>

          <div className="mt-24 text-center">
            <h1 className="lg:text-3xl text-xl md:text-2xl font-bold max-w-[540px] mx-auto">
              Exchange USD without hidden fees
            </h1>
            <p className="lg:w-[850px] md:w-[700px] px-3 mx-auto mt-5">
              Wherever you need to send US dollars, our pricing is clear and simple. Our model is made up of two parts: an FX rate and a small payment fee - that's it. So what you see at the time of your transaction is exactly what you'll pay - there are no hidden charges.
            </p>
          </div>

          {/* Display filtered cards based on search for non-iPhone 14 users */}
          <div className="flex md:max-w-[599px] lg:max-w-[850px] mx-auto gap-2 justify-center md:justify-start px-3 md:gap-5 items-center flex-wrap mt-16 mb-52">
            {filteredCardData.map((card, index) => (
              <Card key={index} to={card.to} from={card.from} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
