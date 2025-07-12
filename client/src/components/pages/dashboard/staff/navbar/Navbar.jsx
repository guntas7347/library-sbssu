import { Link } from "react-router-dom";
import GlobalSearchBar from "../globalSearch/GlobalSearch";
import DarkModeToggler from "../../../../darkModeToggler/darkModeToggler";
import UserMenu from "./UserMenu";
import ServicesDropdown from "./ServicesDropdown";
import { MenuSVG } from "../../../../svg/svgs";

const NavbarStaff = () => {
  return (
    <>
      <div>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src="/sbssu-logo.png" className="h-8" alt="SBSSU Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Library SBSSU
              </span>
            </Link>

            <div className="flex relative  gap-5 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <DarkModeToggler />

              <button className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <MenuSVG />
              </button>

              <UserMenu />
            </div>
            <div className="items-center justify-between w-full md:flex md:w-auto md:order-1">
              <ul className="flex flex-col justify-center items-center mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                <li>
                  <Link
                    to="/staff/dashboard/"
                    className="block py-2 px-3 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <ServicesDropdown />
                </li>

                <li>
                  <Link
                    to="/staff/dashboard/support"
                    className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <GlobalSearchBar />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavbarStaff;
