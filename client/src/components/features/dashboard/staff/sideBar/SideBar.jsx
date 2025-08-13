import {
  Activity,
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
} from "lucide-react";

import { Link } from "react-router-dom";

const SideBar = ({ isMobileMenuOpen, isSidebarCollapsed, activeTab }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, to: " " },
    { id: "issue-books", label: "Issue Books", icon: BookOpen },
    { id: "return-books", label: "Return Books", icon: BookMarked },
    { id: "search-issues", label: "Search Issues", icon: Search },
    { id: "search-returns", label: "Search Returns", icon: RefreshCw },
    { id: "transactions", label: "Transactions", icon: CreditCard },
    { id: "members", label: "Members", icon: Users },
    { id: "books", label: "Books", icon: Book },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "staff", label: "Staff", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ];
  return (
    <>
      <aside
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 ${
          isSidebarCollapsed ? "w-16" : "w-64"
        } bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out`}
      >
        <div className="p-6 pt-20 lg:pt-6">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={`/staff/dashboard/${item.to || item.id}`}
                className={`w-full flex items-center ${
                  isSidebarCollapsed ? "justify-center" : "space-x-3"
                } px-4 py-3 rounded-xl text-left transition-all duration-200 group relative ${
                  activeTab === item.id
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                title={isSidebarCollapsed ? item.label : ""}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span>{item.label}</span>}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
