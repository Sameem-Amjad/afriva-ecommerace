"use client";
import { Field, Select } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import Header from "./utils/Header";
import ProductCard from "@/components/cards/ProductCard";
import FilterModal from "./FilterModal";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredProducts } from "@/redux/features/filters/filterThunk";
const ProductList = ({ category }) => {

  const [isOpen, setIsOpen] = useState(false);
  // const [totalProducts, setTotalProducts] = useState(100);
  const [perPage] = useState(9);
  const { products, total, currentPage, filters } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const paginate = (pageNumber) => {
    dispatch(fetchFilteredProducts({ filters, page: pageNumber, limit: perPage }));
    // setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchFilteredProducts({ filters, page: 1, limit: perPage }));
  }
    , [filters, category, dispatch, perPage]);

  return (
    <div className="flex flex-row sm:w-[calc(100%-200px)] w-full flex-wrap gap-x-6 justify-between gap-y-6">
      <Header openModal={() => setIsOpen(true)} />

      <div className="flex flex-row w-full flex-wrap gap-x-6 justify-start gap-y-6">
        {products?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <Pagination
        perPage={perPage}
        totalData={total}
        paginate={paginate}
        currentPage={currentPage}
      />

      <FilterModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </div>
  );
};

export default ProductList;
