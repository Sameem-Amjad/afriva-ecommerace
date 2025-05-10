"use client";
import { closeModalIcon, filterIcon } from "@/utils/Svgs";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment, useState } from "react";
import ClothesFilter from "./utils/ClothesFilter";
import PriceFilter from "./utils/PriceFilter";
import ColorsFilter from "./utils/ColorsFilter";
import SizeFilter from "./utils/SizeFilter";
import StyleFilter from "./utils/StyleFilter";
import RoundedButton from "@/components/buttons/RoundedButton";

const clothes = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];

const FilterModal = ({ isOpen, closeModal }) => {
  const [value, setValue] = useState([20, 37]);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 sm:hidden block"
        onClose={closeModal}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="p-5 relative w-full transform overflow-auto rounded-t-2xl bg-white pb-6 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-row w-full justify-between sm:pb-6 pb-4 border-b border-b-black border-opacity-10">
                  <p className="font-bold text-xl">Filters</p>

                  <div
                    onClick={closeModal}
                    className="flex cursor-pointer justify-center items-center p-3 rounded-md shadow-closeButtonShadow "
                  >
                    {closeModalIcon}
                  </div>
                </div>

                <ClothesFilter clothes={clothes} />

                <PriceFilter value={value} setValue={setValue} />

                <ColorsFilter />

                <SizeFilter />

                <StyleFilter />

                <RoundedButton
                  label="Apply Filter"
                  className=" bg-primary border-primary text-white font-medium w-full px-6 py-3.5"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FilterModal;
