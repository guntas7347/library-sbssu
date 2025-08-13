import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Ban,
  Key,
  Monitor,
  Settings,
} from "lucide-react";

export default function StaffDetails() {
  // Sample data data
  const data = {
    id: "STF001",
    name: "Dr. Emily Johnson",
    email: "emily.johnson@sbssu.edu",
    phone: "+1 (555) 987-6543",
    dateOfBirth: "1985-08-12",
    gender: "Female",
    address: "789 University Ave",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    employeeId: "EMP2020001",
    department: "Library Administration",
    position: "Head Librarian",
    role: "Administrator",
    status: "Active",
    joinDate: "2020-03-15",
    lastLogin: "2024-01-21 14:30:00",
    profilePhoto:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
    salary: 75000,
    workSchedule: "Full-time",
    supervisor: "Dr. Robert Smith",
    permissions: [
      "User Management",
      "Book Management",
      "Transaction Management",
      "Report Generation",
      "System Configuration",
      "Staff Management",
    ],
    recentActivities: [
      {
        action: "Approved membership application",
        details: "APP001 - Sarah Johnson",
        timestamp: "2024-01-21 13:45:00",
        type: "approval",
      },
      {
        action: "Updated book information",
        details: "BK001 - Introduction to Algorithms",
        timestamp: "2024-01-21 11:20:00",
        type: "update",
      },
      {
        action: "Generated monthly report",
        details: "Library Statistics - December 2023",
        timestamp: "2024-01-21 09:15:00",
        type: "report",
      },
      {
        action: "Added new data member",
        details: "STF005 - John Wilson",
        timestamp: "2024-01-20 16:30:00",
        type: "create",
      },
    ],
    loginHistory: [
      {
        date: "2024-01-21",
        time: "08:30:00",
        ipAddress: "192.168.1.100",
        device: "Chrome on Windows",
        duration: "6h 15m",
      },
      {
        date: "2024-01-20",
        time: "08:45:00",
        ipAddress: "192.168.1.100",
        device: "Chrome on Windows",
        duration: "7h 30m",
      },
      {
        date: "2024-01-19",
        time: "09:00:00",
        ipAddress: "192.168.1.100",
        device: "Chrome on Windows",
        duration: "8h 00m",
      },
    ],
    performance: {
      tasksCompleted: 156,
      averageResponseTime: "2.3 hours",
      customerSatisfaction: 4.8,
      attendanceRate: 98.5,
    },
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
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-500 dark:to-indigo-700 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-600 bg-clip-text text-transparent">
                    Staff Details
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
                    Active Staff Member
                  </h2>
                  <p className="text-green-700 dark:text-green-300">
                    Joined {data.joinDate} • Last login {data.lastLogin}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 dark:text-green-400">
                  Role: {data.role}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Department: {data.department}
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
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {data.name}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
                  {data.position}
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
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {data.employeeId}
                    </span>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {data.performance.tasksCompleted}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Tasks Completed
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {data.performance.customerSatisfaction}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Satisfaction
                      </p>
                    </div>
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
                  <Key className="w-5 h-5" />
                  <span>Reset Password</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/70 transition-all duration-200">
                  <Settings className="w-5 h-5" />
                  <span>Edit Permissions</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/70 transition-all duration-200">
                  <Monitor className="w-5 h-5" />
                  <span>View Sessions</span>
                </button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Employment Information */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3 text-indigo-600 dark:text-indigo-400" />
                  Employment Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Employee ID
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.employeeId}
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
                      Position
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.position}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Role
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.role}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Work Schedule
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.workSchedule}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Supervisor
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">
                      {data.supervisor}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
                  System Permissions
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.permissions.map((permission, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {permission}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                  Recent Activities
                </h4>

                <div className="space-y-4">
                  {data.recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === "approval"
                            ? "bg-green-100 dark:bg-green-900/50"
                            : activity.type === "update"
                            ? "bg-blue-100 dark:bg-blue-900/50"
                            : activity.type === "report"
                            ? "bg-purple-100 dark:bg-purple-900/50"
                            : "bg-yellow-100 dark:bg-yellow-900/50"
                        }`}
                      >
                        {activity.type === "approval" && (
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        )}
                        {activity.type === "update" && (
                          <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        )}
                        {activity.type === "report" && (
                          <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        )}
                        {activity.type === "create" && (
                          <User className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.details}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Login History */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-gray-600 dark:text-gray-400" />
                  Recent Login History
                </h4>

                <div className="space-y-4">
                  {data.loginHistory.map((login, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                          <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {login.date} at {login.time}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {login.device} • {login.ipAddress}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {login.duration}
                      </span>
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
