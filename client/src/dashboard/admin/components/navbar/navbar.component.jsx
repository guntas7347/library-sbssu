import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import GlobalSearchBar from "../global-search/global-search";
import { AuthContext } from "../../../../components/context/auth.content";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const { userRole } = useContext(AuthContext);

  const MenuButton = ({ to, label }) => {
    return (
      <>
        <div>
          <Link to={to}>
            <button className="rounded-xl  h-14 hover:bg-violet-300 min-w-56">
              {label}
            </button>
          </Link>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        style={{ boxShadow: "0px 10px 21px -10px rgba(174, 161, 255, 0.75)" }}
        className="bg-white flex flex-row items-center h-20 gap-5 px-5"
      >
        <div
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          className="flex flex-row justify-center items-center hover:bg-gray-400 active:opacity-75 rounded-full h-12 w-12"
        >
          <i className="fa-solid fa-bars fa-xl"></i>
        </div>

        <div
          className="font-bold text-2xl"
          onClick={() => navigate("/dashboard/admin")}
        >
          <label className="cursor-pointer">{userRole} Dashboard</label>
        </div>

        <div className="w-96">
          <GlobalSearchBar />
        </div>

        <div className="ml-auto">
          <MenuButton label="Sign Out" to="/admin" />
        </div>
      </div>

      <div
        style={{ borderTop: "1px solid rgba(174, 161, 255, 0.75)" }}
        className={`absolute flex flex-col gap-3 items-center bg-white z-50  pt-2 -left-60 w-60 transition-left min-h-screen duration-500 ${
          showMenu && "left-1"
        }`}
      >
        <MenuButton label="Home" to="/dashboard/admin" />
        <MenuButton label="Profile" to="/dashboard/admin/profile" />
        <MenuButton
          label="Issue / Return Books"
          to="/dashboard/admin/issue-books"
        />
        <MenuButton label="Manage Fine" to="/dashboard/admin/manage-fines" />
        <MenuButton label="Manage Books" to="/dashboard/admin/manage-books" />
        <MenuButton
          label="Manage Members"
          to="/dashboard/admin/manage-members"
        />
        <MenuButton label="Manage Staff" to="/dashboard/admin/manage-staff" />
        <MenuButton label="Database (BETA)" to="/dashboard/admin/database" />
      </div>
    </>
  );
};

export default NavigationBar;
