import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookSVG,
  IssueBookIcon,
  LockSVG,
  MastercardSVG,
  MicroscopeSVG,
  ReturnBookIcon,
} from "../../../../components/svg/svgs";

const Sidebar = () => {
  return (
    <div className="relative h-full">
      <aside className="z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <Li label="Programs" name="programs" svg={<MicroscopeSVG />} />
            <Li label="Issue" name="issue" svg={<IssueBookIcon />} />
            <Li label="Return" name="return" svg={<ReturnBookIcon />} />
            <Li label="Books" name="books" svg={<BookSVG />} />
            <Li
              label="Library Cards"
              name="library-cards"
              svg={<MastercardSVG />}
            />
            <Li label="Authentication" name="auth" svg={<LockSVG />} />
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

const Li = ({ label, name = "", svg }) => {
  const location = useLocation();
  const active =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  return (
    <>
      <li>
        <Link
          to={`/staff/dashboard/settings/${name}`}
          className={`c-sidebar-li ${
            active === name && "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {svg}
          <span className="flex-1 ms-3 whitespace-nowrap">{label}</span>
        </Link>
      </li>
    </>
  );
};
