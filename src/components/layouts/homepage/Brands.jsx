// "use client"
// import { fetchBrandsImages } from "@/redux/features/home/homeThunk";
// import Image from "next/image";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const Brands = () => {
//   const dispatch = useDispatch();
//   const { brandsImages } = useSelector((state) => state.home);
//   useEffect(() => {
//     dispatch(fetchBrandsImages());
//   }
//     , [dispatch]);
//   return (
//     <div className="flex flex-row lg:px-[100px] md:px-8 px-4 md:justify-between justify-center gap-4 gap-y-5 flex-wrap bg-brandsbg py-10">
//       <Image
//         src="/images/versace.png"
//         width={166.48}
//         height={33.16}
//         alt="Hero-image"
//       />
//       <Image
//         src="/images/zara.png"
//         width={91}
//         height={37.98}
//         alt="Hero-image"
//       />
//       <Image
//         src="/images/gucci.png"
//         width={156}
//         height={32.29}
//         alt="Hero-image"
//       />
//       <Image
//         src="/images/prada.png"
//         width={194}
//         height={31.2}
//         alt="Hero-image"
//       />
//       <Image
//         src="/images/ck.png"
//         width={206.79}
//         height={33.35}
//         alt="Hero-image"
//       />
//     </div>
//   );
// };

"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandsImages } from "@/redux/features/home/homeThunk";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Brands = () => {
  const dispatch = useDispatch();
  const { brandsImages } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchBrandsImages());
  }, [dispatch]);

  return (
    <div className="bg-brandsbg">
      <Swiper
        loop={true}
        freeMode={true}
        modules={[FreeMode, Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 1000, disableOnInteraction: false, pauseOnMouseEnter: true, }}
        className="px-4 lg:px-[10px] md:px-8"
      >
        {brandsImages?.map((brand, index) => (
          <SwiperSlide key={index}>
            <Image
              src={brand.logo_url || null}
              width={106.48}
              height={33.16}
              alt={brand.name}
              className="mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
