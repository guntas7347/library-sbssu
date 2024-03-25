import { Link } from "react-router-dom";

import { useState } from "react";

const NavigationBar = () => {
  //////

  const [showMenu, setShowMenu] = useState(false);

  const MenuButton = ({ to, label }) => {
    return (
      <>
        <div>
          <Link to={to}>
            <button className="rounded-xl w-36 h-14 hover:bg-violet-300">
              {label}
            </button>
          </Link>
        </div>
      </>
    );
  };

  /////

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

        <div className="font-bold text-2xl">
          <label>Admin Dashboard</label>
        </div>

        <div className="relative flex flex-row justify-center items-center w-80">
          <i className="fa-solid fa-magnifying-glass absolute left-2.5"></i>
          <input
            className="pl-8 pr-1 h-8 w-full"
            type="text"
            placeholder="Search..."
          />
        </div>

        <div className="ml-auto">
          <MenuButton label="Sign Out" to="/" />
        </div>
      </div>

      <div
        style={{ borderTop: "1px solid rgba(174, 161, 255, 0.75)" }}
        className={`absolute flex flex-col gap-3 items-center bg-white z-50 h-auto pt-2 -left-40 w-40 transition-left duration-500 ${
          showMenu && "left-0"
        }`}
      >
        <MenuButton label="Home" to="/dashboard/admin" />{" "}
        <MenuButton label="Profile" to="/dashboard/admin/profile" />
        <MenuButton
          label="Issue / Return Books"
          to="/dashboard/admin/issue-books"
        />
        <MenuButton label="Manage Fine" to="/dashboard/admin/manage-fines" />
        <MenuButton label="Manage Books" to="/dashboard/admin/manage-books" />
        <MenuButton
          label="Manage Students"
          to="/dashboard/admin/manage-students"
        />
        <MenuButton label="Manage Staff" to="/dashboard/admin/manage-staff" />
        <MenuButton label="Database (BETA)" to="/dashboard/admin/database" />
      </div>
    </>
  );
};

export default NavigationBar;
