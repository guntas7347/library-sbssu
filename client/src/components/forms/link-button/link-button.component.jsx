import { Link } from "react-router-dom";

const LinkButton = ({ to, label }) => {
  return (
    <Link to={to} className="min-w-60">
      <button className="c-btn-blue w-full">{label}</button>
    </Link>
  );
};

export default LinkButton;
