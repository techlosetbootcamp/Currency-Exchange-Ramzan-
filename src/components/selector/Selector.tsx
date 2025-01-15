import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { countryData } from "../../constants/constants";

const Selectors: React.FC = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selected, setSelected] = useState<string>("EUR");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setCountries(countryData || []);
  }, []);

  return (
    <div className="w-full max-w-xs md:max-w-sm z-50 lg:max-w-md font-medium">
      {/* Selected Dropdown Header */}
      <div
        onClick={() => setOpen(!open)}
        className={`w-full p-3 flex items-center justify-between rounded-lg mt-5 font-bold text-2xl cursor-pointer ${
         !selected && "text-gray-500"
        }`}
      >
        <span>
          {selected
            ? selected.length > 25
              ? selected.substring(0, 25) + "..."
              : selected
            : "Select Country"}
        </span>
        <span className={`${open && "rotate-180"} transition-transform`}>
          <BiChevronDown size={20} />
        </span>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <ul
          className="bg-white mt-2 rounded-lg shadow-md overflow-y-auto max-h-60 transition-all"
          style={{ zIndex: 10 }}
        >
          {/* Search Input */}
           <div className="flex items-center px-3 sticky top-0 bg-white z-10 border-b border-gray-200">
            <span className="text-gray-500">
              <AiOutlineSearch size={18} />
            </span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
              placeholder="Enter country name"
              className="w-full p-2 outline-none placeholder:text-gray-400 text-sm"
            />
          </div> 

          {/* Country List */}
          {countries.length > 0 ? (
            countries
              .filter((country) =>
                country?.name?.toLowerCase().includes(inputValue)
              )
              .map((country) => (
                <li
                  key={country?.name}
                  className={`p-2 hover:bg-sky-600 text-md overflow-x-hidden font-bold hover:text-white cursor-pointer ${
                    country?.name.toLowerCase() === selected.toLowerCase()
                      ? "bg-sky-600 text-white"
                      : ""
                  }`}
                  onClick={() => {
                    setSelected(country?.currency);
                    setOpen(false);
                    setInputValue("");
                  }}
                >
                  {country?.currency}
                  <span className="ml-2 text-[12px]">{country?.name}</span>
                </li>
              ))
          ) : (
            <li className="p-2 text-sm text-gray-500 text-center">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Selectors;
