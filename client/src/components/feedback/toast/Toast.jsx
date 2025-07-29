import { AlertCircle, CheckCircle, CircleX, X } from "lucide-react";

const Toast = ({ message, severity, show, onClose, duration }) => {
  const getSeverityConfig = () => {
    switch (severity) {
      case 1:
        return {
          icon: CheckCircle,
          bgColor: "bg-green-50 dark:bg-green-900/20",
          borderColor: "border-green-200 dark:border-green-800",
          iconColor: "text-green-600 dark:text-green-400",
          textColor: "text-green-800 dark:text-green-200",
          progressColor: "bg-green-500",
        };
      case 2:
        return {
          icon: CircleX,
          bgColor: "bg-red-50 dark:bg-red-900/20",
          borderColor: "border-red-200 dark:border-red-800",
          iconColor: "text-red-600 dark:text-red-400",
          textColor: "text-red-800 dark:text-red-200",
          progressColor: "bg-red-500",
        };
      case 3:
        return {
          icon: AlertCircle,
          bgColor: "bg-amber-50 dark:bg-amber-900/20",
          borderColor: "border-amber-200 dark:border-amber-800",
          iconColor: "text-amber-600 dark:text-amber-400",
          textColor: "text-amber-800 dark:text-amber-200",
          progressColor: "bg-amber-500",
        };
      default:
        return {
          icon: CircleAlert,
          bgColor: "bg-gray-50 dark:bg-gray-800",
          borderColor: "border-gray-200 dark:border-gray-700",
          iconColor: "text-gray-600 dark:text-gray-400",
          textColor: "text-gray-800 dark:text-gray-200",
          progressColor: "bg-gray-500",
        };
    }
  };

  const config = getSeverityConfig();
  const IconComponent = config.icon;

  if (!show) return null;

  return (
    <div className="pointer-events-auto">
      <div
        className={`
            flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-sm
            transform transition-all duration-300 ease-out
            hover:scale-[1.02] hover:shadow-xl
            w-full min-w-72 max-w-screen
            ${config.bgColor} ${config.borderColor} 
            animate-slide-in
          `}
        role="alert"
        aria-live="polite"
      >
        {/* Icon */}
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          <IconComponent className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium leading-relaxed ${config.textColor}`}
          >
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className={`
              flex-shrink-0 p-1 rounded-lg transition-all duration-200
              hover:bg-black/5 dark:hover:bg-white/5
              focus:outline-none focus:ring-2 focus:ring-offset-1
              ${config.iconColor} hover:scale-110
            `}
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5 dark:bg-white/5 rounded-b-xl overflow-hidden">
          <div
            className={`h-full ${config.progressColor} animate-progress-bar`}
            style={{ animationDuration: `${duration}ms` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
