import { useRef, useState } from "react";
import * as faceapi from "face-api.js";

const useCropper = () => {
  const inputRef = useRef();
  const [imgSrc, setImgSrc] = useState(null);
  const [crop, setCrop] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);
  const [dialog, setDialog] = useState(false);
  const imageRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const isValid = await detectFace(file);
    console.log(isValid);
    if (!isValid) {
      alert("No face detected in image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImgSrc(reader.result);
      setDialog(true);
    };
    reader.readAsDataURL(file);
  };

  const onCrop = (crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

      const canvas = document.createElement("canvas");
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

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
          canvas.width,
          canvas.height
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

  const reset = () => {
    setImgSrc(null);
    setCrop(null);
    setCroppedBlob(null);
  };

  return {
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
  };
};

export default useCropper;

let tinyModelLoaded = false;
async function detectFace(file) {
  if (!tinyModelLoaded) {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    tinyModelLoaded = true;
  }
  const img = await faceapi.bufferToImage(file);
  const detections = await faceapi.detectAllFaces(
    img,
    new faceapi.TinyFaceDetectorOptions()
  );

  return detections.length > 0;
}
