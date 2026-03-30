import PageHeader from "@/components/pageHeader";
import {
  GitGraph,
  AlertCircle,
  BookOpen,
  Clock,
  User,
  Loader2,
} from "lucide-react";

const StatCard = ({ stat = { change: 0 }, loading = true }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.title}
            </p>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {loading ? <Loader2 /> : stat.value}
            </div>
            <p
              className={`text-sm mt-2 ${
                stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
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
    </>
  );
};

const HomePage = () => {
  const stats = [
    {
      title: "Total Members",
      value: 1250,
      icon: User,
      color: "blue",
      change: "+5%",
    },
    {
      title: "Books Issued Today",
      value: 78,
      icon: BookOpen,
      color: "green",
      change: "+12%",
    },
    {
      title: "Overdue Books",
      value: 23,
      icon: AlertCircle,
      color: "red",
      change: "-3%",
    },
    {
      title: "Pending Returns",
      value: 41,
      icon: Clock,
      color: "amber",
      change: "+2%",
    },
  ];

  return (
    <>
      <div className="min-h-screen space-y-5">
        <PageHeader
          title="Dashboard"
          svg={GitGraph}
          sub="Welcome"
          colorClass="bg-blue-700"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.title} stat={stat} loading={false} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
