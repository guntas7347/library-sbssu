// IntranetUserJS
document.addEventListener("DOMContentLoaded", function () {
  if (!window.location.href.includes("moremember.pl")) return;

  // Find IMAGE_ID (handle both attribute styles)
  const attr =
    document.querySelector('li[data-pa-code="IMAGE_ID"]') ||
    document.querySelector('li[data-pa_code="IMAGE_ID"]');

  const imageId = attr?.textContent?.trim() || null;

  console.log("IMAGE_ID:", imageId);

  const container = document.querySelector("#patron-information");
  if (!container) return;

  const basePath = "/images/patrons/";

  // If no ID
  if (!imageId) {
    const box = document.createElement("div");
    box.textContent = "No image found for id null";
    Object.assign(box.style, {
      border: "1px solid #ccc",
      padding: "10px",
      marginTop: "10px",
      background: "#f9f9f9",
    });
    container.appendChild(box);
    return;
  }

  const imageUrl = basePath + encodeURIComponent(imageId) + ".jpg";

  const img = document.createElement("img");
  img.alt = "Patron Image";
  img.style.maxWidth = "150px";
  img.style.display = "block";
  img.style.marginTop = "10px";

  img.onload = () => {
    container.appendChild(img);
  };

  img.onerror = () => {
    console.log("Image not found for:", imageId);

    const box = document.createElement("div");
    box.textContent = "No image found for id " + imageId;

    Object.assign(box.style, {
      border: "1px solid #ccc",
      padding: "10px",
      marginTop: "10px",
      background: "#f9f9f9",
    });

    container.appendChild(box);
  };

  img.src = imageUrl;
});




// Additional Extended Attributes
// RESERVATION_CATEGORY
// COURSE
// BRANCH
// BATCH
// IMAGE_ID
// FATHER_NAME