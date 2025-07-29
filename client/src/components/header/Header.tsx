import { ArrowLeft, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  backTo?: string;
  showActions?: boolean;
}

const Header = ({
  title = "SBSSU",
  subtitle = "University Library",
  backTo = "/",
  showActions = false,
  svg: SVG = GraduationCap,
}: HeaderProps) => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 print:hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Back Button */}
          <div className="flex items-center space-x-4">
            <Link
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              to={backTo}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-xl flex items-center justify-center">
                {<SVG className="text-white" />}
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                  {title}
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {showActions && (
            <div className="flex items-center space-x-3">
              {/* Add action buttons here if needed */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
