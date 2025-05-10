import React from "react";
import Cart from "./Cart";
import Heart from "./Heart";
import Notification from "./Notification";
import User from "./User";
import Search from "./Search";

const OptionsWrapper = () => {
  return (
    <div className="flex flex-row items-center gap-x-3.5">
      {/* Saerch */}
      <Search />
      
      {/* cart */}
      <Cart />

      {/* heart */}
      <Heart />

      {/* Notification */}
      <Notification />

      {/* Profile */}
      <User />
    </div>
  );
};

export default OptionsWrapper;
