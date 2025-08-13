import {
  ArrowLeft,
  CreditCard,
  User,
  Book,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  FileText,
  Edit,
  Trash2,
  RefreshCw,
  Download,
} from "lucide-react";

export default function TransactionDetails() {
  // Sample transaction data
  const transaction = {
    id: "TXN001",
    type: "Issue",
    status: "Active",
    member: {
      id: "LIB001",
      name: "John Doe",
      email: "john.doe@student.sbssu.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      photo:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    book: {
      id: "BK001",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      isbn: "978-0262033848",
      category: "Computer Science",
      coverImage:
        "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    dates: {
      issued: "2024-01-10",
      due: "2024-02-10",
      returned: null,
      renewed: null,
    },
    staff: {
      issuedBy: "Dr. Emily Johnson",
      issuedById: "STF001",
      returnedBy: null,
      returnedById: null,
    },
    fines: {
      amount: 0,
      reason: null,
      paid: 0,
      outstanding: 0,
      waived: 0,
    },
    renewals: 0,
    maxRenewals: 2,
    notes: "Book issued in good condition. Member reminded about due date.",
    location: "Main Library - Ground Floor",
    condition: {
      issued: "Good",
      returned: null,
    },
    history: [
      {
        action: "Book Issued",
        timestamp: "2024-01-10 10:30:00",
        staff: "Dr. Emily Johnson",
        details: "Book issued to member",
      },
      {
        action: "Due Date Reminder",
        timestamp: "2024-02-05 09:00:00",
        staff: "System",
        details: "Automated reminder sent to member",
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "green";
      case "Overdue":
        return "red";
      case "Returned":
        return "blue";
      case "Renewed":
        return "yellow";
      default:
        return "gray";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Issue":
        return "blue";
      case "Return":
        return "green";
      case "Renewal":
        return "yellow";
      default:
        return "gray";
    }
  };

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
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-800 dark:from-emerald-500 dark:to-emerald-700 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-emerald-400 dark:to-emerald-600 bg-clip-text text-transparent">
                    Transaction Details
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    ID: {transaction.id}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all duration-200">
                <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </button>
              <button className="p-2 rounded-xl bg-green-100 dark:bg-green-900/50 hover:bg-green-200 dark:hover:bg-green-900/70 transition-all duration-200">
                <Download className="w-5 h-5 text-green-600 dark:text-green-400" />
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
          <div
            className={`bg-gradient-to-r from-${getStatusColor(
              transaction.status
            )}-50 to-${getStatusColor(
              transaction.status
            )}-100 dark:from-${getStatusColor(
              transaction.status
            )}-900/20 dark:to-${getStatusColor(
              transaction.status
            )}-800/20 border border-${getStatusColor(
              transaction.status
            )}-200 dark:border-${getStatusColor(
              transaction.status
            )}-700 rounded-2xl p-6`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br from-${getStatusColor(
                    transaction.status
                  )}-500 to-${getStatusColor(
                    transaction.status
                  )}-600 rounded-full flex items-center justify-center`}
                >
                  {transaction.status === "Active" && (
                    <Clock className="w-6 h-6 text-white" />
                  )}
                  {transaction.status === "Returned" && (
                    <CheckCircle className="w-6 h-6 text-white" />
                  )}
                  {transaction.status === "Overdue" && (
                    <AlertCircle className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h2
                    className={`text-xl font-bold text-${getStatusColor(
                      transaction.status
                    )}-800 dark:text-${getStatusColor(transaction.status)}-200`}
                  >
                    {transaction.type} Transaction - {transaction.status}
                  </h2>
                  <p
                    className={`text-${getStatusColor(
                      transaction.status
                    )}-700 dark:text-${getStatusColor(transaction.status)}-300`}
                  >
                    Issued on {transaction.dates.issued} • Due on{" "}
                    {transaction.dates.due}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm text-${getStatusColor(
                    transaction.status
                  )}-600 dark:text-${getStatusColor(transaction.status)}-400`}
                >
                  Days remaining:{" "}
                  {Math.ceil(
                    (new Date(transaction.dates.due) - new Date()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </p>
                <p
                  className={`text-sm text-${getStatusColor(
                    transaction.status
                  )}-600 dark:text-${getStatusColor(transaction.status)}-400`}
                >
                  Renewals: {transaction.renewals}/{transaction.maxRenewals}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Member & Book Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Member Info */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Member Information
                </h4>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={transaction.member.photo}
                    alt={transaction.member.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                  />
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      {transaction.member.name}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {transaction.member.id}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {transaction.member.department}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-400">
                    {transaction.member.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {transaction.member.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Book className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                  Book Information
                </h4>
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={transaction.book.coverImage}
                    alt={transaction.book.title}
                    className="w-16 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                  />
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
                      {transaction.book.title}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      by {transaction.book.author}
                    </p>
                    <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                      {transaction.book.category}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-400">
                    ID: {transaction.book.id}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    ISBN: {transaction.book.isbn}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h4>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/70 transition-all duration-200">
                  <CheckCircle className="w-5 h-5" />
                  <span>Mark as Returned</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-xl hover:bg-yellow-100 dark:hover:bg-yellow-900/70 transition-all duration-200">
                  <RefreshCw className="w-5 h-5" />
                  <span>Renew Book</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/70 transition-all duration-200">
                  <DollarSign className="w-5 h-5" />
                  <span>Add Fine</span>
                </button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Transaction Details */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-emerald-600 dark:text-emerald-400" />
                  Transaction Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Transaction ID
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {transaction.id}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Type
                    </label>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${getTypeColor(
                        transaction.type
                      )}-100 text-${getTypeColor(
                        transaction.type
                      )}-800 dark:bg-${getTypeColor(
                        transaction.type
                      )}-900/50 dark:text-${getTypeColor(
                        transaction.type
                      )}-200`}
                    >
                      {transaction.type}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Issue Date
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {transaction.dates.issued}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Due Date
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {transaction.dates.due}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Issued By
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {transaction.staff.issuedBy}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Location
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {transaction.location}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Notes
                  </label>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    {transaction.notes}
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            {(transaction.fines.amount > 0 ||
              transaction.fines.outstanding > 0) && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="p-8">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <DollarSign className="w-6 h-6 mr-3 text-yellow-600 dark:text-yellow-400" />
                    Financial Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        ${transaction.fines.amount}
                      </p>
                      <p className="text-sm text-red-600 dark:text-red-400">
                        Total Fine
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ${transaction.fines.paid}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Paid
                      </p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        ${transaction.fines.outstanding}
                      </p>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        Outstanding
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction History */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-gray-600 dark:text-gray-400" />
                  Transaction History
                </h4>

                <div className="space-y-4">
                  {transaction.history.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-gray-900 dark:text-white">
                            {entry.action}
                          </h5>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {entry.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {entry.details}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          by {entry.staff}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
