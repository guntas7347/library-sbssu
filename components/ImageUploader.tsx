import React, { useState, useEffect } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/imageUpload";

const ImageUploader = ({
  label = "Profile Photo",
  onUpload = ({
    fileName,
    previewUrl,
  }: {
    fileName: string;
    previewUrl: string;
  }) => {},
  defaultImage = "",
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(defaultImage);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Cleanup the object URL to avoid memory leaks when the component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.type !== "image/jpeg") {
        setStatus({
          type: "error",
          message: "Only JPEG images are allowed.",
        });
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setStatus({ type: "", message: "" });
    }
  };

  const handleRemove = (e) => {
    e.preventDefault(); // Prevent form submission if wrapped in a form
    setSelectedFile(null);
    setPreviewUrl(null);
    setStatus({ type: "", message: "" });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setStatus({ type: "", message: "" });

    // Prepare multipart/form-data
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const { fileName } = await uploadImage(formData);

      onUpload({ fileName });

      setStatus({
        type: "success",
        message: "Image updated successfully!",
      });
    } catch (error) {
      console.error("Upload error:", error);
      setStatus({
        type: "error",
        message: "Failed to upload image. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <div className="form-group flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label || "Image"} *
        </label>

        {!previewUrl ? (
          /* Upload Area */
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
              <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Click to upload your photo
              </p>
              <p className="text-xs text-gray-400 mt-1">
                SVG, PNG, JPG or GIF (max. 5MB)
              </p>
            </div>
            <input
              type="file"
              name="photo"
              className="hidden"
              accept="image/jpeg"
              onChange={handleChange}
            />
          </label>
        ) : (
          /* Image Preview Area */
          <div className="relative w-full flex flex-col items-center gap-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={previewUrl}
                alt="Image preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col items-center w-full gap-2">
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate w-full text-center">
                {selectedFile?.name || ""}
              </p>

              <div className="flex gap-2 w-full">
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={isUploading}
                  className="flex-1 flex items-center justify-center px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4 mr-1" /> Remove
                </button>

                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={isUploading || status.type === "success"}
                  className="flex-1 flex items-center justify-center px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status Messages */}
        {status.message && (
          <p
            className={`text-sm text-center mt-2 ${
              status.type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
