import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Activity,
  Edit,
  Trash2,
  Ban,
  RefreshCw,
} from "lucide-react";

export default function MemberDetails() {
  // Sample data data
  const data = {
    id: "LIB001",
    name: "John Doe",
    email: "john.doe@student.sbssu.edu",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1998-05-20",
    gender: "Male",
    address: "123 Main Street",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    studentId: "STU2023001",
    department: "Computer Science",
    academicLevel: "Undergraduate",
    expectedGraduation: "2025-12",
    status: "Active",
    joinDate: "2023-09-15",
    lastActivity: "2024-01-20",
    profilePhoto:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
    libraryCard: "LC2023001",
    membershipType: "Student",
    expiryDate: "2025-12-31",
    booksIssued: 3,
    booksReturned: 15,
    overdueBooks: 1,
    totalFines: 25.5,
    paidFines: 20.0,
    outstandingFines: 5.5,
    currentBooks: [
      {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        issueDate: "2024-01-10",
        dueDate: "2024-02-10",
        status: "Active",
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        issueDate: "2024-01-15",
        dueDate: "2024-02-15",
        status: "Active",
      },
      {
        title: "Database Systems",
        author: "Ramez Elmasri",
        issueDate: "2023-12-20",
        dueDate: "2024-01-20",
        status: "Overdue",
      },
    ],
    recentActivity: [
      {
        action: "Book Issued",
        item: "Clean Code",
        date: "2024-01-15",
        type: "issue",
      },
      {
        action: "Book Returned",
        item: "Data Structures",
        date: "2024-01-12",
        type: "return",
      },
      {
        action: "Fine Paid",
        item: "$10.00",
        date: "2024-01-10",
        type: "payment",
      },
    ],
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
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
                    Member Details
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    ID: {data.id}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all duration-200">
                <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </button>
              <button className="p-2 rounded-xl bg-yellow-100 dark:bg-yellow-900/50 hover:bg-yellow-200 dark:hover:bg-yellow-900/70 transition-all duration-200">
                <Ban className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
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
                    Active Member
                  </h2>
                  <p className="text-green-700 dark:text-green-300">
                    Member since {data.joinDate} • Last active{" "}
                    {data.lastActivity}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 dark:text-green-400">
                  Card: {data.libraryCard}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Expires: {data.expiryDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-8 text-center">
                <div className="relative inline-block mb-6">
                  <img
                    src={data.profilePhoto}
                    alt={data.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {data.name}
                </h3>
                <p className="text-green-600 dark:text-green-400 font-semibold mb-4">
                  {data.membershipType} Member
                </p>

                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {data.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {data.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {data.dateOfBirth}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {data.address}, {data.city}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {data.booksIssued}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Current Books
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {data.booksReturned}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Books Returned
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                Financial Summary
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Fines
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${data.totalFines}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Paid</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    ${data.paidFines}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
                  <span className="text-gray-600 dark:text-gray-400">
                    Outstanding
                  </span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    ${data.outstandingFines}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Academic Information */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                  Academic Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Student ID
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.studentId}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Department
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.department}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Academic Level
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.academicLevel}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Expected Graduation
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.expectedGraduation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Books */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
                  Current Books ({data.booksIssued})
                </h4>

                <div className="space-y-4">
                  {data.currentBooks.map((book, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            book.status === "Overdue"
                              ? "bg-red-100 dark:bg-red-900/50"
                              : "bg-green-100 dark:bg-green-900/50"
                          }`}
                        >
                          {book.status === "Overdue" ? (
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                          ) : (
                            <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {book.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            by {book.author} • Due: {book.dueDate}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          book.status === "Overdue"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                        }`}
                      >
                        {book.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-indigo-600 dark:text-indigo-400" />
                  Recent Activity
                </h4>

                <div className="space-y-4">
                  {data.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === "issue"
                            ? "bg-blue-100 dark:bg-blue-900/50"
                            : activity.type === "return"
                            ? "bg-green-100 dark:bg-green-900/50"
                            : "bg-yellow-100 dark:bg-yellow-900/50"
                        }`}
                      >
                        {activity.type === "issue" && (
                          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        )}
                        {activity.type === "return" && (
                          <RefreshCw className="w-5 h-5 text-green-600 dark:text-green-400" />
                        )}
                        {activity.type === "payment" && (
                          <CreditCard className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.item} • {activity.date}
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
