import { X } from "lucide-react";
import { useEffect } from "react";

const Modal = ({ onClose, children, title = "", x }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    window.addEventListener("keyup", handleKeyDown);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keyup", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="flex inset-0 overflow-y-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full bg-black/50">
      <div className="relative p-4 min-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            {typeof title === "string" ? (
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            ) : (
              title()
            )}
            {x ? (
              X()
            ) : (
              <button
                className="cursor-pointer ml-auto hover:bg-gray-200 p-2 rounded-lg transition-all duration-100"
                type="button"
                onClick={onClose}
              >
                <X />
              </button>
            )}
          </div>
          <div className="p-4 md:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
