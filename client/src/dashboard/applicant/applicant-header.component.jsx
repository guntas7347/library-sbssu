import React from "react";

const ApplicationNavBar = () => {
  return (
    <div
      style={{ boxShadow: "0px 10px 21px -10px rgba(174, 161, 255, 0.75)" }}
      className="bg-white h-16 px-5 md:h-20 md:px-10 flex  justify-between items-center"
    >
      <img
        className="h-10 "
        src="https://sbssu.ac.in/images/Tricolor.png"
        alt="sbssu logo"
      />
      <h1 className="text-2xl text-indigo-900 font-bold">
        SBSSU Library Portal
      </h1>
    </div>
  );
};

export default ApplicationNavBar;
