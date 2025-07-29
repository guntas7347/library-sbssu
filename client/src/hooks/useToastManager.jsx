import { useState } from "react";

function generateSimpleId() {
  const rand = `${Date.now()}-${Math.random()}`;
  return btoa(rand)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 16);
}

const useToastManager = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = ({ message, severity = "info", duration = 5000 }) => {
    const id = generateSimpleId();
    console.log(id);

    const toast = { id, message, severity, show: true, duration };
    setToasts((prev) => [...prev, toast]);

    // Auto-hide and then remove
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, show: false } : t))
      );
    }, duration);

    // Fully remove after animation (if any)
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration + 300); // allow fade-out
  };

  const hideToast = (id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, show: false } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  };

  return { toasts, showToast, hideToast };
};

export default useToastManager;
