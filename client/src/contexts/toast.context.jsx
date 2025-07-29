import { createContext } from "react";
import useToastManager from "../hooks/useToastManager";
import Toast from "../components/feedback/toast/Toast";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const { toasts, showToast, hideToast } = useToastManager();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="fixed flex-center left-5 z-50"
          style={{ bottom: `${30 + index * 70}px` }}
        >
          <Toast
            message={toast.message}
            severity={toast.severity}
            show={toast.show}
            onClose={() => hideToast(toast.id)}
            duration={toast.duration}
          />
        </div>
      ))}
    </ToastContext.Provider>
  );
};
