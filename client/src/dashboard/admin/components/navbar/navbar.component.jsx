import { Link } from "react-router-dom";

import useToggle from "../../../../components/hooks/use-toggle";
import GlobalSearchBar from "../global-search/global-search";
import { useContext } from "react";
import { AuthContext } from "../../../../components/context/auth.content";
import DarkModeToggler from "../../../../components/darkmode.toggle";

const NavigationBar = () => {
  const { getToggle, toggle } = useToggle(false);
  const { getToggle: getUserToggle, toggle: setUserToggle } = useToggle(false);
  const { getToggle: getPhoneMenuToggle, toggle: setPhoneMenuToggle } =
    useToggle(false);

  const { userName } = useContext(AuthContext);

  const handleClose = () => {
    toggle(false);
    setUserToggle(false);
    setPhoneMenuToggle(false);
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center space-x-3 rtl:space-x-reverse"
            onClick={() => toggle(false)}
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Library SBSSU
            </span>
          </Link>

          <div className="flex relative  gap-10 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {" "}
            <DarkModeToggler />
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={() => setUserToggle(!getUserToggle)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                alt="user photo"
              />
            </button>{" "}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
              onClick={() => setPhoneMenuToggle(!getPhoneMenuToggle)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className={`z-50 ${
                !getUserToggle && "hidden"
              } absolute top-5 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 truncate dark:text-white">
                  {userName}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to="/admin/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/dashboard/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            id="mega-menu"
            className={`items-center justify-between ${
              !getPhoneMenuToggle && "hidden"
            } w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex flex-col justify-center items-center mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
              <li>
                <Link
                  to="/admin/dashboard/"
                  className="block py-2 px-3 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                  onClick={handleClose}
                >
                  Home
                </Link>
              </li>
              <li>
                <button
                  id="mega-menu-dropdown-button"
                  data-dropdown-toggle="mega-menu-dropdown"
                  className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={() => toggle()}
                >
                  Services
                  <svg
                    className={`w-2.5 h-2.5 ms-3 ${getToggle && "rotate-180"}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="mega-menu-dropdown"
                  className={`absolute z-10  ${
                    getToggle ? "grid" : "hidden"
                  } w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-700`}
                >
                  <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                    <ul
                      className="space-y-4"
                      aria-labelledby="mega-menu-dropdown-button"
                    >
                      <li>
                        <Link
                          onClick={handleClose}
                          to="/admin/dashboard/issue-book"
                          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                        >
                          Issue Book
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleClose}
                          to="/admin/dashboard/return-book"
                          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                        >
                          Return Book
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleClose}
                          to="/admin/dashboard/issues"
                          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                        >
                          Search Issues
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleClose}
                          to="/admin/dashboard/returns"
                          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                        >
                          Search Returns
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleClose}
                          to="/admin/dashboard/transactions"
                          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                        >
                          Transactions
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                    <ul className="space-y-4">
                      <li>
                        <Link
                          onClick={handleClose}
                          to="/admin/dashboard/members"
                          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                        >
                          Members
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleClose}
                          to="/admin/dashboard/books"
                          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                        >
                          Books
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleClose}
                          to="/admin/dashboard/applications"
                          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                        >
                          Applications
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleClose}
                          to="/admin/dashboard/staff"
                          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                        >
                          Staff
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li>
                <Link
                  to="/admin/dashboard/support"
                  className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={handleClose}
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
  );
};

export default NavigationBar;
