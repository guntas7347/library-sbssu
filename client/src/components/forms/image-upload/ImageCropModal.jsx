import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Loader2, Upload, X, Crop, Info, CheckCircle } from "lucide-react";
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
    <Modal>
      <div className="relative">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <Crop className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Crop Your Image
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Draw the crop area to your preference
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
              {/* Loading Animation */}
              <div className="relative">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-spin" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <Upload className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Loading Text */}
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Processing Your Image
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Please wait while we upload and optimize your photo
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Crop Area */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <ReactCrop
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      aspect={1}
                      keepSelection
                      minHeight={100}
                      onComplete={onCropComplete}
                      className="rounded-lg overflow-hidden shadow-lg"
                    >
                      <img
                        ref={imageRef}
                        src={imgSrc || ""}
                        alt="Image to crop"
                        className="h-96 rounded-lg"
                      />
                    </ReactCrop>

                    {/* Crop Status Indicator */}
                    {croppedBlob && (
                      <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full p-1.5 shadow-lg">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowDialog(false);
                    reset();
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 shadow-sm hover:shadow-md"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={!croppedBlob}
                  className="flex-1 px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2 group"
                >
                  <Upload className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  {croppedBlob
                    ? "Upload Cropped Image"
                    : "Select Crop Area First"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImageCropModal;
