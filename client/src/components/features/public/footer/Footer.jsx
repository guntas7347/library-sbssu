import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* University Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                  </svg>
                </div>
                <div>
                  <Link to="/" className="text-xl font-bold">
                    SBSSU Library
                  </Link>
                </div>
              </div>
              <p className="text-gray-400 dark:text-gray-500 leading-relaxed">
                Supporting academic excellence through comprehensive library
                services and cutting-edge digital resources.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-bold mb-6">Quick Links</h5>
              <ul className="space-y-3 text-gray-400 dark:text-gray-500">
                <li>
                  <Link
                    to="/catalog"
                    className="hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                    Catalog Search
                  </Link>
                </li>
                <li>
                  <Link
                    to="/developer"
                    className="hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                    Developer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-and-conditions"
                    className="hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                    Terms and conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h5 className="text-lg font-bold mb-6">Services</h5>
              <ul className="space-y-3 text-gray-400 dark:text-gray-500">
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                    Book Issue/Return
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                    Interlibrary Loan
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                    Reference Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                    Training Sessions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="text-lg font-bold mb-6">Contact Us</h5>
              <ul className="space-y-4 text-gray-400 dark:text-gray-500">
                <li className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <span>SBSSU Campus</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-purple-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <span>library@sbssu.edu</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                  </div>
                  <span>Mon-Fri: 8AM-10PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 text-center text-gray-400 dark:text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} SBSSU Library. All rights
              reserved. Designed for modern academic excellence.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
