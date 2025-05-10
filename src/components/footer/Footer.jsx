import React from "react";
import FloatingFooter from "./utils/FloatingFooter";
import Col1 from "./utils/Col1";
import ColWrapper from "./utils/ColWrapper";
import { cards, companyLinks, faqLinks, helpLinks } from "@/utils/Constants";
import { VisaCardIcon } from "@/utils/Svgs";
import CreditCardWrapper from "./utils/CreditCardWrapper";

const Footer = () => {
  return (
    <div className="flex flex-row w-full relative bg-searchBarBg mt-[170px] sm:pb-[30px] pb-[77px]">
      <FloatingFooter />
      <div className="flex flex-col w-full lg:px-[100px] md:px-8 px-4 sm:pt-40 pt-52 sm:gap-y-8 gap-y-6">
        <div className="flex gap-y-4 flex-row w-full justify-between flex-wrap">
          <Col1 />
          <ColWrapper title={"Company"} list={companyLinks} />
          <ColWrapper title={"Help"} list={helpLinks} />
          <ColWrapper title={"FAQ"} list={faqLinks} />
        </div>

        <div className="sm:py-6 py-4 flex flex-row sm:justify-between justify-center gap-x-2 flex-wrap border-t border-t-black border-opacity-10 items-center gap-y-[18px]">
          <p className="opacity-60">Afriva © 2000-2023, All Rights Reserved</p>

          <div className="flex flex-row gap-x-3">
            {cards.map((card, index) => (
              <CreditCardWrapper icon={card} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
