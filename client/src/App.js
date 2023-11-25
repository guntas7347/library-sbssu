import { Link, Route, Routes } from "react-router-dom";
import DashboardRoutes from "./dashboard/dashboard.routes";
import { Button } from "@mui/material";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Button as={Link} to={`/dashboard/admin`}>
              Got To Admin Dashboard{" "}
            </Button>
          }
        />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </div>
  );
};

export default App;
