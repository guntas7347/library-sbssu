import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../../pages/dashboard/member/homepage";

const MemberRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Homepage />} />
      </Routes>
    </>
  );
};

export default MemberRoutes;
