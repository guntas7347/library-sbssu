import React, { useEffect, useState } from "react";
import { getNumberOfBookAccessions } from "../../../hooks/http-requests.hooks.admin";
import Spinner from "../../../../../components/feedback/spinner/spinner.component";

const TotalBooks = () => {
  const [totalBooks, setTotalBooks] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const result = await getNumberOfBookAccessions();
        setTotalBooks(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunc();
  }, []);

  if (loading)
    return (
      <div className="bg-pink-400 rounded-3xl p-10 flex justify-center">
        <Spinner center={true} />
      </div>
    );

  return (
    <div className="bg-pink-400 rounded-3xl p-10">
      <p>Total Books</p>
      <p>{totalBooks}</p>
      <p>Books :)</p>
    </div>
  );
};

export default TotalBooks;
