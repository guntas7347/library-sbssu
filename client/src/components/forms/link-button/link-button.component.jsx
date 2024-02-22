import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const LinkButton = ({ to, label }) => {
  return (
    <Button className="m-3" variant="contained" LinkComponent={Link} to={to}>
      {label}
    </Button>
  );
};

export default LinkButton;
