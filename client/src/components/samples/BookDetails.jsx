import React from "react";
import {
  ArrowLeft,
  Book,
  User,
  Calendar,
  MapPin,
  Tag,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Plus,
  Eye,
  BarChart3,
} from "lucide-react";

export default function BookDetails() {
  // Sample data data
  const data = {
    id: "BK001",
    title: "Introduction to Algorithms",
    author:
      "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    isbn: "978-0262033848",
    isbn13: "9780262033848",
    publisher: "MIT Press",
    publishedDate: "2009-07-31",
    edition: "3rd Edition",
    pages: 1312,
    language: "English",
    category: "Computer Science",
    subcategory: "Algorithms",
    description:
      "This data provides a comprehensive introduction to the modern study of computer algorithms. It presents many algorithms and covers them in considerable depth, yet makes their design and analysis accessible to all levels of readers.",
    coverImage:
      "https://images.pexels.com/photos/159711/books-bookstore-data-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    location: "CS-A-101",
    shelf: "A-15",
    totalCopies: 5,
    availableCopies: 2,
    issuedCopies: 3,
    reservedCopies: 1,
    status: "Available",
    addedDate: "2023-08-15",
    lastUpdated: "2024-01-20",
    condition: "Good",
    price: 89.99,
    tags: ["Algorithms", "Data Structures", "Computer Science", "Programming"],
    currentIssues: [
      {
        member: "John Doe",
        memberId: "LIB001",
        issueDate: "2024-01-10",
        dueDate: "2024-02-10",
        status: "Active",
      },
      {
        member: "Jane Smith",
        memberId: "LIB002",
        issueDate: "2024-01-15",
        dueDate: "2024-02-15",
        status: "Active",
      },
      {
        member: "Mike Johnson",
        memberId: "LIB003",
        issueDate: "2023-12-20",
        dueDate: "2024-01-20",
        status: "Overdue",
      },
    ],
    reservations: [
      {
        member: "Sarah Wilson",
        memberId: "LIB004",
        reservedDate: "2024-01-18",
        priority: 1,
      },
    ],
    issueHistory: [
      {
        member: "Alice Brown",
        issueDate: "2023-11-01",
        returnDate: "2023-12-01",
        status: "Returned",
      },
      {
        member: "Bob Davis",
        issueDate: "2023-10-15",
        returnDate: "2023-11-15",
        status: "Returned",
      },
    ],
    ratings: {
      average: 4.5,
      total: 23,
      breakdown: { 5: 12, 4: 8, 3: 2, 2: 1, 1: 0 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700 rounded-xl flex items-center justify-center">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                    Book Details
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    ID: {data.id}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-xl bg-green-100 dark:bg-green-900/50 hover:bg-green-200 dark:hover:bg-green-900/70 transition-all duration-200">
                <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
              </button>
              <button className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all duration-200">
                <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </button>
              <button className="p-2 rounded-xl bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-900/70 transition-all duration-200">
                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Banner */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-green-800 dark:text-green-200">
                    {data.status}
                  </h2>
                  <p className="text-green-700 dark:text-green-300">
                    {data.availableCopies} of {data.totalCopies} copies
                    available • {data.issuedCopies} currently issued
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 dark:text-green-400">
                  Location: {data.location}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Shelf: {data.shelf}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover & Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-8 text-center">
                <div className="relative inline-block mb-6">
                  <img
                    src={data.coverImage}
                    alt={data.title}
                    className="w-48 h-64 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-purple-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <Book className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {data.title}
                </h3>
                <p className="text-purple-600 dark:text-purple-400 font-semibold mb-4">
                  by {data.author.split(",")[0]}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.floor(data.ratings.average)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ⭐
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {data.ratings.average} ({data.ratings.total} reviews)
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {data.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-center pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {data.issuedCopies}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Currently Issued
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {data.availableCopies}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h4>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/70 transition-all duration-200">
                  <BookOpen className="w-5 h-5" />
                  <span>Issue Book</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/70 transition-all duration-200">
                  <Plus className="w-5 h-5" />
                  <span>Add Copy</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/70 transition-all duration-200">
                  <BarChart3 className="w-5 h-5" />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Book Information */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Book className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
                  Book Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      ISBN
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.isbn}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Publisher
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.publisher}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Published Date
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.publishedDate}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Edition
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.edition}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Pages
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.pages}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Language
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.language}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Category
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.category}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Price
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      ${data.price}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Description
                  </label>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Current Issues */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                  Current Issues ({data.issuedCopies})
                </h4>

                <div className="space-y-4">
                  {data.currentIssues.map((issue, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            issue.status === "Overdue"
                              ? "bg-red-100 dark:bg-red-900/50"
                              : "bg-blue-100 dark:bg-blue-900/50"
                          }`}
                        >
                          {issue.status === "Overdue" ? (
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                          ) : (
                            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {issue.member}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {issue.memberId} • Issued: {issue.issueDate} • Due:{" "}
                            {issue.dueDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            issue.status === "Overdue"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                          }`}
                        >
                          {issue.status}
                        </span>
                        <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reservations */}
            {data.reservations.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="p-8">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-yellow-600 dark:text-yellow-400" />
                    Reservations ({data.reservations.length})
                  </h4>

                  <div className="space-y-4">
                    {data.reservations.map((reservation, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {reservation.member}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {reservation.memberId} • Reserved:{" "}
                              {reservation.reservedDate}
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200 rounded-full text-xs font-medium">
                          Priority #{reservation.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
