import { pencilIcon, userIcon } from "@/utils/Svgs";
import Image from "next/image";
import React from "react";
import { uploadImage } from "@/redux/features/auth/authDB";

const ProfilePicker = (props) => {
  const [preview, setPreview] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const inputRef = React.useRef();

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile)); // Set preview for the image
      props.setProfile(selectedFile); // Pass the file to the parent component

      try {
        setUploading(true); // Set uploading state to true
        const fileName = `profile_${Date.now()}`; // Generate a unique file name
        const bucketName = "profile_images"; // Bucket name
        const path = `${fileName}`; // Path in the bucket

        // Upload the image to the bucket
        const publicUrl = await uploadImage(selectedFile, bucketName, path);

        if (publicUrl) {
          console.log("Image uploaded successfully:", publicUrl);
          props.setProfileUrl(publicUrl); // Pass the public URL to the parent component
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false); // Reset uploading state
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current.click()}
      className={`relative bg-secondaryText cursor-pointer rounded-full w-[140px] h-[140px] flex items-center justify-center shadow-profileShadow`}
    >
      <div className="flex w-full h-full overflow-hidden rounded-full items-center justify-center">
        {preview ? (
          <Image
            src={preview}
            width={140}
            height={140}
            alt="profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-gray-500">{userIcon}</div>
        )}
        <input
          ref={inputRef}
          id="upload-button"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      <div className="w-8 h-8 rounded-full bg-primary flex justify-center items-center absolute bottom-2 right-0">
        {uploading ? (
          <span className="loader"></span> // Add a loader if needed
        ) : (
          pencilIcon
        )}
      </div>
    </div>
  );
};

export default ProfilePicker;