import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { X, Upload, Loader2 } from "lucide-react";
import Modal from "../../modals/modal.component";

const ImageCropModal = ({
  showDialog,
  setShowDialog,
  imgSrc,
  crop,
  setCrop,
  onCropComplete,
  imageRef,
  handleUpload,
  croppedBlob,
  isUploading,
  reset,
}) => {
  if (!showDialog) return null;

  return (
    <Modal title="Crop Your Image" onClose={() => setShowDialog(false)}>
      <div className="p-6">
        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Uploading your image...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please wait while we process your photo
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Image Crop Area */}
            <div className="flex justify-center">
              <div className="relative max-w-full  rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  aspect={1}
                  keepSelection
                  onComplete={onCropComplete}
                  className="max-w-full"
                >
                  <img
                    ref={imageRef}
                    src={imgSrc || ""}
                    alt="Image to crop"
                    className="max-w-full max-h-[60vh] w-auto h-auto object-contain"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </ReactCrop>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Drag the corners to adjust your crop area
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                The image will be cropped to a square format
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowDialog(false);
                  reset();
                }}
                className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 border border-gray-300 dark:border-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={!croppedBlob}
                className="w-full sm:w-auto px-8 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Cropped Image
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ImageCropModal;
