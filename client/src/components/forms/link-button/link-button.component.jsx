import { Link } from "react-router-dom";

const LinkButton = ({ to, label }) => {
  return (
    <Link to={to}>
      <button className="my-button">{label}</button>
    </Link>
  );
};

export default LinkButton;
