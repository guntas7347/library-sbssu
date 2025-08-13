import Table from "../../../../table/Table";
import Actions from "../../../../table/Actions";
import ViewStaffModal from "../../../../../pages/dashboard/staff/staff/ViewStaffPage";
import useModal from "../../../../../hooks/useModal";
import { fromSnakeCase, imagePathUrl } from "../../../../../utils/functions";
import {
  Calendar,
  CheckCircle,
  Mail,
  Phone,
  Shield,
  TrendingUp,
  XCircle,
} from "lucide-react";
import GenderIcon from "../../../../blocks/genderIcon/GenderIcon";
import { useNavigate } from "react-router-dom";

const StaffTable = ({ data }) => {
  const navigate = useNavigate();
  const architecture = [
    {
      header: "Staff Info",
      render: (item) => (
        <div className="flex items-center space-x-3">
          <img
            src={imagePathUrl(item.photo)}
            alt={item.fullName || "Staff"}
            className="size-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <div>
            <div className="text-sm flex gap-1 items-center font-medium text-gray-900 dark:text-white">
              {item.fullName || "Unknown"}
              <GenderIcon gender={item.gender || "male"} />
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              {item.email || "No Email"}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {item.employeeId || "N/A"}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Role & Department",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <Shield className="w-4 h-4 mr-1 text-purple-500" />
            {fromSnakeCase(item.role || "staff")}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {fromSnakeCase(item.department || "general")}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            {fromSnakeCase(item.specialization || "N/A")}
          </div>
        </div>
      ),
    },
    {
      header: "Employment",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            {item.salary || "₹0"}/year
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {fromSnakeCase(item.workSchedule || "full_time")}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            Since: {item.joinDate || "Unknown"}
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <Phone className="w-3 h-3 mr-1" />
            {item.phone || "N/A"}
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => {
        const isActive = item.status === "active";
        return (
          <span
            className={`inline-flex uppercase items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isActive
                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                : "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200"
            }`}
          >
            {isActive ? (
              <CheckCircle className="w-3 h-3 mr-1" />
            ) : (
              <XCircle className="w-3 h-3 mr-1" />
            )}
            {item.status || "inactive"}
          </span>
        );
      },
    },
    {
      header: "Actions",
      render: (item) => (
        <Actions
          onView={() => navigate(`/staff/dashboard/staff/${item.id}`)}
          onEdit={() => navigate(`/staff/dashboard/staff/edit/${item.id}`)}
        ></Actions>
      ),
    },
  ];

  return (
    <>
      <Table data={data} architecture={architecture} />
    </>
  );
};

export default StaffTable;
