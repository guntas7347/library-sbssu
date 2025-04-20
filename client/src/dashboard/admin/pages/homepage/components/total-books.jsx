import React, { useEffect, useState } from "react";
import { getNumberOfBookAccessions } from "../../../hooks/http-requests.hooks.admin";

const TotalBooks = () => {
  const [totalBooks, setTotalBooks] = useState("Loading...");

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const result = await getNumberOfBookAccessions();
        setTotalBooks(result);
      } catch (err) {
        console.log(err);
      }
    };
    asyncFunc();
  }, []);
  return (
    <div className="bg-pink-400 rounded-3xl p-10">
      <p>Total Books</p>
      <p>{totalBooks}</p>
      <p>Books :)</p>
    </div>
  );
};

export default TotalBooks;
