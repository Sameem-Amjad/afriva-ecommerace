import { Field, Select } from "@headlessui/react";
import React from "react";

const SortDropdown = (props) => {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <Field>
        <Select
          onChange={(e) => props.setValue(e.target.value)}
          value={props.value}
          className="w-full rounded-full focus:outline-none px-5 py-3.5 text-xs text-black bg-searchBarBg font-medium"
          name="Select Account Type"
        >
          <option>Latest</option>
          <option>Lowest to Highest</option>
          <option>Highest to Lowest</option>
        </Select>
      </Field>
    </div>
  );
};

export default SortDropdown;
