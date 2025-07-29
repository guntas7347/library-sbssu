import React, { useState } from "react";
import { Camera, User } from "lucide-react";
import ImageCropModal from "../../../forms/image-upload/ImageCropModal";
import useFeedback from "../../../../hooks/useFeedback";
import { uploadImage } from "../../../../utils/rest-call";
import useCropper from "../../../../hooks/useCropper";

const PhotoUploader = ({ onUpload = () => {} }) => {
  const setFeedback = useFeedback();

  const [isUploading, setIsUploading] = useState(false);

  const {
    reset,
    onCrop,
    dialog,
    setDialog,
    crop,
    setCrop,
    croppedBlob,
    imgSrc,
    inputRef,
    imageRef,
    handleImageChange,
  } = useCropper();

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
        setDialog(false);
      } else throw Error("Upload Error (manually thrown)");
    } catch (error) {
      console.log(error);
      setFeedback(2, "Upload failed");
      setIsUploading(false);
      setDialog(false);
      reset();
    }
  };

  return (
    <>
      <div className="text-center">
        <div className="relative inline-block">
          <div
            onClick={() => inputRef.current.click()}
            className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg"
          >
            {!croppedBlob ? (
              <User />
            ) : (
              <img
                className="rounded-full size-full object-cover"
                src={URL.createObjectURL(croppedBlob)}
                alt="profile-image"
              />
            )}
          </div>
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-110"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Upload your profile photo
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          id="profile-photo"
          onChange={handleImageChange}
          onClick={() => (inputRef.current.value = null)}
        />
      </div>

      <ImageCropModal
        showDialog={dialog}
        setShowDialog={setDialog}
        imgSrc={imgSrc}
        crop={crop}
        setCrop={setCrop}
        onCropComplete={onCrop}
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
