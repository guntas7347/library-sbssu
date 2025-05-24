import React from "react";
import AALCL from "./components/aalcl";
import CardCategories from "./components/card-categories";

const LibraryCardSettings = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-4xl font-semibold">Library Cards Settings</h2>
      <hr className="c-hr" />
      <AALCL />
      <hr className="c-hr" />
      <CardCategories />
    </div>
  );
};

export default LibraryCardSettings;
