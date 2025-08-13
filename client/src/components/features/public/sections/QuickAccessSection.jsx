import QuickAccessCard from "./cards/QuickAccessCard";
import { Search, FileText, User } from "lucide-react";

const QuickAccessSection = ({ ref }) => {
  const data = [
    {
      title: "View Your Application",
      sub: "Check the status of your library membership application.",
      buttonLabel: "Check Application",
      to: "/join/applied",
      svg: FileText,
      color: "teal",
    },
    {
      title: "View Your Account",
      sub: "Access your account details, checkouts, and preferences.",
      buttonLabel: "Go to Account",
      to: "/login",
      svg: User,
      color: "purple",
    },
    {
      title: "Search Catalog",
      sub: "Find books, articles, and other library materials.",
      buttonLabel: "Search Now",
      to: "/catalogue",
      svg: Search,
      color: "blue",
    },
  ];

  return (
    <>
      <section
        ref={ref}
        className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Access
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Jump straight to what you need with our streamlined access points
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {data.map((item) => (
              <QuickAccessCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default QuickAccessSection;
