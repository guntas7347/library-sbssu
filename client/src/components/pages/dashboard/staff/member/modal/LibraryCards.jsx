import React, { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  User,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Plus,
} from "lucide-react";

export default function LibraryCardsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Sample library cards data
  const libraryCards = [
    {
      id: "LC2024001",
      cardNumber: "2024001234567890",
      memberName: "John Doe",
      memberId: "LIB001",
      issueDate: "2024-01-15",
      expiryDate: "2025-01-15",
      status: "Active",
      cardType: "Student",
      department: "Computer Science",
      academicLevel: "Undergraduate",
      photo:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
      booksIssued: 3,
      totalBooksIssued: 15,
      finesOutstanding: 5.5,
      lastActivity: "2024-01-20",
    },
    {
      id: "LC2023001",
      cardNumber: "2023001234567890",
      memberName: "John Doe",
      memberId: "LIB001",
      issueDate: "2023-01-15",
      expiryDate: "2024-01-15",
      status: "Expired",
      cardType: "Student",
      department: "Computer Science",
      academicLevel: "Undergraduate",
      photo:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
      booksIssued: 0,
      totalBooksIssued: 12,
      finesOutstanding: 0,
      lastActivity: "2024-01-14",
    },
    {
      id: "LC2022001",
      cardNumber: "2022001234567890",
      memberName: "John Doe",
      memberId: "LIB001",
      issueDate: "2022-01-15",
      expiryDate: "2023-01-15",
      status: "Expired",
      cardType: "Student",
      department: "Computer Science",
      academicLevel: "Undergraduate",
      photo:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
      booksIssued: 0,
      totalBooksIssued: 8,
      finesOutstanding: 0,
      lastActivity: "2023-01-14",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "green";
      case "Expired":
        return "red";
      case "Suspended":
        return "yellow";
      case "Blocked":
        return "gray";
      default:
        return "gray";
    }
  };

  const filteredCards = libraryCards.filter((card) => {
    const matchesSearch =
      card.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.cardNumber.includes(searchQuery) ||
      card.memberId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || card.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                    Library Cards
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Member Card History
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-xl bg-green-100 dark:bg-green-900/50 hover:bg-green-200 dark:hover:bg-green-900/70 transition-all duration-200">
                <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
              </button>
              <button className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all duration-200">
                <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by member name, card number, or member ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="suspended">Suspended</option>
                  <option value="blocked">Blocked</option>
                </select>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Card Header */}
              <div
                className={`bg-gradient-to-r from-${getStatusColor(
                  card.status
                )}-500 to-${getStatusColor(card.status)}-600 p-6 text-white`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={card.photo}
                      alt={card.memberName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{card.memberName}</h3>
                      <p className="text-white/80 text-sm">{card.memberId}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}
                  >
                    {card.status}
                  </span>
                </div>

                {/* Card Visual */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-white/80 text-xs">
                      SBSSU LIBRARY CARD
                    </div>
                    <CreditCard className="w-6 h-6 text-white/60" />
                  </div>
                  <div className="text-white font-mono text-lg tracking-wider mb-2">
                    {card.cardNumber.replace(/(.{4})/g, "$1 ").trim()}
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-white/60 text-xs">VALID THRU</div>
                      <div className="text-white text-sm font-medium">
                        {card.expiryDate}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/60 text-xs">TYPE</div>
                      <div className="text-white text-sm font-medium">
                        {card.cardType}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Department
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {card.department}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Academic Level
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {card.academicLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Issue Date
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {card.issueDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Books Issued
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {card.booksIssued}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Total Books
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {card.totalBooksIssued}
                    </span>
                  </div>
                  {card.finesOutstanding > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        Outstanding Fines
                      </span>
                      <span className="font-medium text-red-600 dark:text-red-400">
                        ${card.finesOutstanding}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Last Activity
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {card.lastActivity}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/70 transition-all duration-200">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View Details</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all duration-200">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {libraryCards.length}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Total Cards
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {libraryCards.filter((c) => c.status === "Active").length}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Active Cards
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {libraryCards.filter((c) => c.status === "Expired").length}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Expired Cards
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {libraryCards.reduce(
                (sum, card) => sum + card.totalBooksIssued,
                0
              )}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Total Books Issued
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
