import React, { useState, useRef } from "react";
import { Camera } from "lucide-react";
import ImageCropModal from "../../../forms/image-upload/ImageCropModal";
import useFeedback from "../../../../hooks/useFeedback";
import { uploadImage } from "../../../../utils/rest-call";

const PhotoUploader = ({ onUpload = () => {} }) => {
  const setFeedback = useFeedback();
  const [imgSrc, setImgSrc] = useState(null);
  const [crop, setCrop] = useState();
  const [croppedBlob, setCroppedBlob] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const imageRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    console.log("hit");
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result);
        setShowDialog(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const canvas = document.createElement("canvas");
      const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(
          imageRef.current,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        canvas.toBlob(
          (blob) => {
            setCroppedBlob(blob);
          },
          "image/jpeg",
          1
        );
      }
    }
  };

  const handleUpload = async () => {
    if (!croppedBlob) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", croppedBlob);
    try {
      const res = await uploadImage(formData);
      const json = await res.json();
      if (json.code === "UPLOADER_200_IMAGE_UPLOADED") {
        onUpload(json.data);
        setIsUploading(false);
        setShowDialog(false);
      } else throw Error("Upload Error (manually thrown)");
    } catch (error) {
      console.log(error);
      setFeedback(2, "Upload failed");
      setIsUploading(false);
      setShowDialog(false);
      reset();
    }
  };

  const reset = () => {
    setImgSrc(null);
    setCrop(undefined);
    setCroppedBlob(null);
    // Reset file input
    const fileInput = document.getElementById("profile-photo");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <>
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg">
            {!imgSrc ? (
              <svg
                className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            ) : (
              <img
                className="rounded-full size-fit"
                src={imgSrc}
                alt="profile-image"
              />
            )}
          </div>
          <button
            type="button"
            onClick={() => document.getElementById("profile-photo")?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-110"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Upload your profile photo
        </p>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="profile-photo"
          onChange={handleImageChange}
        />
      </div>

      <ImageCropModal
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        imgSrc={imgSrc}
        crop={crop}
        setCrop={setCrop}
        onCropComplete={onCropComplete}
        imageRef={imageRef}
        handleUpload={handleUpload}
        croppedBlob={croppedBlob}
        isUploading={isUploading}
        reset={reset}
      />
    </>
  );
};

export default PhotoUploader;
