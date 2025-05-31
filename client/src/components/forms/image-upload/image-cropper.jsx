import { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "./cropper";
import Modal from "../../modals/modal.component";
import { useFeedback } from "../../context/snackbar.context";
import InputFile from "./input-file";

const ImageCropper = ({
  onUpload,
  label = "Upload Image",
  required = false,
  defaultFileName = null,
}) => {
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
  const [fileName, setFileName] = useState(defaultFileName);
  const imageRef = useRef(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (e) => {
    const MAX_SIZE_IN_MB = 10;
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024 * MAX_SIZE_IN_MB) {
      setFeedback(2, `File size exceeds ${MAX_SIZE_IN_MB}MB limit.`);
      e.target.value = "";
      setImgSrc(null);
      return;
    }

    setFileName(file.name);
    setCroppedBlob(null);
    setShowDialog(true);

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      setImgSrc(imageUrl);
      e.target.value = "";
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
      return onUpload(formData);
    } catch (error) {
      setFeedback(2, error.m);
    } finally {
      setIsUploading(false);
      setShowDialog(false);
    }
  };
  const reset = () => {
    setImgSrc(null);
    setCrop({ unit: "px", x: 35, y: 35, width: 200, height: 200 });
    setCroppedBlob(null);
    setFileName("");
    setShowDialog(false);
    onUpload(null);
  };

  const handleDelete = () => {
    reset();
  };

  return (
    <div>
      <div>
        <InputFile
          label={label}
          accept=".jpg, .jpeg"
          onChange={handleImageSelect}
          fileName={fileName}
          onDelete={handleDelete}
          required={required}
          chooseLabel="Select image"
          changeLabel="Change image"
        />
      </div>

      {showDialog && (
        <Modal
          title="Crop your image"
          onClose={() => {
            setShowDialog(false);
            reset();
          }}
        >
          <div className="flex flex-col justify-center items-center gap-5">
            {isUploading ? (
              <div>Uploading...</div>
            ) : (
              <button
                type="button"
                onClick={handleUpload}
                className="c-btn-blue"
                disabled={!croppedBlob}
              >
                Upload
              </button>
            )}
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
                src={imgSrc || ""}
                alt="Image"
                style={{ width: "100%", maxWidth: "400px", height: "auto" }}
              />
            </ReactCrop>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageCropper;
