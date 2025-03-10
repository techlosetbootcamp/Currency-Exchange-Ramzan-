
import React from "react";
import Button from "../components/button/Button.tsx";
import Card from "../components/card/Card.tsx";
import { cardData } from "../constants/constants.ts";

export default function IndividualCurrency() {
  return (
    <>
      <div className="bg-light overflow-hidden md:flex justify-center gap-16 md:px-14 px-4 items-center mt-16 py-16 max-h-[650px]">
        <div className="md:max-w-[350px] lg:max-w-[590px]">
          <h1 className="lg:text-5xl font-bold text-start text-3xl md:text-4xl">
            United States Dollar
          </h1>
          <p className="mt-7">
            The United States Dollar is the official currency of the United
            States and several other countries. Its currency code is USD and
            it's symbolised using the $ sign. $1 is made up of 100 cents. With a
            World Account, you can pay and collect USD using local bank details
            - and you don't need an overseas address.
          </p>
          <div className="mt-8">
            <Button text="Compare rates" pad={16} link="/" />
          </div>
        </div>
        <div className="mt-8">
          <img src={require("../assets/images/Vector.png")} alt="" />
        </div>
      </div>

      <div className="mt-24 text-center">
        <h1 className="lg:text-3xl text-xl md:text-2xl font-bold text-center max-w-[540px] mx-auto">
          Exchange USD without hidden fees
        </h1>
        <p className="text-center lg:w-[850px] md:w-[700px] px-3 mx-auto mt-5">
          Wherever you need to send US dollars, our pricing is clear and simple.
          Our model is made up of two parts: an FX rate and a small payment fee
          - that's it. So what you see at the time of your transaction is
          exactly what you'll pay - there are no hidden charges.
        </p>
      </div>

      <div className="flex md:max-w-[599px] lg:max-w-[850px] mx-auto gap-2 justify-center md:justify-start px-3 md:gap-5 items-center flex-wrap mt-16 mb-52">
        {cardData?.map((card, index) => (
          <Card key={index} to={card?.to} from={card?.from} />
        ))}
      </div>
    </>
  );
}