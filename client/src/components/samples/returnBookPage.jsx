import React, { useState } from "react";
import {
  ArrowLeft,
  BookMarked,
  User,
  Book,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  Scan,
  Calculator,
} from "lucide-react";

export default function ReturnBookPage() {
  const [bookID, setBookID] = useState("");
  const [showBookDetails, setShowBookDetails] = useState(false);
  const [returnCondition, setReturnCondition] = useState("good");
  const [fineAmount, setFineAmount] = useState(0);
  const [notes, setNotes] = useState("");

  // Sample issued book data
  const issuedBookData = {
    transactionId: "TXN001",
    book: {
      id: "BK001",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen, Charles E. Leiserson",
      isbn: "978-0262033848",
      category: "Computer Science",
      coverImage:
        "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      location: "CS-A-101",
    },
    member: {
      id: "LIB001",
      name: "John Doe",
      email: "john.doe@student.sbssu.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      photo:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
      cardNumber: "2024001234567890",
    },
    issueDate: "2024-01-10",
    dueDate: "2024-02-10",
    issuedBy: "Dr. Emily Johnson",
    daysOverdue: 5,
    isOverdue: true,
    finePerDay: 1.0,
    calculatedFine: 5.0,
  };

  const handleBookIDChange = (value) => {
    setBookID(value);
    setShowBookDetails(value.length > 0);
    if (value.length > 0) {
      // Calculate fine if overdue
      if (issuedBookData.isOverdue) {
        setFineAmount(issuedBookData.calculatedFine);
      }
    }
  };

  const handleReturnBook = () => {
    if (!bookID) {
      alert("Please enter a book ID");
      return;
    }

    const returnData = {
      bookId: bookID,
      memberId: issuedBookData.member.id,
      returnDate: new Date().toISOString().split("T")[0],
      condition: returnCondition,
      fine: fineAmount,
      notes: notes,
    };

    alert(
      `Book returned successfully!\nFine: $${fineAmount}\nCondition: ${returnCondition}`
    );
  };

  const calculateFine = () => {
    if (issuedBookData.isOverdue) {
      const baseFine = issuedBookData.calculatedFine;
      let additionalFine = 0;

      // Additional fine based on condition
      if (returnCondition === "damaged") {
        additionalFine = 10.0;
      } else if (returnCondition === "lost") {
        additionalFine = 50.0;
      }

      setFineAmount(baseFine + additionalFine);
    } else {
      // Only condition-based fine if not overdue
      if (returnCondition === "damaged") {
        setFineAmount(10.0);
      } else if (returnCondition === "lost") {
        setFineAmount(50.0);
      } else {
        setFineAmount(0);
      }
    }
  };

  React.useEffect(() => {
    if (showBookDetails) {
      calculateFine();
    }
  }, [returnCondition, showBookDetails]);

  const conditionOptions = [
    {
      value: "good",
      label: "Good",
      description: "No damage, normal wear",
      fine: 0,
    },
    {
      value: "fair",
      label: "Fair",
      description: "Minor wear, still usable",
      fine: 0,
    },
    {
      value: "damaged",
      label: "Damaged",
      description: "Significant damage, needs repair",
      fine: 10,
    },
    {
      value: "lost",
      label: "Lost",
      description: "Book is lost or missing",
      fine: 50,
    },
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-xl flex items-center justify-center">
                  <BookMarked className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                    Return Book
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Process book returns
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
            {/* Book ID Input */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Book className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
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
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    />
                    <Scan className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Book & Member Details */}
                {showBookDetails && (
                  <div className="space-y-4">
                    {/* Overdue Alert */}
                    {issuedBookData.isOverdue && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4">
                        <div className="flex items-center space-x-3">
                          <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                          <div>
                            <h4 className="font-semibold text-red-800 dark:text-red-200">
                              Overdue Book
                            </h4>
                            <p className="text-sm text-red-700 dark:text-red-300">
                              {issuedBookData.daysOverdue} days overdue • Fine:
                              ${issuedBookData.calculatedFine}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Book Details */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">
                        Book Details
                      </h4>
                      <div className="flex items-start space-x-4">
                        <img
                          src={issuedBookData.book.coverImage}
                          alt={issuedBookData.book.title}
                          className="w-16 h-20 object-cover rounded-lg border border-blue-200 dark:border-blue-600"
                        />
                        <div className="flex-1">
                          <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                            {issuedBookData.book.title}
                          </h5>
                          <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                            by {issuedBookData.book.author}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-blue-600 dark:text-blue-400">
                            <div>ID: {issuedBookData.book.id}</div>
                            <div>ISBN: {issuedBookData.book.isbn}</div>
                            <div>Category: {issuedBookData.book.category}</div>
                            <div>Location: {issuedBookData.book.location}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
                      <h4 className="font-medium text-green-900 dark:text-green-100 mb-3">
                        Member Details
                      </h4>
                      <div className="flex items-center space-x-4">
                        <img
                          src={issuedBookData.member.photo}
                          alt={issuedBookData.member.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-green-200 dark:border-green-600"
                        />
                        <div>
                          <h5 className="font-semibold text-green-900 dark:text-green-100">
                            {issuedBookData.member.name}
                          </h5>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            {issuedBookData.member.department}
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-400">
                            {issuedBookData.member.id} • Card:{" "}
                            {issuedBookData.member.cardNumber}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Issue Details */}
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                      <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-3">
                        Issue Details
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <span className="text-purple-700 dark:text-purple-300">
                            Issued: {issuedBookData.issueDate}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <span className="text-purple-700 dark:text-purple-300">
                            Due: {issuedBookData.dueDate}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <span className="text-purple-700 dark:text-purple-300">
                            By: {issuedBookData.issuedBy}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BookMarked className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <span className="text-purple-700 dark:text-purple-300">
                            ID: {issuedBookData.transactionId}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Return Condition */}
            {showBookDetails && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
                  Book Condition
                </h3>
                <div className="space-y-3">
                  {conditionOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-200"
                    >
                      <input
                        type="radio"
                        name="condition"
                        value={option.value}
                        checked={returnCondition === option.value}
                        onChange={(e) => setReturnCondition(e.target.value)}
                        className="text-amber-600 focus:ring-amber-500 mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {option.label}
                          </span>
                          {option.fine > 0 && (
                            <span className="text-red-600 dark:text-red-400 font-medium">
                              +${option.fine}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {showBookDetails && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Return Notes
                </h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about the book condition or return..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>
            )}
          </div>

          {/* Summary & Action Section */}
          <div className="space-y-6">
            {/* Fine Calculation */}
            {showBookDetails && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" />
                  Fine Calculation
                </h3>

                <div className="space-y-4">
                  {issuedBookData.isOverdue && (
                    <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <span className="text-red-700 dark:text-red-300">
                        Overdue Fine ({issuedBookData.daysOverdue} days)
                      </span>
                      <span className="font-semibold text-red-800 dark:text-red-200">
                        ${issuedBookData.calculatedFine}
                      </span>
                    </div>
                  )}

                  {returnCondition === "damaged" && (
                    <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <span className="text-yellow-700 dark:text-yellow-300">
                        Damage Fine
                      </span>
                      <span className="font-semibold text-yellow-800 dark:text-yellow-200">
                        $10.00
                      </span>
                    </div>
                  )}

                  {returnCondition === "lost" && (
                    <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <span className="text-red-700 dark:text-red-300">
                        Replacement Cost
                      </span>
                      <span className="font-semibold text-red-800 dark:text-red-200">
                        $50.00
                      </span>
                    </div>
                  )}

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        Total Fine
                      </span>
                      <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                        ${fineAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Custom Fine Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={fineAmount}
                        onChange={(e) =>
                          setFineAmount(parseFloat(e.target.value) || 0)
                        }
                        step="0.01"
                        min="0"
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200"
                      />
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Return Summary */}
            {showBookDetails && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BookMarked className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Return Summary
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      Book
                    </h4>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      <p>{issuedBookData.book.title}</p>
                      <p>ID: {issuedBookData.book.id}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                    <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                      Member
                    </h4>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      <p>{issuedBookData.member.name}</p>
                      <p>ID: {issuedBookData.member.id}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
                    <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                      Return Details
                    </h4>
                    <div className="text-sm text-amber-700 dark:text-amber-300">
                      <p>
                        Condition:{" "}
                        {
                          conditionOptions.find(
                            (o) => o.value === returnCondition
                          )?.label
                        }
                      </p>
                      <p>Return Date: {new Date().toDateString()}</p>
                      <p>Fine: ${fineAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Return Button */}
            {showBookDetails && (
              <button
                onClick={handleReturnBook}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <BookMarked className="w-6 h-6" />
                <span>Return Book</span>
              </button>
            )}

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
                  <Book className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Search Book
                  </span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200">
                  <DollarSign className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Calculate Fine
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
