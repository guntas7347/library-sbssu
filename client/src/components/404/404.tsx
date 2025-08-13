import {
  AlertTriangle,
  Home,
  ArrowLeft,
  Search,
  RefreshCw,
} from "lucide-react";

interface NotFoundPageProps {
  homeText?: string;
  homeLink?: string;
  onHomeClick?: () => void;
  title?: string;
  subtitle?: string;
  showSearchSuggestion?: boolean;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
  homeText = "Go to Home",
  homeLink = "/",
  onHomeClick,
  title = "404 - Page Not Found",
  subtitle = "The page you're looking for doesn't exist or has been moved.",
  showSearchSuggestion = true,
}) => {
  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.location.href = homeLink;
    }
  };

  return (
    <div className="min-h-screen my-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative bg-white rounded-full p-8 shadow-2xl mx-auto w-48 h-48 flex items-center justify-center group hover:scale-105 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <AlertTriangle className="w-24 h-24 text-blue-600 group-hover:text-indigo-600 transition-colors duration-500 animate-bounce" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-6 mb-12">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={handleHomeClick}
            className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>{homeText}</span>
          </button>

          <button
            onClick={() => window.history.back()}
            className="group bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 border border-gray-200 hover:border-blue-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Helpful Suggestions */}
        {showSearchSuggestion && (
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-2">
              <Search className="w-6 h-6 text-blue-600" />
              <span>What can you do?</span>
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Check the URL for typos</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Use the navigation menu</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Try refreshing the page</span>
              </div>
            </div>
          </div>
        )}

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-5 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-float"
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
  );
};

export default NotFoundPage;
