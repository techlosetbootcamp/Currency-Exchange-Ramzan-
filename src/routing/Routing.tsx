import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.tsx";
import Individual from "../pages/Individual-currency.tsx";
import Convert from "../pages/Convert.tsx";
import Page404 from "../pages/Page404.tsx";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/individual-currency" element={<Individual />} />
      <Route path="/convert" element={<Convert />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
