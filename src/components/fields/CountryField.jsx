"use client";
import { Select } from "@headlessui/react";
import React, { useEffect,  useState } from "react";
import {  getAllCountryDetails } from "world-countries-capitals";
const CountryField = (props) => {
  const allCountries =   getAllCountryDetails();
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleChange = (e) => {
    const selected = filteredCountries.find((c) => c.country === e.target.value);
    props.setValue(selected?.country);
    props.setCountryId(selected.phone_code); 
  };

  useEffect(() => {
    if (props?.continent) {
      const filtered = allCountries.filter((country) =>
        country?.continent?.toLowerCase().includes(props?.continent?.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  },[props?.continent,allCountries]);

  return (
    <div className="flex w-full flex-col gap-y-2">
      <label className="text-base font-medium text-black" htmlFor="email">
        {props.label}
      </label>
      <Select
         onChange={handleChange}
        value={props.value}
        className="block w-full rounded-md border focus:outline-placeholder px-4 py-3 text-xs text-black placeholder:text-placeholder font-medium"
      >
         <option value="">Select a country</option>
          {filteredCountries.map((country,index) => (
          <option key={index} value={country.country}>
            {country.country}
          </option>
        ))}
        {/* {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))} */}
      </Select>
    </div>
  );
};

export default CountryField;
