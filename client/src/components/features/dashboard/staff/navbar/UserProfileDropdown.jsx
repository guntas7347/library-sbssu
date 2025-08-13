import React, { useState, useEffect, useRef } from "react";
import { LogOut, User } from "lucide-react";
import useAuth from "../../../../../hooks/useAuth.hook";
import { imagePathUrl } from "../../../../../utils/functions"; // Assuming you have this utility
import { useNavigate } from "react-router-dom";

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

  // This effect handles closing the dropdown when clicking outside of it.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    logout();
    setIsOpen(false);
  };
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate("/staff/dashboard/profile");
    setIsOpen(false);
  };

  // Helper to generate initials for the placeholder avatar
  const getInitials = (name = "") => {
    if (!name) return "?";
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Don't render the component if there's no user
  if (!user) {
    return null;
  }

  const avatarUrl = user.photo
    ? imagePathUrl(user.photo)
    : `https://placehold.co/40x40/a78bfa/ffffff?text=${getInitials(
        user.fullName
      )}`;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Icon Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
      >
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fade-in-down">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
              />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  {user.fullName ?? "User"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {user.username ?? "No ID"}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">
              {user.email ?? "No email"}
            </p>
          </div>
          <div className="p-2">
            <button
              onClick={handleViewProfile}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              <span>View Profile</span>
            </button>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
      {/* Basic CSS for the animation - you can add this to your global CSS file */}
      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UserProfileDropdown;
