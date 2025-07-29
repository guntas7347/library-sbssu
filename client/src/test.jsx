import React, { useEffect, useState } from "react";

const Test = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(!loading); // -> re-render
  };

  useEffect(() => {}, []);

  return (
    <div className="text-center text-9xl py-20 flex flex-col">
      <span> {loading ? "Yes" : "No"}</span>

      <button className="bg-blue-400 p-6" onClick={handleClick}>
        Toggle
      </button>
    </div>
  );
};

export default Test;
