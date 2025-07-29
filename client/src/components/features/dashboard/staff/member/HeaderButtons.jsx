import { TicketPlus } from "lucide-react";
import { Link } from "react-router-dom";

const HeaderButtons = () => {
  return (
    <div>
      <Link
        className="w-10 h-10 bg-purple-600 hover:bg-purple-500 rounded-xl flex items-center justify-center cursor-pointer"
        to="allot-card"
      >
        <TicketPlus className="w-6 h-6 text-white" />
      </Link>
    </div>
  );
};

export default HeaderButtons;
