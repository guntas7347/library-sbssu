import React, { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  User,
  CreditCard,
  Search,
  Calendar,
  CheckCircle,
  AlertCircle,
  Book,
  Scan,
  Clock,
} from "lucide-react";

export default function IssueBookPage() {
  const [memberID, setMemberID] = useState("");
  const [bookID, setBookID] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [issueDays, setIssueDays] = useState("14");
  const [showMemberCards, setShowMemberCards] = useState(false);
  const [showBookDetails, setShowBookDetails] = useState(false);

  // Sample member cards data
  const memberCards = [
    {
      id: "LC2024001",
      cardNumber: "2024001234567890",
      status: "Active",
      expiryDate: "2025-01-15",
      cardType: "Student",
      booksIssued: 3,
      maxBooks: 5,
    },
    {
      id: "LC2023001",
      cardNumber: "2023001234567890",
      status: "Expired",
      expiryDate: "2024-01-15",
      cardType: "Student",
      booksIssued: 0,
      maxBooks: 5,
    },
  ];

  // Sample member data
  const memberData = {
    id: "LIB001",
    name: "John Doe",
    email: "john.doe@student.sbssu.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    academicLevel: "Undergraduate",
    photo:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
    status: "Active",
  };

  // Sample book data
  const bookData = {
    id: "BK001",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson",
    isbn: "978-0262033848",
    category: "Computer Science",
    publisher: "MIT Press",
    edition: "3rd Edition",
    totalCopies: 5,
    availableCopies: 2,
    location: "CS-A-101",
    coverImage:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    status: "Available",
  };

  const handleMemberIDChange = (value) => {
    setMemberID(value);
    setShowMemberCards(value.length > 0);
    setSelectedCard("");
  };

  const handleBookIDChange = (value) => {
    setBookID(value);
    setShowBookDetails(value.length > 0);
    setSelectedBook(value);
  };

  const handleIssueBook = () => {
    if (!selectedCard || !selectedBook || !issueDays) {
      alert("Please select a library card, book, and issue duration");
      return;
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + parseInt(issueDays));

    alert(`Book issued successfully!\nDue Date: ${dueDate.toDateString()}`);
  };

  const issueDaysOptions = [
    { value: "7", label: "7 Days (Short Term)" },
    { value: "14", label: "14 Days (Standard)" },
    { value: "30", label: "30 Days (Extended)" },
    { value: "60", label: "60 Days (Research)" },
    { value: "90", label: "90 Days (Thesis)" },
    { value: "180", label: "180 Days (Special)" },
  ];

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
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
                    Issue Book
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Issue books to members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Member ID Input */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Member Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Member ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={memberID}
                      onChange={(e) => handleMemberIDChange(e.target.value)}
                      placeholder="Scan or enter member ID"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    />
                    <Scan className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Member Details */}
                {showMemberCards && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={memberData.photo}
                        alt={memberData.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 dark:border-blue-600"
                      />
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                          {memberData.name}
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {memberData.department}
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          {memberData.email}
                        </p>
                      </div>
                    </div>

                    {/* Library Cards */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-blue-900 dark:text-blue-100">
                        Available Library Cards:
                      </h5>
                      {memberCards.map((card) => (
                        <label
                          key={card.id}
                          className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-600 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200"
                        >
                          <input
                            type="radio"
                            name="libraryCard"
                            value={card.id}
                            checked={selectedCard === card.id}
                            onChange={(e) => setSelectedCard(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                            disabled={card.status !== "Active"}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {card.cardNumber}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  card.status === "Active"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                                }`}
                              >
                                {card.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Books: {card.booksIssued}/{card.maxBooks} •
                              Expires: {card.expiryDate}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Book ID Input */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Book className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                Book Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Book ID / ISBN
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={bookID}
                      onChange={(e) => handleBookIDChange(e.target.value)}
                      placeholder="Scan or enter book ID"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                    />
                    <Scan className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Book Details */}
                {showBookDetails && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                    <div className="flex items-start space-x-4">
                      <img
                        src={bookData.coverImage}
                        alt={bookData.title}
                        className="w-16 h-20 object-cover rounded-lg border border-purple-200 dark:border-purple-600"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                          {bookData.title}
                        </h4>
                        <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
                          by {bookData.author}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-purple-600 dark:text-purple-400">
                          <div>ISBN: {bookData.isbn}</div>
                          <div>Category: {bookData.category}</div>
                          <div>Location: {bookData.location}</div>
                          <div>
                            Available: {bookData.availableCopies}/
                            {bookData.totalCopies}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              bookData.status === "Available"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                            }`}
                          >
                            {bookData.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Issue Duration */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
                Issue Duration
              </h3>
              <div className="space-y-3">
                {issueDaysOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-200"
                  >
                    <input
                      type="radio"
                      name="issueDays"
                      value={option.value}
                      checked={issueDays === option.value}
                      onChange={(e) => setIssueDays(e.target.value)}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-gray-900 dark:text-white font-medium">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Summary & Action Section */}
          <div className="space-y-6">
            {/* Issue Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                Issue Summary
              </h3>

              <div className="space-y-4">
                {/* Member Summary */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Member
                  </h4>
                  {selectedCard ? (
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      <p>
                        {memberData.name} ({memberData.id})
                      </p>
                      <p>
                        Card:{" "}
                        {
                          memberCards.find((c) => c.id === selectedCard)
                            ?.cardNumber
                        }
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      No card selected
                    </p>
                  )}
                </div>

                {/* Book Summary */}
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
                  <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                    Book
                  </h4>
                  {selectedBook ? (
                    <div className="text-sm text-purple-700 dark:text-purple-300">
                      <p>{bookData.title}</p>
                      <p>
                        ID: {bookData.id} • ISBN: {bookData.isbn}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      No book selected
                    </p>
                  )}
                </div>

                {/* Duration Summary */}
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
                  <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                    Duration
                  </h4>
                  <div className="text-sm text-amber-700 dark:text-amber-300">
                    <p>
                      {
                        issueDaysOptions.find((o) => o.value === issueDays)
                          ?.label
                      }
                    </p>
                    <p>
                      Due Date:{" "}
                      {new Date(
                        Date.now() + parseInt(issueDays) * 24 * 60 * 60 * 1000
                      ).toDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Issue Button */}
            <button
              onClick={handleIssueBook}
              disabled={!selectedCard || !selectedBook}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 text-white rounded-2xl hover:from-green-700 hover:to-green-800 dark:hover:from-green-600 dark:hover:to-green-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <BookOpen className="w-6 h-6" />
              <span>Issue Book</span>
            </button>

            {/* Quick Actions */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
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
      </main>
    </div>
  );
}
