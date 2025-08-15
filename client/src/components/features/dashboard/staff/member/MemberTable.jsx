import Table from "../../../../table/Table";
import Actions from "../../../../table/Actions";
import useModal from "../../../../../hooks/useModal";
import LibraryCards from "./modal/LibraryCards";
import { CreditCard, Dot, GraduationCap, Mars, Venus } from "lucide-react";
import { fromSnakeCase, imagePathUrl } from "../../../../../utils/functions";
import GenderIcon from "../../../../blocks/genderIcon/GenderIcon";
import { useNavigate } from "react-router-dom";

const MemberTable = ({ data }) => {
  const { modal, setModal, closeModal } = useModal();

  const navigate = useNavigate();

  const architecture = [
    {
      header: "Member Info",
      render: (item) => (
        <div className="flex items-center space-x-3">
          <img
            src={imagePathUrl(item.photo)}
            alt={item.fullName || "No Name"}
            className="size-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <div>
            <div className="text-sm flex gap-1 items-center font-medium text-gray-900 dark:text-white">
              {item.fullName || "Unnamed Member"}
              <GenderIcon gender={item.gender || "female"} />
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {item.email || "No Email"}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {item.membershipId || "N/A"} • {item.rollNumber ?? "N/A"}
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
            {fromSnakeCase(item.program)} {item.batch || ""}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {fromSnakeCase(item.specialization)}
          </div>
        </div>
      ),
    },
    {
      header: "Level",
      render: (item) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
          {fromSnakeCase(item.memberType)}
        </span>
      ),
    },
    {
      header: "Books & Fines",
      render: (item) => {
        const booksIssued =
          typeof item.booksIssued === "number" ? item.booksIssued : 0;
        const fineAmount =
          typeof item.fineAmount === "number" ? item.fineAmount : 0;

        return (
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
              <CreditCard className="w-4 h-4 mr-1 text-purple-500" />
              {booksIssued} Cards
            </div>
            <div
              className={`text-xs ${
                fineAmount < 0
                  ? "text-red-600 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
              }`}
            >
              ₹{fineAmount.toFixed(2)}
            </div>
          </div>
        );
      },
    },
    {
      header: "Status",
      render: (item) => {
        const status = item.status?.toLowerCase() || "unknown";

        const statusStyle = {
          active:
            "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200",
          inactive:
            "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200",
          unknown:
            "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200",
        };

        return (
          <span
            className={`inline-flex uppercase items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusStyle[status] || statusStyle.unknown
            }`}
          >
            {item.status?.toUpperCase() || "UNKNOWN"}
          </span>
        );
      },
    },
    {
      header: "Actions",
      render: (item) => (
        <Actions
          onView={() => {
            if (item.id) navigate(item.id);
          }}
        >
          <button
            className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-green-900/50 rounded-lg transition-all duration-200"
            onClick={() => item.id && setModal("cards-view", item.id)}
            type="button"
          >
            <CreditCard className="w-4 h-4" />
          </button>
        </Actions>
      ),
    },
  ];
  return (
    <>
      <Table data={data} architecture={architecture} />

      {modal.name === "cards-view" && (
        <LibraryCards id={modal.id} onClose={closeModal} />
      )}
    </>
  );
};

export default MemberTable;
