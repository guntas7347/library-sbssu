import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Spinner() {
  return (
    <Box className="d-flex">
      <CircularProgress />
    </Box>
  );
}
