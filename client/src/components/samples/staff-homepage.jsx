import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Book,
  BookOpen,
  CreditCard,
  Users,
  BarChart3,
  Settings,
  Bell,
  User,
  Menu,
  X,
  ChevronDown,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  FileText,
  UserCheck,
  Shield,
  Activity,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  Scan,
  RefreshCw,
  BookMarked,
  UserPlus,
  BookPlus,
  DollarSign,
  TrendingUp,
  Archive,
} from "lucide-react";
import SideBar from "../features/dashboard/staff/sideBar/SideBar";
import Dashboard from "../features/dashboard/staff/dashBoard/Dashboard";

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  // Sample data
  const members = [
    {
      id: "LIB001",
      name: "John Doe",
      email: "john.doe@student.sbssu.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      level: "Undergraduate",
      status: "Active",
      joinDate: "2024-01-15",
      booksIssued: 3,
      overdueBooks: 0,
    },
    {
      id: "LIB002",
      name: "Jane Smith",
      email: "jane.smith@student.sbssu.edu",
      phone: "+1 (555) 234-5678",
      department: "Engineering",
      level: "Graduate",
      status: "Active",
      joinDate: "2024-02-20",
      booksIssued: 5,
      overdueBooks: 1,
    },
  ];

  const books = [
    {
      id: "BK001",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      isbn: "978-0262033848",
      category: "Computer Science",
      status: "Available",
      copies: 5,
      issued: 2,
      location: "CS-A-101",
    },
    {
      id: "BK002",
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "978-0132350884",
      category: "Programming",
      status: "Available",
      copies: 3,
      issued: 1,
      location: "CS-A-102",
    },
  ];

  const transactions = [
    {
      id: "TXN001",
      type: "Issue",
      member: "John Doe",
      book: "Introduction to Algorithms",
      date: "2024-01-15",
      dueDate: "2024-02-15",
      status: "Active",
      fine: 0,
    },
    {
      id: "TXN002",
      type: "Return",
      member: "Jane Smith",
      book: "Clean Code",
      date: "2024-01-10",
      returnDate: "2024-01-20",
      status: "Completed",
      fine: 5,
    },
  ];

  const applications = [
    {
      id: "APP001",
      name: "Mike Johnson",
      email: "mike.johnson@student.sbssu.edu",
      department: "Mathematics",
      level: "Graduate",
      status: "Pending",
      submittedDate: "2024-01-20",
      documents: ["ID", "Enrollment"],
    },
    {
      id: "APP002",
      name: "Sarah Wilson",
      email: "sarah.wilson@student.sbssu.edu",
      department: "Business",
      level: "Undergraduate",
      status: "Approved",
      submittedDate: "2024-01-18",
      documents: ["ID", "Enrollment"],
    },
  ];

  const staff = [
    {
      id: "STF001",
      name: "Admin User",
      email: "admin@sbssu.edu",
      role: "Administrator",
      department: "Library",
      status: "Active",
      lastLogin: "2024-01-21",
      permissions: ["All"],
    },
    {
      id: "STF002",
      name: "Library Assistant",
      email: "assistant@sbssu.edu",
      role: "Assistant",
      department: "Library",
      status: "Active",
      lastLogin: "2024-01-20",
      permissions: ["Issue", "Return", "Search"],
    },
  ];

  const sessions = [
    {
      id: "SES001",
      user: "Admin User",
      loginTime: "2024-01-21 09:00:00",
      lastActivity: "2024-01-21 14:30:00",
      ipAddress: "192.168.1.100",
      device: "Chrome on Windows",
      status: "Active",
    },
    {
      id: "SES002",
      user: "Library Assistant",
      loginTime: "2024-01-21 08:30:00",
      lastActivity: "2024-01-21 12:15:00",
      ipAddress: "192.168.1.101",
      device: "Firefox on Mac",
      status: "Inactive",
    },
  ];

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "issue-books", label: "Issue Books", icon: BookOpen },
    { id: "return-books", label: "Return Books", icon: BookMarked },
    { id: "search-issues", label: "Search Issues", icon: Search },
    { id: "search-returns", label: "Search Returns", icon: RefreshCw },
    { id: "transactions", label: "Transactions", icon: CreditCard },
    { id: "members", label: "Members", icon: Users },
    { id: "books", label: "Books", icon: Book },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "staff", label: "Staff", icon: Shield },
    { id: "sessions", label: "Sessions", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
  };

  const renderModal = () => {
    if (!showModal) return null;

    const modalContent = {
      "add-member": {
        title: "Add New Member",
        fields: [
          { label: "Full Name", type: "text", placeholder: "Enter full name" },
          { label: "Email", type: "email", placeholder: "Enter email address" },
          { label: "Phone", type: "tel", placeholder: "Enter phone number" },
          {
            label: "Department",
            type: "select",
            options: ["Computer Science", "Engineering", "Business", "Arts"],
          },
          {
            label: "Academic Level",
            type: "select",
            options: ["Undergraduate", "Graduate", "PhD", "Faculty"],
          },
        ],
      },
      "add-book": {
        title: "Add New Book",
        fields: [
          { label: "Title", type: "text", placeholder: "Enter book title" },
          { label: "Author", type: "text", placeholder: "Enter author name" },
          { label: "ISBN", type: "text", placeholder: "Enter ISBN" },
          {
            label: "Category",
            type: "select",
            options: [
              "Computer Science",
              "Programming",
              "Mathematics",
              "Physics",
            ],
          },
          { label: "Copies", type: "number", placeholder: "Number of copies" },
          { label: "Location", type: "text", placeholder: "Shelf location" },
        ],
      },
      "add-transaction": {
        title: "Add Transaction",
        fields: [
          { label: "Type", type: "select", options: ["Issue", "Return"] },
          { label: "Member ID", type: "text", placeholder: "Enter member ID" },
          { label: "Book ID", type: "text", placeholder: "Enter book ID" },
          { label: "Due Date", type: "date" },
          {
            label: "Fine Amount",
            type: "number",
            placeholder: "Enter fine amount (if any)",
          },
        ],
      },
      "add-staff": {
        title: "Add Staff Member",
        fields: [
          { label: "Full Name", type: "text", placeholder: "Enter full name" },
          { label: "Email", type: "email", placeholder: "Enter email address" },
          {
            label: "Role",
            type: "select",
            options: ["Administrator", "Assistant", "Librarian"],
          },
          {
            label: "Department",
            type: "text",
            placeholder: "Enter department",
          },
          {
            label: "Permissions",
            type: "select",
            options: ["All", "Issue/Return", "Search Only"],
          },
        ],
      },
    };

    const content = modalContent[modalType];
    if (!content) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {content.title}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <form className="space-y-4">
              {content.fields.map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">
                        Select {field.label.toLowerCase()}
                      </option>
                      {field.options?.map((option, optIndex) => (
                        <option key={optIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>
              ))}
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  Add {content.title.split(" ").pop()}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const renderSearchableTable = (
    data,
    columns,
    searchFields,
    addButtonText,
    addModalType
  ) => (
    <div className="space-y-6">
      {/* Search and Add Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${searchFields.join(", ")}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            onClick={() => openModal(addModalType)}
            className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>{addButtonText}</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {column.render ? (
                        column.render(item)
                      ) : (
                        <div className="text-sm text-gray-900 dark:text-white">
                          {item[column.key]}
                        </div>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-lg transition-all duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-all duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderIssueBooks = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Issue Book
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Member ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Scan or enter member ID"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
                <Scan className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Book ID/ISBN
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Scan or enter book ID"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
                <Scan className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Due Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              />
            </div>
            <button className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Issue Book</span>
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h4>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200">
                <Scan className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  Scan Barcode
                </span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200">
                <Search className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  Search Member
                </span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200">
                <Book className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  Search Book
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReturnBooks = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Return Book
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Book ID/ISBN
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Scan or enter book ID"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
                <Scan className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Return Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fine Amount
              </label>
              <input
                type="number"
                placeholder="Enter fine amount (if any)"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              />
            </div>
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <BookMarked className="w-5 h-5" />
              <span>Return Book</span>
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
              Book Condition
            </h4>
            <div className="space-y-3">
              {["Good", "Fair", "Damaged", "Lost"].map((condition) => (
                <label key={condition} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="condition"
                    value={condition}
                    className="text-blue-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {condition}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-all duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden lg:block p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              >
                {isSidebarCollapsed ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-xl flex items-center justify-center">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                    SBSSU Library
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Staff Dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 relative">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {navItems.find((item) => item.id === activeTab)?.label ||
                  "Dashboard"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {activeTab === "dashboard" &&
                  "Overview of library operations and statistics"}
                {activeTab === "issue-books" &&
                  "Issue books to library members"}
                {activeTab === "return-books" &&
                  "Process book returns and calculate fines"}
                {activeTab === "search-issues" &&
                  "Search and manage book issues"}
                {activeTab === "search-returns" &&
                  "Search and manage book returns"}
                {activeTab === "transactions" &&
                  "View and manage transaction history"}
                {activeTab === "members" && "Search and manage library members"}
                {activeTab === "books" && "Search and manage book inventory"}
                {activeTab === "applications" &&
                  "Review membership applications"}
                {activeTab === "staff" &&
                  "Manage staff accounts and permissions"}
                {activeTab === "sessions" && "Monitor active user sessions"}
                {activeTab === "settings" &&
                  "System settings and configuration"}
              </p>
            </div>

            {/* Content */}
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "issue-books" && renderIssueBooks()}
            {activeTab === "return-books" && renderReturnBooks()}

            {activeTab === "search-issues" &&
              renderSearchableTable(
                transactions.filter((t) => t.type === "Issue"),
                [
                  { header: "Transaction ID", key: "id" },
                  { header: "Member", key: "member" },
                  { header: "Book", key: "book" },
                  { header: "Issue Date", key: "date" },
                  { header: "Due Date", key: "dueDate" },
                  {
                    header: "Status",
                    key: "status",
                    render: (item) => (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    ),
                  },
                ],
                ["member", "book", "id"],
                "Add Issue",
                "add-transaction"
              )}

            {activeTab === "search-returns" &&
              renderSearchableTable(
                transactions.filter((t) => t.type === "Return"),
                [
                  { header: "Transaction ID", key: "id" },
                  { header: "Member", key: "member" },
                  { header: "Book", key: "book" },
                  { header: "Return Date", key: "returnDate" },
                  {
                    header: "Fine",
                    key: "fine",
                    render: (item) => `$${item.fine}`,
                  },
                  {
                    header: "Status",
                    key: "status",
                    render: (item) => (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        {item.status}
                      </span>
                    ),
                  },
                ],
                ["member", "book", "id"],
                "Add Return",
                "add-transaction"
              )}

            {activeTab === "transactions" &&
              renderSearchableTable(
                transactions,
                [
                  { header: "Transaction ID", key: "id" },
                  { header: "Type", key: "type" },
                  { header: "Member", key: "member" },
                  { header: "Book", key: "book" },
                  { header: "Date", key: "date" },
                  {
                    header: "Fine",
                    key: "fine",
                    render: (item) => `$${item.fine}`,
                  },
                ],
                ["member", "book", "id"],
                "Add Transaction",
                "add-transaction"
              )}

            {activeTab === "members" &&
              renderSearchableTable(
                members,
                [
                  {
                    header: "Member Info",
                    key: "name",
                    render: (item) => (
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.email}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {item.id}
                        </div>
                      </div>
                    ),
                  },
                  { header: "Department", key: "department" },
                  { header: "Level", key: "level" },
                  {
                    header: "Status",
                    key: "status",
                    render: (item) => (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                            : item.status === "Inactive"
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    ),
                  },
                  { header: "Books Issued", key: "booksIssued" },
                ],
                ["name", "email", "id"],
                "Add Member",
                "add-member"
              )}

            {activeTab === "books" &&
              renderSearchableTable(
                books,
                [
                  {
                    header: "Book Info",
                    key: "title",
                    render: (item) => (
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.author}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {item.isbn}
                        </div>
                      </div>
                    ),
                  },
                  { header: "Category", key: "category" },
                  { header: "Location", key: "location" },
                  {
                    header: "Availability",
                    key: "copies",
                    render: (item) => (
                      <div>
                        <div className="text-sm text-gray-900 dark:text-white">
                          {item.copies - item.issued} available
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {item.issued} issued
                        </div>
                      </div>
                    ),
                  },
                ],
                ["title", "author", "isbn"],
                "Add Book",
                "add-book"
              )}

            {activeTab === "applications" &&
              renderSearchableTable(
                applications,
                [
                  {
                    header: "Applicant",
                    key: "name",
                    render: (item) => (
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.email}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {item.id}
                        </div>
                      </div>
                    ),
                  },
                  { header: "Department", key: "department" },
                  { header: "Level", key: "level" },
                  { header: "Submitted", key: "submittedDate" },
                  {
                    header: "Status",
                    key: "status",
                    render: (item) => (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === "Approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                            : item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    ),
                  },
                ],
                ["name", "email", "id"],
                "Review Applications",
                ""
              )}

            {activeTab === "staff" &&
              renderSearchableTable(
                staff,
                [
                  {
                    header: "Staff Info",
                    key: "name",
                    render: (item) => (
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.email}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {item.id}
                        </div>
                      </div>
                    ),
                  },
                  { header: "Role", key: "role" },
                  { header: "Department", key: "department" },
                  { header: "Last Login", key: "lastLogin" },
                  {
                    header: "Status",
                    key: "status",
                    render: (item) => (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    ),
                  },
                ],
                ["name", "email", "role"],
                "Add Staff",
                "add-staff"
              )}

            {activeTab === "sessions" &&
              renderSearchableTable(
                sessions,
                [
                  { header: "User", key: "user" },
                  { header: "Login Time", key: "loginTime" },
                  { header: "Last Activity", key: "lastActivity" },
                  { header: "IP Address", key: "ipAddress" },
                  { header: "Device", key: "device" },
                  {
                    header: "Status",
                    key: "status",
                    render: (item) => (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    ),
                  },
                ],
                ["user", "ipAddress"],
                "Monitor Sessions",
                ""
              )}

            {activeTab === "settings" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Settings
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  System settings and configuration options
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  );
}
