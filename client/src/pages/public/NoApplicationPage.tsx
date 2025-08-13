import {
  FileX,
  Home,
  ArrowLeft,
  Search,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import Header from "../../components/header/Header";

interface ApplicationNotFoundProps {
  homeText?: string;
  homeLink?: string;
  onHomeClick?: () => void;
  applicationName?: string;
  subtitle?: string;
  showRetryOption?: boolean;
  onRetry?: () => void;
}

const ApplicationNotFound: React.FC<ApplicationNotFoundProps> = ({
  homeText = "Go to Home",
  homeLink = "/",
  onHomeClick,
  applicationName = "Application",
  subtitle = "The application you're looking for is not available or has been removed.",
  showRetryOption = true,
  onRetry,
}) => {
  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.location.href = homeLink;
    }
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.href = "/join/applied";
    }
  };

  return (
    <>
      <Header />;
      <div className="min-h-screen py-10 bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          {/* Animated Application Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-8 shadow-2xl mx-auto w-48 h-48 flex items-center justify-center group hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <FileX className="w-24 h-24 text-red-500 group-hover:text-orange-500 transition-colors duration-500 animate-bounce" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
                <AlertCircle className="w-8 h-8 text-red-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Error Content */}
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              {applicationName}
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Application Not Found
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <AlertCircle className="w-4 h-4" />
            <span>Application Unavailable</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={handleHomeClick}
              className="group bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>{homeText}</span>
            </button>

            {showRetryOption && (
              <button
                onClick={handleRetry}
                className="group bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 border border-gray-200 hover:border-red-300"
              >
                <RefreshCw className="w-5 h-5 group-hover:scale-110 group-hover:rotate-180 transition-all duration-300" />
                <span>Try Again</span>
              </button>
            )}
          </div>

          {/* Helpful Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-2">
              <Search className="w-6 h-6 text-red-500" />
              <span>Possible Reasons</span>
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">
                  Application is temporarily unavailable
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">
                  Application has been moved or removed
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">
                  You may not have permission to access this application
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">
                  Server maintenance in progress
                </span>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20 animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-5 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default ApplicationNotFound;
