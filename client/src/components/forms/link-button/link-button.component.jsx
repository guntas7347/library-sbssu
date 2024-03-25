import { Link } from "react-router-dom";

const LinkButton = ({ to, label }) => {
  return (
    <Link to={to} className="w-60">
      <button className="my-button w-full">{label}</button>
    </Link>
  );
};

export default LinkButton;
