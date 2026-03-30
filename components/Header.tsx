import {
  Bell,
  Book,
  ChevronLeft,
  ChevronRight,
  Menu,
  User,
  X,
} from "lucide-react";
import BackButton from "./BackButton";

const Navbar = () => {
  return (
    <>
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="px-10">
          <div className="flex justify-between items-center py-4">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <BackButton />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-xl flex items-center justify-center">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                    SBSSU Library
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Staff Dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3"></div>
          </div>
        </div>
      </header>
      {/* <div className="absolute z-20">
        <SideBar />
      </div> */}
    </>
  );
};

export default Navbar;
