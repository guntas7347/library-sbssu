import Table from "@/components/Table";
import { Eye, GraduationCap } from "lucide-react";
import Link from "next/link";

const ApplicationTable = ({ data }) => {
  console.log(data);

  const architecture = [
    {
      header: "Applicant Info",
      render: (item) => (
        <div className="flex items-center space-x-3">
          <img
            src={`/api/uploads/${item.image_id}`}
            alt={item.fullName}
            className="size-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <div>
            <div className="text-sm flex gap-1 items-center font-medium text-gray-900 dark:text-white">
              {item.fullName}
              {item.gender}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {item.email}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {item.applicationId}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Department",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <GraduationCap className="w-4 h-4 mr-1 text-blue-500" />
            {item.course}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {item.branch} {item.batch}
          </div>
        </div>
      ),
    },

    {
      header: "Status",
      render: (item) => (
        <span
          className={`inline-flex uppercase items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.status === "pending"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
              : item.status === "approved"
                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <div className="space-y-1">
          <Link
            href={`/dashboard/applications/${item.id}`}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table data={data} architecture={architecture} />
    </>
  );
};

export default ApplicationTable;
