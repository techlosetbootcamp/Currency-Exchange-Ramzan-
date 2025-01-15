import React from "react";
import { Link } from "react-router-dom";

const paddingClasses = {
  4: "px-4",
  8: "px-8",
  16: "px-16",
  24: "px-24",
};

export default function Button(props) {
  return (
    <>
      <Link
        to={props.link || "#"}
        className={`border bg-red-600  ${
          paddingClasses[props.pad] || "px-4"
        } py-3 rounded-md text-white font-medium hover:bg-white hover:border-red-600 hover:text-black transition-all duration-500`}
      >
        {props.text || "Button"}
      </Link>
    </>
  );
}
