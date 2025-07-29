import React, { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  User,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function IssuedBooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");

  // Sample issued books data
  const issuedBooks = [
    {
      id: "TXN001",
      book: {
        id: "BK001",
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        isbn: "978-0262033848",
        category: "Computer Science",
        coverImage:
          "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      member: {
        id: "LIB001",
        name: "John Doe",
        email: "john.doe@student.sbssu.edu",
        phone: "+1 (555) 123-4567",
        department: "Computer Science",
        photo:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      issueDate: "2024-01-10",
      dueDate: "2024-02-10",
      status: "Active",
      renewals: 0,
      maxRenewals: 2,
      issuedBy: "Dr. Emily Johnson",
      location: "CS-A-101",
      condition: "Good",
      daysRemaining: 15,
    },
    {
      id: "TXN002",
      book: {
        id: "BK002",
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "978-0132350884",
        category: "Programming",
        coverImage:
          "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      member: {
        id: "LIB002",
        name: "Jane Smith",
        email: "jane.smith@student.sbssu.edu",
        phone: "+1 (555) 234-5678",
        department: "Engineering",
        photo:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      issueDate: "2024-01-05",
      dueDate: "2024-01-25",
      status: "Overdue",
      renewals: 1,
      maxRenewals: 2,
      issuedBy: "Dr. Emily Johnson",
      location: "CS-A-102",
      condition: "Good",
      daysRemaining: -3,
    },
    {
      id: "TXN003",
      book: {
        id: "BK003",
        title: "Database Systems",
        author: "Ramez Elmasri",
        isbn: "978-0133970777",
        category: "Database",
        coverImage:
          "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      member: {
        id: "LIB003",
        name: "Mike Johnson",
        email: "mike.johnson@student.sbssu.edu",
        phone: "+1 (555) 345-6789",
        department: "Mathematics",
        photo:
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      issueDate: "2024-01-15",
      dueDate: "2024-02-15",
      status: "Active",
      renewals: 0,
      maxRenewals: 2,
      issuedBy: "Library Assistant",
      location: "DB-B-201",
      condition: "Good",
      daysRemaining: 20,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "green";
      case "Overdue":
        return "red";
      case "Due Soon":
        return "yellow";
      default:
        return "gray";
    }
  };

  const filteredBooks = issuedBooks.filter((book) => {
    const matchesSearch =
      book.book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.book.isbn.includes(searchQuery) ||
      book.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || book.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "dueDate":
        return new Date(a.dueDate) - new Date(b.dueDate);
      case "issueDate":
        return new Date(b.issueDate) - new Date(a.issueDate);
      case "memberName":
        return a.member.name.localeCompare(b.member.name);
      case "bookTitle":
        return a.book.title.localeCompare(b.book.title);
      default:
        return 0;
    }
  });

  const exportToExcel = () => {
    // In a real application, this would generate an Excel file
    const csvContent = [
      [
        "Transaction ID",
        "Book Title",
        "Author",
        "ISBN",
        "Member Name",
        "Member ID",
        "Issue Date",
        "Due Date",
        "Status",
        "Days Remaining",
        "Renewals",
        "Issued By",
      ].join(","),
      ...sortedBooks.map((book) =>
        [
          book.id,
          `"${book.book.title}"`,
          `"${book.book.author}"`,
          book.book.isbn,
          `"${book.member.name}"`,
          book.member.id,
          book.issueDate,
          book.dueDate,
          book.status,
          book.daysRemaining,
          `${book.renewals}/${book.maxRenewals}`,
          `"${book.issuedBy}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `issued-books-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                    Issued Books
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Currently issued book details
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Total: {sortedBooks.length} books
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by book title, author, member name, ISBN, or transaction ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="overdue">Overdue</option>
                  <option value="due soon">Due Soon</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="dueDate">Sort by Due Date</option>
                  <option value="issueDate">Sort by Issue Date</option>
                  <option value="memberName">Sort by Member Name</option>
                  <option value="bookTitle">Sort by Book Title</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Issued
                </p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {issuedBooks.length}
                </p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {issuedBooks.filter((b) => b.status === "Active").length}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Overdue
                </p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {issuedBooks.filter((b) => b.status === "Overdue").length}
                </p>
              </div>
              <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Due Soon
                </p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {
                    issuedBooks.filter(
                      (b) => b.daysRemaining <= 3 && b.daysRemaining > 0
                    ).length
                  }
                </p>
              </div>
              <Clock className="w-12 h-12 text-yellow-600 dark:text-yellow-400 opacity-20" />
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Status Header */}
              <div
                className={`bg-gradient-to-r from-${getStatusColor(
                  book.status
                )}-500 to-${getStatusColor(book.status)}-600 p-4 text-white`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{book.status}</span>
                  <span className="text-sm">
                    {book.daysRemaining > 0
                      ? `${book.daysRemaining} days left`
                      : `${Math.abs(book.daysRemaining)} days overdue`}
                  </span>
                </div>
              </div>

              {/* Book & Member Info */}
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={book.book.coverImage}
                    alt={book.book.title}
                    className="w-16 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-1">
                      {book.book.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      by {book.book.author}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 px-2 py-1 rounded-full">
                        {book.book.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {book.book.id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <img
                    src={book.member.photo}
                    alt={book.member.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {book.member.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {book.member.department}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Transaction ID
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {book.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Issue Date
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {book.issueDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Due Date
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {book.dueDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Renewals
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {book.renewals}/{book.maxRenewals}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Issued By
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {book.issuedBy}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all duration-200">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/70 transition-all duration-200">
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-sm">Renew</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/70 transition-all duration-200">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Return</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Export Button */}
        <div className="mt-8 text-center">
          <button
            onClick={exportToExcel}
            className="inline-flex items-center space-x-3 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Download className="w-5 h-5" />
            <span>Export to Excel</span>
          </button>
        </div>
      </main>
    </div>
  );
}
