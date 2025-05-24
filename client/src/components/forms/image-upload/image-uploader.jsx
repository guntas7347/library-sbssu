import { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "./cropper";
import { uploadImage } from "../../../dashboard/http-requests";
import Modal from "../../modals/modal.component";
import { useFeedback } from "../../context/snackbar.context";

const ImageUploader = ({ onUpload }) => {
  const setFeedback = useFeedback();

  const [imgSrc, setImgSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "px",
    x: 35,
    y: 35,
    width: 200,
    height: 200,
  });
  const [croppedBlob, setCroppedBlob] = useState(null);
  const [imageUrl, setImgUrl] = useState(null);
  const imageRef = useRef(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (e) => {
    const MAX_SIZE_IN_MB = 10;
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024 * MAX_SIZE_IN_MB) {
      e.target.value = "";
      setImgSrc(null);
      return;
    }

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
      const croppedImage = await getCroppedImg(imageRef.current, crop);
      setCroppedBlob(croppedImage);
    }
  };

  const handleUpload = async () => {
    try {
      if (!croppedBlob) throw new Error("No cropped image to upload.");

      setIsUploading(true);

      const formData = new FormData();
      formData.append("image", croppedBlob);

      const res = await uploadImage(formData);

      const data = await res.json();

      if (data.status === "ULD201IMG") {
        onUpload({ path: data.payload });
        setFeedback(1, data.message);
        setShowDialog(false);
      } else setFeedback(2, data.message);
    } catch (error) {
      setFeedback(2, error.message);
    } finally {
      setIsUploading(false);
    }
  };

  // const resetComponent = () => {
  //   setImgSrc(null);
  //   setCrop({
  //     unit: "px",
  //     x: 25,
  //     y: 25,
  //     width: 100,
  //     height: 100,
  //   });
  //   setCroppedBlob(null);
  //   setImgUrl(null);
  //   setShowDialog(false);
  //   setIsUploading(false);
  //   imageRef.current = null;
  //   fileInputRef.current.value = "";
  // };

  // const handleDelete = async () => {
  //   // if (!imageUrl) return;
  //   // await deleteImage(imageUrl);
  //   // onChange({ target: { name, value: null } });
  //   // resetComponent();
  // };

  return (
    <div>
      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload face image
        </label>
        <input
          className="p-3 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          disabled={imageUrl != null}
          accept=".jpg, .jpeg"
          onChange={handleImageSelect}
        />
      </div>

      {imageUrl && (
        <div className="flex size-14 justify-between items-center gap-2">
          <img
            className="rounded-full border p-0.5"
            src={imageUrl}
            alt="face-image"
          />
          <button
            type="button"
            onClick={() => console.log("//todo:delete-image")}
            className="text-gray-400 p-1 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          </button>
        </div>
      )}
      {showDialog && (
        <Modal title="Crop your image" onClose={() => setShowDialog(false)}>
          <div className="flex flex-col justify-center items-center gap-5">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              aspect={1}
              keepSelection
              onComplete={onCropComplete}
              onImageLoaded={(img) => (imageRef.current = img)}
            >
              <img
                ref={imageRef}
                src={imgSrc ? imgSrc : ""}
                alt="Image"
                style={{ width: "100%", height: "auto" }}
              />
            </ReactCrop>

            {isUploading ? (
              <div>Uploading...</div>
            ) : (
              <button
                type="button"
                onClick={handleUpload}
                className="c-btn-blue"
              >
                Upload
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageUploader;
