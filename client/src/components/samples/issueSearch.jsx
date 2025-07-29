import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  User,
  Book,
  Download,
  Eye,
  Edit,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  SlidersHorizontal,
  X,
  FileText,
  Printer,
  Mail,
} from "lucide-react";

export default function IssueSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all",
    department: "all",
    category: "all",
    issueType: "all",
    renewals: "all",
    customDateFrom: "",
    customDateTo: "",
  });
  const [sortBy, setSortBy] = useState("issueDate");
  const [sortOrder, setSortOrder] = useState("desc");

  // Sample issue data
  const issues = [
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
      daysRemaining: 15,
      issueType: "Regular",
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
      daysRemaining: -3,
      issueType: "Renewed",
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
      daysRemaining: 20,
      issueType: "Regular",
    },
    {
      id: "TXN007",
      book: {
        id: "BK007",
        title: "Artificial Intelligence: A Modern Approach",
        author: "Stuart Russell",
        isbn: "978-0134610993",
        category: "Artificial Intelligence",
        coverImage:
          "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      member: {
        id: "LIB004",
        name: "Sarah Wilson",
        email: "sarah.wilson@student.sbssu.edu",
        phone: "+1 (555) 456-7890",
        department: "Business",
        photo:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      issueDate: "2024-01-20",
      dueDate: "2024-02-22",
      status: "Due Soon",
      renewals: 0,
      maxRenewals: 2,
      issuedBy: "Dr. Emily Johnson",
      location: "AI-C-301",
      daysRemaining: 2,
      issueType: "Extended",
    },
  ];

  const departments = [
    "All",
    "Computer Science",
    "Engineering",
    "Mathematics",
    "Business",
    "Physics",
    "Chemistry",
  ];
  const categories = [
    "All",
    "Computer Science",
    "Programming",
    "Database",
    "Artificial Intelligence",
    "Mathematics",
  ];
  const issueTypes = ["All", "Regular", "Renewed", "Extended", "Special"];

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

  const filteredIssues = issues.filter((issue) => {
    // Search filter
    const matchesSearch =
      issue.book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.book.isbn.includes(searchQuery) ||
      issue.id.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      filters.status === "all" || issue.status.toLowerCase() === filters.status;

    // Department filter
    const matchesDepartment =
      filters.department === "all" ||
      issue.member.department === filters.department;

    // Category filter
    const matchesCategory =
      filters.category === "all" || issue.book.category === filters.category;

    // Issue type filter
    const matchesIssueType =
      filters.issueType === "all" ||
      issue.issueType.toLowerCase() === filters.issueType;

    // Renewals filter
    let matchesRenewals = true;
    if (filters.renewals === "none") matchesRenewals = issue.renewals === 0;
    else if (filters.renewals === "renewed")
      matchesRenewals = issue.renewals > 0;
    else if (filters.renewals === "maxed")
      matchesRenewals = issue.renewals >= issue.maxRenewals;

    // Date range filter
    let matchesDateRange = true;
    if (filters.dateRange !== "all") {
      const issueDate = new Date(issue.issueDate);
      const now = new Date();
      const daysDiff = Math.floor((now - issueDate) / (1000 * 60 * 60 * 24));

      switch (filters.dateRange) {
        case "today":
          matchesDateRange = daysDiff === 0;
          break;
        case "week":
          matchesDateRange = daysDiff <= 7;
          break;
        case "month":
          matchesDateRange = daysDiff <= 30;
          break;
        case "custom":
          if (filters.customDateFrom && filters.customDateTo) {
            const fromDate = new Date(filters.customDateFrom);
            const toDate = new Date(filters.customDateTo);
            matchesDateRange = issueDate >= fromDate && issueDate <= toDate;
          }
          break;
      }
    }

    return (
      matchesSearch &&
      matchesStatus &&
      matchesDepartment &&
      matchesCategory &&
      matchesIssueType &&
      matchesRenewals &&
      matchesDateRange
    );
  });

  const sortedIssues = [...filteredIssues].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "issueDate":
        comparison = new Date(a.issueDate) - new Date(b.issueDate);
        break;
      case "dueDate":
        comparison = new Date(a.dueDate) - new Date(b.dueDate);
        break;
      case "memberName":
        comparison = a.member.name.localeCompare(b.member.name);
        break;
      case "bookTitle":
        comparison = a.book.title.localeCompare(b.book.title);
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
        break;
      case "daysRemaining":
        comparison = a.daysRemaining - b.daysRemaining;
        break;
      default:
        comparison = 0;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: "all",
      dateRange: "all",
      department: "all",
      category: "all",
      issueType: "all",
      renewals: "all",
      customDateFrom: "",
      customDateTo: "",
    });
    setSearchQuery("");
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === sortedIssues.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(sortedIssues.map((issue) => issue.id));
    }
  };

  const exportToExcel = () => {
    const dataToExport =
      selectedItems.length > 0
        ? sortedIssues.filter((issue) => selectedItems.includes(issue.id))
        : sortedIssues;

    const csvContent = [
      [
        "Transaction ID",
        "Book Title",
        "Author",
        "ISBN",
        "Member Name",
        "Member ID",
        "Department",
        "Issue Date",
        "Due Date",
        "Status",
        "Days Remaining",
        "Renewals",
        "Issue Type",
        "Issued By",
        "Location",
      ].join(","),
      ...dataToExport.map((issue) =>
        [
          issue.id,
          `"${issue.book.title}"`,
          `"${issue.book.author}"`,
          issue.book.isbn,
          `"${issue.member.name}"`,
          issue.member.id,
          `"${issue.member.department}"`,
          issue.issueDate,
          issue.dueDate,
          issue.status,
          issue.daysRemaining,
          `${issue.renewals}/${issue.maxRenewals}`,
          issue.issueType,
          `"${issue.issuedBy}"`,
          issue.location,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `issue-search-results-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const sendReminders = () => {
    const overdueIssues =
      selectedItems.length > 0
        ? sortedIssues.filter(
            (issue) =>
              selectedItems.includes(issue.id) &&
              (issue.status === "Overdue" || issue.status === "Due Soon")
          )
        : sortedIssues.filter(
            (issue) => issue.status === "Overdue" || issue.status === "Due Soon"
          );

    alert(`Reminder emails sent to ${overdueIssues.length} members`);
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
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                    Issue Search
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Advanced search and filtering for book issues
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {sortedIssues.length} results
                {selectedItems.length > 0 &&
                  ` (${selectedItems.length} selected)`}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Main Search Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by book title, author, member name, ISBN, or transaction ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                    showAdvancedFilters
                      ? "bg-purple-100 border-purple-300 text-purple-700 dark:bg-purple-900/50 dark:border-purple-600 dark:text-purple-300"
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span>Filters</span>
                </button>
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Advanced Filters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="overdue">Overdue</option>
                    <option value="due soon">Due Soon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    value={filters.department}
                    onChange={(e) =>
                      handleFilterChange("department", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept === "All" ? "all" : dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat === "All" ? "all" : cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Issue Type
                  </label>
                  <select
                    value={filters.issueType}
                    onChange={(e) =>
                      handleFilterChange("issueType", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  >
                    {issueTypes.map((type) => (
                      <option
                        key={type}
                        value={type === "All" ? "all" : type.toLowerCase()}
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Renewals
                  </label>
                  <select
                    value={filters.renewals}
                    onChange={(e) =>
                      handleFilterChange("renewals", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  >
                    <option value="all">All Renewals</option>
                    <option value="none">No Renewals</option>
                    <option value="renewed">Has Renewals</option>
                    <option value="maxed">Max Renewals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date Range
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) =>
                      handleFilterChange("dateRange", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                {filters.dateRange === "custom" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        From Date
                      </label>
                      <input
                        type="date"
                        value={filters.customDateFrom}
                        onChange={(e) =>
                          handleFilterChange("customDateFrom", e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        To Date
                      </label>
                      <input
                        type="date"
                        value={filters.customDateTo}
                        onChange={(e) =>
                          handleFilterChange("customDateTo", e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={handleSelectAll}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
          >
            <CheckCircle className="w-4 h-4" />
            <span>
              {selectedItems.length === sortedIssues.length
                ? "Deselect All"
                : "Select All"}
            </span>
          </button>

          <button
            onClick={sendReminders}
            disabled={
              selectedItems.length === 0 &&
              !sortedIssues.some(
                (issue) =>
                  issue.status === "Overdue" || issue.status === "Due Soon"
              )
            }
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
            <span>Send Reminders</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200">
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>

        {/* Sort Controls */}
        <div className="mb-6 flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
          >
            <option value="issueDate">Issue Date</option>
            <option value="dueDate">Due Date</option>
            <option value="memberName">Member Name</option>
            <option value="bookTitle">Book Title</option>
            <option value="status">Status</option>
            <option value="daysRemaining">Days Remaining</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </span>
          </button>
        </div>

        {/* Results Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedItems.length === sortedIssues.length &&
                        sortedIssues.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Renewals
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sortedIssues.map((issue) => (
                  <tr
                    key={issue.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(issue.id)}
                        onChange={() => handleSelectItem(issue.id)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={issue.book.coverImage}
                          alt={issue.book.title}
                          className="w-10 h-12 object-cover rounded border border-gray-200 dark:border-gray-600"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {issue.book.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {issue.book.author}
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500">
                            {issue.book.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={issue.member.photo}
                          alt={issue.member.name}
                          className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {issue.member.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {issue.member.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {issue.issueDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {issue.dueDate}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getStatusColor(
                          issue.status
                        )}-100 text-${getStatusColor(
                          issue.status
                        )}-800 dark:bg-${getStatusColor(
                          issue.status
                        )}-900/50 dark:text-${getStatusColor(
                          issue.status
                        )}-200`}
                      >
                        {issue.status}
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {issue.daysRemaining > 0
                          ? `${issue.daysRemaining} days left`
                          : `${Math.abs(issue.daysRemaining)} days overdue`}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {issue.renewals}/{issue.maxRenewals}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-lg transition-all duration-200">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg transition-all duration-200">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-8 text-center">
          <button
            onClick={exportToExcel}
            className="inline-flex items-center space-x-3 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Download className="w-5 h-5" />
            <span>Export to Excel</span>
            {selectedItems.length > 0 && (
              <span>({selectedItems.length} selected)</span>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
