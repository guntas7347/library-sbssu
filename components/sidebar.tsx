"use client";

import { useState } from "react";
import {
  BarChart3,
  Book,
  BookMarked,
  BookOpen,
  CreditCard,
  FileText,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Users,
  Menu,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const pathname = usePathname();

  const navItems = [
    { id: "", label: "Dashboard", icon: BarChart3 },
    { id: "issue", label: "Issue Books", icon: BookOpen },
    { id: "return", label: "Return Books", icon: BookMarked },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "books", label: "Books", icon: Book },
  ];

  const getActiveTab = () => {
    const segment = pathname.split("/")[2];
    return segment || "dashboard";
  };

  const activeTab = getActiveTab();

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-[100] p-3 bg-black text-white rounded-lg shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      <aside
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 ${
          isSidebarCollapsed ? "w-16" : "w-64"
        } bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}
      >
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft
              className={`w-5 h-5 transition-transform ${
                isSidebarCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div className="px-2 min-h-screen">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;

              return (
                <Link
                  key={item.id}
                  href={`/dashboard/${item.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center ${
                    isSidebarCollapsed ? "justify-center" : "space-x-3 px-4"
                  } py-3 rounded-xl transition-all group relative ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  title={isSidebarCollapsed ? item.label : ""}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />

                  {!isSidebarCollapsed && <span>{item.label}</span>}

                  {isSidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
