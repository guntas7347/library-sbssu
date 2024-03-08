import { Link } from "react-router-dom";

import "./navbar.styles.scss";
import { useState } from "react";

const NavigationBar = () => {
  //////

  const [showMenu, setShowMenu] = useState(false);

  const MenuButton = ({ to, label }) => {
    return (
      <>
        <div>
          <Link to={to}>
            <button className="menu-button">{label}</button>
          </Link>
        </div>
      </>
    );
  };

  /////

  return (
    <>
      <div className="navbar">
        <div
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          className="menu-bar-icon"
        >
          <i className="fa-solid fa-bars fa-xl"></i>
        </div>

        <div className="navbar-label">
          <label>Admin Dashboard</label>
        </div>

        <div className="navbar-searchbar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>

        <div className="navbar-account-icon">
          <MenuButton label="Sign Out" to="/" />
        </div>
      </div>

      <div className={`menu-bar ${showMenu && "show-menu"}`}>
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
