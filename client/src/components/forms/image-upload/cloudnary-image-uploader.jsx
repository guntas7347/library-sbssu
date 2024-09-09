import React, { useState } from "react";

const CloudImageer = () => {
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = () => {
    const widget = window.cloudinary.openUploadWidget(
      {
        cloudName: "your-cloud-name",
        uploadPreset: "your-upload-preset",
        cropping: true,
        showAdvancedOptions: true,
        multiple: false,
        defaultSource: "local",
        theme: "dark",
        styles: {
          palette: {
            window: "#ffffff",
            windowBorder: "#90a0b3",
            tabIcon: "#0078ff",
            menuIcons: "#0078ff",
            textDark: "#000000",
            textLight: "#ffffff",
            link: "#0078ff",
            action: "#0078ff",
            inactiveTabIcon: "#ffffff",
            error: "#f44242",
            inProgress: "#0078ff",
            complete: "#20b832",
            empty: "#ffffff",
            start: "#0078ff",
            boxShadow: "0 0 0 1px #cccccc",
          },
        },
      },
      (error, result) => {
        if (result.event === "success") {
          setImageUrl(result.info.secure_url); // Get the image URL
        }
      }
    );
  };

  return (
    <div>
      <button onClick={handleUpload}>Upload Image</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default CloudImageer;
