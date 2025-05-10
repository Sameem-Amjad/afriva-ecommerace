import Footer from "@/components/footer/Footer";
import Brands from "@/components/layouts/homepage/Brands";
import Browse from "@/components/layouts/homepage/Browse";
import Hero from "@/components/layouts/homepage/Hero";
import ProductsWrappers from "@/components/layouts/homepage/ProductsWrappers";
import Reviews from "@/components/layouts/homepage/Reviews";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Brands */}
      <Brands />

      {/* new Arrival */}
      <ProductsWrappers title={"NEW ARRIVALS"} viewAll={true} />

      <div className="w-full border-t border-t-black border-opacity-10 mt-16"></div>

      {/* Top selling */}
      <ProductsWrappers title={"TOP SELLING"} viewAll={true} />

      {/* Browse */}
      <Browse />

      {/* reviews */}
      <Reviews />

      {/* footer */}
      <Footer />
    </div>
  );
}
