import React, { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Dialog from "../../feedback/dialog/dialog.component";
import { getCroppedImg } from "../../../utils/functions";
import Spinner from "../../feedback/spinner/spinner.component";
import { deleteImageFromCloud } from "../../../dashboard/http-requests";
import { API_URL } from "../../../keys";

const ImageUploader = ({
  onChange,
  label = "Image",
  maxFileSize = 1,
  name = "imageUrl",
}) => {
  const fileInputRef = useRef(null);
  const [imgErrorMessage, setImgErrorMessage] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "px",
    x: 25,
    y: 25,
    width: 100,
    height: 100,
  });
  const [crpdImg, setCrpdImg] = useState(null);

  const [imageUrl, setImgUrl] = useState(null);

  const [isUploading, setIsUploading] = useState(false);

  const imageRef = useRef(null);

  const [showDialog, setShowDialog] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024 * maxFileSize) {
      e.target.value = "";
      setImgErrorMessage(true);
      setImgSrc("");
      return;
    }
    if (imgErrorMessage) setImgErrorMessage(false);

    setShowDialog(true);

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onCropComplete = async (crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const crpdImg = await getCroppedImg(imageRef.current, crop);
      setCrpdImg(crpdImg);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!crpdImg) return;

    const formData = new FormData();
    formData.append("file", crpdImg);

    try {
      setIsUploading(true);
      const response = await fetch(`${API_URL}/upload/image`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();

      if (data.status === "ULD201IMG") {
        setImgUrl(data.payload.imageUrl);
        setIsUploading(false);
        setShowDialog(false);
        onChange({
          target: {
            name,
            value: data.payload.imageUrl,
          },
        });
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const resetComponent = () => {
    setImgErrorMessage(null);
    setImgSrc(null);
    setCrop({
      unit: "px",
      x: 25,
      y: 25,
      width: 100,
      height: 100,
    });
    setCrpdImg(null);
    setImgUrl(null);
    setIsUploading(false);
    setShowDialog(false);
    imageRef.current = null;
    fileInputRef.current.value = "";
  };

  const handleDelete = async (e) => {
    if (imageUrl) {
      e.preventDefault();
      await deleteImageFromCloud({ imageUrl })
        .then(() => {
          resetComponent();
        })
        .catch((err) => {
          console.log(err);
        });
    } else resetComponent();
  };

  return (
    <>
      <div className="flex flex-row gap-3 justify-between items-center">
        <label className="text-xl" htmlFor="Image">
          {label}
        </label>
        <div className="flex gap-3 justify-between items-center">
          {!imageUrl ? (
            <>
              <input
                className="border border-black px-1 w-60 text-xl"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                ref={fileInputRef}
                required
              />
              {imgErrorMessage && (
                <p className="text-red-800">
                  File size exceeds {maxFileSize} MB!
                </p>
              )}
            </>
          ) : (
            <>
              <div className="flex gap-5">
                <img
                  className="w-20 h-20 rounded-full"
                  src={imageUrl}
                  alt="image"
                />
                <button onClick={handleDelete}>
                  <img
                    className="w-6 h-6"
                    src="data:image/png;base64,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"
                    alt=""
                  />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showDialog && (
        <Dialog onClose={handleDelete}>
          <div className="bg-white  rounded p-2 md:p-20">
            {imgSrc && (
              <div className="relative max-w-[400px] ">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  aspect={1}
                  keepSelection={true}
                  onComplete={onCropComplete}
                >
                  <img
                    ref={imageRef}
                    src={imgSrc}
                    alt="Image"
                    style={{ width: "100%", height: "auto" }}
                  />
                </ReactCrop>
              </div>
            )}

            {isUploading ? (
              <div className="mt-10">
                <Spinner />
              </div>
            ) : (
              <button className="mt-10 c-btn-blue" onClick={handleUpload}>
                Upload
              </button>
            )}
          </div>
        </Dialog>
      )}
    </>
  );
};

export default ImageUploader;
