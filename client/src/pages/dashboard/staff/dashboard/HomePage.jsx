import PageHeader from "../../../../components/header/PageHeader";
import { GitGraph, AlertCircle, BookOpen, Clock, User } from "lucide-react";
import StatCard from "./cards/StatCard";
import { useEffect } from "react";
import useFeedback from "../../../../hooks/useFeedback";
import { useState } from "react";
import server from "../../../../services/server.api";

const HomePage = () => {
  const setFeedback = useFeedback();
  const [data, setData] = useState({
    totalMembers: 0,
    newMembersChange: 0,
    booksIssuedToday: 0,
    booksIssuedChange: 0,
    overdueBooks: 0,
    overdueBooksChange: 0,
    pendingReturns: 0,
    pendingReturnsChange: 0,
  });
  const [loading, setLoading] = useState(true);

  const stats = [
    {
      title: "Total Members",
      value: data.totalMembers,
      icon: User,
      color: "blue",
      change: `${
        data.newMembersChange > 0 ? "+" : ""
      }${data.newMembersChange.toFixed(0)}%`,
    },
    {
      title: "Books Issued Today",
      value: data.booksIssuedToday,
      icon: BookOpen,
      color: "green",
      change: `${
        data.booksIssuedChange > 0 ? "+" : ""
      }${data.booksIssuedChange.toFixed(0)}%`,
    },
    {
      title: "Overdue Books",
      value: data.overdueBooks,
      icon: AlertCircle,
      color: "red",
      change: `${
        data.overdueBooksChange > 0 ? "+" : ""
      }${data.overdueBooksChange.toFixed(0)}%`,
    },
    {
      title: "Pending Returns",
      value: data.pendingReturns,
      icon: Clock,
      color: "amber",
      change: `${
        data.pendingReturnsChange > 0 ? "+" : ""
      }${data.pendingReturnsChange.toFixed(0)}%`,
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await server.stats();
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
      }
    })();
  }, []);

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
            <StatCard key={stat.title} stat={stat} loading={loading} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
