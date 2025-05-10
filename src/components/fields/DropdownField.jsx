import React from "react";

const continents = [
  { name: "Africa", code: "AF" },
  { name: "Asia", code: "AS" },
  { name: "Europe", code: "EU" },
  { name: "North America", code: "NA" },
  { name: "South America", code: "SA" },
  { name: "Oceania", code: "OC" },
];

const DropdownField = (props) => {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <label className="text-base font-medium text-black" htmlFor="dropdown">
        {props.label}
      </label>
      <select
        id="dropdown"
        onChange={(e) => props.setValue(e.target.value)}
        value={props.value}
        className="block w-full rounded-md border focus:outline-placeholder px-4 py-3 text-xs text-black placeholder:text-placeholder font-medium"
        name="Select Account Type"
      >
        <option value="">Select a continent</option>
        {continents.map((continent, index) => (
          <option key={index} value={continent.code}>
            {continent.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownField;
