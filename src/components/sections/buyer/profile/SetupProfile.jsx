
import { pencilIconProfile } from "@/svgs";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "@/redux/features/auth/authThunk";
import { toast } from "sonner";

const SetupProfile = () => {
  const dispatch = useDispatch();
  const { buyers, user } = useSelector((state) => state.users);

  const [preview, setPreview] = useState(buyers?.imageUrl || "/images/profile-avatar.jpeg");
  const [name, setName] = useState(buyers?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(buyers?.phonenumber || "");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = () => {
    dispatch(
      updateUserProfile({
        userId: user?.id,
        userData: {
          name: name == "" ? buyers?.name : name, phoneNumber: phoneNumber == "" ? buyers?.phonenumber : phoneNumber
        },
        profilePicture,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile: ", error);
        toast.error("Failed to update profile. Please try again.");
      });
  };

  return (
    <div className="w-full rounded-[12px] bg-white px-[24px] py-[40px] shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">Profile Settings</h1>
          <p className="text-lg font-medium text-grayDark">{buyers?.email}</p>
        </div>
        <button
          onClick={handleSaveChanges}
          className="rounded-[44px] bg-primary text-white px-[15px] py-[10px] text-base font-semibold md:px-[36.5px] md:py-[14px]"
        >
          Save Changes
        </button>
      </div>
      <hr className="my-[20px]" />
      <div className="flex flex-col-reverse gap-10 lg:gap-3 flex-wrap items-center justify-center md:flex-row-reverse md:flex-nowrap md:justify-normal">
        <div className="flex w-full flex-col gap-[20px]">
          <div className="flex w-full flex-col gap-1">
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="hs-floating-input-email"
                className="peer p-4 block w-full md:w-3/5 text-lg rounded-lg placeholder:text-transparent border border-slate-200 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                placeholder="Ahmed"
              />
              <label htmlFor="hs-floating-input-email"
                className="absolute top-0 text-black start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">
                {buyers?.name}
              </label>
            </div>
          </div>
          <div className="flex w-full flex-col gap-1">
            <div className="relative">
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\+?\d*$/.test(value)) {
                    setPhoneNumber(value);
                  }
                }}
                id="hs-floating-input-email"
                className="peer p-4 block w-full md:w-3/5 text-lg rounded-lg placeholder:text-transparent border border-slate-200 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
                placeholder="123 456 789"
              />
              <label htmlFor="hs-floating-input-email"
                className="absolute top-0 text-black start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">
                {buyers?.phonenumber}
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[28px] px-[15px]">
          <div className="relative">
            <Image
              className="h-[120px] w-[120px] rounded-xl object-cover"
              src={buyers?.profile_image || preview || null}
              width={500}
              height={500}
              alt="Profile Picture"
            />
            <div className="absolute -bottom-[10px] right-[10%] flex cursor-pointer items-center gap-[5px]">
              <div className="cursor-pointer rounded-[6px] bg-white p-[6px] shadow-md">
                {pencilIconProfile}
                <label
                  htmlFor="upload-button"
                  className="absolute inset-0 cursor-pointer"
                  style={{ opacity: 0 }}
                ></label>
                <input
                  id="upload-button"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupProfile;