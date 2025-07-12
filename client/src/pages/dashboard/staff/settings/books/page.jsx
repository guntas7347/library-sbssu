import React from "react";
import BookCategories from "./components/book-categories";

const BooksSettings = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-4xl font-semibold">Books Settings</h2>
      <hr className="c-hr" />
      <BookCategories />
      <hr className="c-hr" />
      {/* <CardCategories /> */}
    </div>
  );
};

export default BooksSettings;
