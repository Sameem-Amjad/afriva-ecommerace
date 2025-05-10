"use client"
import { fetchBuyerById, logout } from "@/redux/features/auth/authThunk";
import { logoutIcon,signupIcon } from "@/utils/Svgs";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { buyers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchBuyerById(user?.id));
  }, [user?.id, dispatch]);

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <div className="overflow-hidden">
            <PopoverButton
              className={`w-9 h-9 rounded-full bg-white focus-visible:outline-none`}
            >
              <Image
                src={buyers?.profile_image || "/images/user.png"}
                alt="user"
                width={36}
                height={36}
                className="rounded-full w-9 h-9"
              />
            </PopoverButton>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              anchor="bottom end"
              className="mt-2 w-44 bg-white drop-shadow-lg px-4 py-3 rounded-lg min-w-[224px] flex flex-col gap-y-4 z-50"
            >
              {
                user ? (
                  <>                  <Link className="flex flex-row gap-x-4" href="/profile">
                    <Image
                      src={buyers?.profile_image}
                      alt="user"
                      width={28}
                      height={28}
                      className="rounded-full w-7 h-7"
                    />
                    My Account
                  </Link>

                    <Link
                    onClick={()=>dispatch(logout())}
                      className="flex flex-row gap-x-4 text-errorColor"
                      href="/login"
                    >
                      <div className="w-7 h-7 flex justify-center items-center ">
                        {logoutIcon}
                      </div>
                      Logout
                    </Link>
                  </>

                ) :
                  (
                    <>
                    <Link className="flex flex-row gap-x-4" href="/login">
                      <Image
                        src={"/images/user.png"}
                        alt="user"
                        width={28}
                        height={28}
                        className="rounded-full w-7 h-7"
                      />

                      Login
                      <div className="w-7 h-7 flex justify-center rotate-180 items-center ">
                        {logoutIcon}
                      </div>
                    </Link>
                    <Link
                      className="flex flex-row gap-x-4 text-errorColor"
                      href="/signup"
                    >
                       <Image
                        src={"/images/user.png"}
                        alt="user"
                        width={28}
                        height={28}
                        className="rounded-full w-7 h-7"
                      />
                      <div className="w-7 h-7  flex justify-center items-center ">
                        {signupIcon}
                      </div>
                      Sign Up
                    </Link>
                    </>
                  )
              }

            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default User;
