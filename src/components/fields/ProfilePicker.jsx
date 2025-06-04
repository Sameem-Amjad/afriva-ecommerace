import { pencilIcon, userIcon } from "@/utils/Svgs";
import Image from "next/image";
import React from "react";
import { } from "@/redux/features/auth/authDB";
const ProfilePicker = (props) => {
  const [preview, setPreview] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [hasMounted, setHasMounted] = React.useState(false);
  const inputRef = React.useRef();

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      props.setProfile(selectedFile);

      try {
        setUploading(true);
        const fileName = `profile_${Date.now()}`;
        const bucketName = "profile_images";
        const path = `${fileName}`;

        const publicUrl = await (selectedFile, bucketName, path);

        if (publicUrl) {
          console.log("Image uploaded successfully:", publicUrl);
          props.setProfileUrl(publicUrl);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current.click()}
      className={`relative bg-secondaryText cursor-pointer rounded-full w-[140px] h-[140px] flex items-center justify-center shadow-profileShadow`}
    >
      <div className="flex w-full h-full overflow-hidden rounded-full items-center justify-center">
        {hasMounted && preview ? (
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
          <span className="loader"></span>
        ) : (
          pencilIcon
        )}
      </div>
    </div>
  );
};

export default ProfilePicker;