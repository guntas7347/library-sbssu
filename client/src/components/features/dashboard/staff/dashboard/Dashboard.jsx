import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  Clock,
  User,
  Users,
} from "lucide-react";

import PageHeader from "../pageHeader/PageHeader";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Members",
      value: "1,234",
      icon: Users,
      color: "blue",
      change: "+12%",
    },
    {
      title: "Books Issued Today",
      value: "45",
      icon: BookOpen,
      color: "green",
      change: "+8%",
    },
    {
      title: "Overdue Books",
      value: "23",
      icon: AlertCircle,
      color: "red",
      change: "-5%",
    },
    {
      title: "Pending Returns",
      value: "67",
      icon: Clock,
      color: "amber",
      change: "+3%",
    },
  ];
  return (
    <>
      <PageHeader />
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-2 ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-100 dark:bg-${stat.color}-900/50`}
                >
                  <stat.icon
                    className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  action: "Book issued",
                  user: "John Doe",
                  book: "Introduction to Algorithms",
                  time: "2 minutes ago",
                  type: "issue",
                },
                {
                  action: "Book returned",
                  user: "Jane Smith",
                  book: "Data Structures",
                  time: "15 minutes ago",
                  type: "return",
                },
                {
                  action: "New member",
                  user: "Mike Johnson",
                  book: "Registration completed",
                  time: "1 hour ago",
                  type: "member",
                },
                {
                  action: "Overdue notice",
                  user: "Sarah Wilson",
                  book: "Database Systems",
                  time: "2 hours ago",
                  type: "overdue",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === "issue"
                        ? "bg-green-100 dark:bg-green-900/50"
                        : activity.type === "return"
                        ? "bg-blue-100 dark:bg-blue-900/50"
                        : activity.type === "member"
                        ? "bg-purple-100 dark:bg-purple-900/50"
                        : "bg-red-100 dark:bg-red-900/50"
                    }`}
                  >
                    {activity.type === "issue" && (
                      <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                    )}
                    {activity.type === "return" && (
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                    {activity.type === "member" && (
                      <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    )}
                    {activity.type === "overdue" && (
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action}:{" "}
                      <span className="font-normal">{activity.book}</span>
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
