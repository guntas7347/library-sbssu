import React, { useState } from "react";
import {
  ArrowLeft,
  BookMarked,
  User,
  Calendar,
  CheckCircle,
  DollarSign,
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  Clock,
  Award,
} from "lucide-react";

export default function ReturnedBooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [sortBy, setSortBy] = useState("returnDate");

  // Sample returned books data
  const returnedBooks = [
    {
      id: "TXN004",
      book: {
        id: "BK004",
        title: "Data Structures and Algorithms",
        author: "Michael T. Goodrich",
        isbn: "978-1118771334",
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
      issueDate: "2023-12-01",
      dueDate: "2024-01-01",
      returnDate: "2023-12-28",
      returnedBy: "Dr. Emily Johnson",
      condition: {
        issued: "Good",
        returned: "Good",
      },
      fine: {
        amount: 0,
        reason: null,
        paid: 0,
      },
      renewals: 1,
      daysHeld: 27,
      status: "Returned On Time",
      location: "CS-A-101",
    },
    {
      id: "TXN005",
      book: {
        id: "BK005",
        title: "Operating System Concepts",
        author: "Abraham Silberschatz",
        isbn: "978-1118063330",
        category: "Operating Systems",
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
      issueDate: "2023-11-15",
      dueDate: "2023-12-15",
      returnDate: "2023-12-20",
      returnedBy: "Library Assistant",
      condition: {
        issued: "Good",
        returned: "Fair",
      },
      fine: {
        amount: 15.0,
        reason: "Late return (5 days)",
        paid: 15.0,
      },
      renewals: 0,
      daysHeld: 35,
      status: "Returned Late",
      location: "OS-B-205",
    },
    {
      id: "TXN006",
      book: {
        id: "BK006",
        title: "Machine Learning Yearning",
        author: "Andrew Ng",
        isbn: "978-0999579909",
        category: "Machine Learning",
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
      issueDate: "2024-01-01",
      dueDate: "2024-02-01",
      returnDate: "2024-01-25",
      returnedBy: "Dr. Emily Johnson",
      condition: {
        issued: "Good",
        returned: "Good",
      },
      fine: {
        amount: 0,
        reason: null,
        paid: 0,
      },
      renewals: 0,
      daysHeld: 24,
      status: "Returned On Time",
      location: "ML-C-301",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Returned On Time":
        return "green";
      case "Returned Late":
        return "red";
      case "Returned Early":
        return "blue";
      default:
        return "gray";
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case "Good":
        return "green";
      case "Fair":
        return "yellow";
      case "Poor":
        return "red";
      case "Damaged":
        return "red";
      default:
        return "gray";
    }
  };

  const filteredBooks = returnedBooks.filter((book) => {
    const matchesSearch =
      book.book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.book.isbn.includes(searchQuery) ||
      book.id.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    if (filterPeriod !== "all") {
      const returnDate = new Date(book.returnDate);
      const now = new Date();
      const daysDiff = Math.floor((now - returnDate) / (1000 * 60 * 60 * 24));

      switch (filterPeriod) {
        case "today":
          matchesFilter = daysDiff === 0;
          break;
        case "week":
          matchesFilter = daysDiff <= 7;
          break;
        case "month":
          matchesFilter = daysDiff <= 30;
          break;
        case "quarter":
          matchesFilter = daysDiff <= 90;
          break;
      }
    }

    return matchesSearch && matchesFilter;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "returnDate":
        return new Date(b.returnDate) - new Date(a.returnDate);
      case "issueDate":
        return new Date(b.issueDate) - new Date(a.issueDate);
      case "memberName":
        return a.member.name.localeCompare(b.member.name);
      case "bookTitle":
        return a.book.title.localeCompare(b.book.title);
      case "fine":
        return b.fine.amount - a.fine.amount;
      default:
        return 0;
    }
  });

  const exportToExcel = () => {
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
        "Return Date",
        "Days Held",
        "Status",
        "Fine Amount",
        "Condition Issued",
        "Condition Returned",
        "Returned By",
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
          book.returnDate,
          book.daysHeld,
          book.status,
          book.fine.amount,
          book.condition.issued,
          book.condition.returned,
          `"${book.returnedBy}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `returned-books-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalFines = returnedBooks.reduce(
    (sum, book) => sum + book.fine.amount,
    0
  );
  const totalFinesPaid = returnedBooks.reduce(
    (sum, book) => sum + book.fine.paid,
    0
  );

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
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 rounded-xl flex items-center justify-center">
                  <BookMarked className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
                    Returned Books
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Book return history and details
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Total: {sortedBooks.length} returns
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="returnDate">Sort by Return Date</option>
                  <option value="issueDate">Sort by Issue Date</option>
                  <option value="memberName">Sort by Member Name</option>
                  <option value="bookTitle">Sort by Book Title</option>
                  <option value="fine">Sort by Fine Amount</option>
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
                  Total Returns
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {returnedBooks.length}
                </p>
              </div>
              <BookMarked className="w-12 h-12 text-green-600 dark:text-green-400 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  On Time
                </p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {
                    returnedBooks.filter((b) => b.status === "Returned On Time")
                      .length
                  }
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-blue-600 dark:text-blue-400 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Late Returns
                </p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {
                    returnedBooks.filter((b) => b.status === "Returned Late")
                      .length
                  }
                </p>
              </div>
              <Clock className="w-12 h-12 text-red-600 dark:text-red-400 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Fines
                </p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  ${totalFines.toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-yellow-600 dark:text-yellow-400 opacity-20" />
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
                  <span className="text-sm">{book.daysHeld} days held</span>
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
                      <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 px-2 py-1 rounded-full">
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
                      Return Date
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {book.returnDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Condition
                    </span>
                    <div className="flex space-x-1">
                      <span
                        className={`px-2 py-1 rounded text-xs bg-${getConditionColor(
                          book.condition.issued
                        )}-100 text-${getConditionColor(
                          book.condition.issued
                        )}-800 dark:bg-${getConditionColor(
                          book.condition.issued
                        )}-900/50 dark:text-${getConditionColor(
                          book.condition.issued
                        )}-200`}
                      >
                        {book.condition.issued}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span
                        className={`px-2 py-1 rounded text-xs bg-${getConditionColor(
                          book.condition.returned
                        )}-100 text-${getConditionColor(
                          book.condition.returned
                        )}-800 dark:bg-${getConditionColor(
                          book.condition.returned
                        )}-900/50 dark:text-${getConditionColor(
                          book.condition.returned
                        )}-200`}
                      >
                        {book.condition.returned}
                      </span>
                    </div>
                  </div>
                  {book.fine.amount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Fine
                      </span>
                      <span className="font-medium text-red-600 dark:text-red-400">
                        ${book.fine.amount}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Returned By
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {book.returnedBy}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/70 transition-all duration-200">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View Details</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all duration-200">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Receipt</span>
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
