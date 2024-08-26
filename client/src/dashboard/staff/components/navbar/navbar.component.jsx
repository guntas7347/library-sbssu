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
            <button className="rounded-xl  h-14 hover:bg-violet-300 min-w-56">
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
          <label>staff Dashboard</label>
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
        className={`absolute flex flex-col gap-3 items-center bg-white z-50  pt-2 -left-60 w-60 transition-left min-h-screen duration-500 ${
          showMenu && "left-1"
        }`}
      >
        <MenuButton label="Home" to="/dashboard/staff" />{" "}
        <MenuButton label="Profile" to="/dashboard/staff/profile" />
        <MenuButton
          label="Issue / Return Books"
          to="/dashboard/staff/issue-books"
        />
        <MenuButton label="Manage Fine" to="/dashboard/staff/manage-fines" />
        <MenuButton label="Manage Books" to="/dashboard/staff/manage-books" />
        <MenuButton
          label="Manage Students"
          to="/dashboard/staff/manage-students"
        />
      </div>
    </>
  );
};

export default NavigationBar;
