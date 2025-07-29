import React, { useEffect, useRef, useState } from "react";
import { imagePathUrl } from "../../../../../utils/functions";
import {
  LogoutSVG,
  ProfileCardSVG,
  UserSettingsSVG,
} from "../../../../svg/svgs";
import useAuth from "../../../../../hooks/useAuth.hook";
import { Link, useNavigate } from "react-router-dom";
import server from "../../../../../services/server.api";
import ConfirmationModal from "../../../../modals/confirmation-model";

const UserMenu = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const profileRef = useRef(null);
  const [alert, setAlert] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menuName) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };

  useEffect(() => {
    const handleClose = (event) => {
      setTimeout(() => {
        const clickedInProfile = profileRef.current?.contains(event.target);

        if (openDropdown && !clickedInProfile) {
          setOpenDropdown(null);
        }
      }, 0);
    };

    document.addEventListener("click", handleClose);
    return () => document.removeEventListener("click", handleClose);
  }, [openDropdown]);

  const handleSignOut = async () => {
    try {
      await server.auth.signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  return (
    <>
      {" "}
      <div>
        <button
          type="button"
          className="flex text-sm bg-gray-800 cursor-pointer rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          onClick={() => toggleDropdown("profile")}
          ref={profileRef}
        >
          <img
            className="size-11 rounded-full"
            src={imagePathUrl(user.photo)}
            crossOrigin="anonymous"
            alt="user image"
          />
        </button>
        {openDropdown === "profile" && (
          <div className="z-50  absolute min-w-32 top-5 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {user.fullName}
              </span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                {user.username}
              </span>
            </div>
            <ul className="pt-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to="/staff/dashboard/profile"
                  className="flex items-center gap-1  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  <ProfileCardSVG /> Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/staff/dashboard/settings"
                  className="px-4 py-2 flex items-center gap-1 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  <UserSettingsSVG />
                  Settings
                </Link>
              </li>

              <li>
                <button
                  className="c-btn-red w-full"
                  onClick={() => setAlert(true)}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <ConfirmationModal
        onClose={() => setAlert(false)}
        onYes={handleSignOut}
        title="Are you sure of it to Logout?"
        show={alert}
      />
    </>
  );
};

export default UserMenu;
