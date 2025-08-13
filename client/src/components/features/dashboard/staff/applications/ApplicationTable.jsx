import Actions from "../../../../table/Actions";
import Table from "../../../../table/Table";
import ApplicantModal from "./ApplicationModal";
import { GraduationCap } from "lucide-react";
import useModal from "../../../../../hooks/useModal";
import { fromSnakeCase, imagePathUrl } from "../../../../../utils/functions";
import GenderIcon from "../../../../blocks/genderIcon/GenderIcon";

const ApplicationTable = ({ data }) => {
  const { modal, setModal, closeModal } = useModal();

  const architecture = [
    {
      header: "Applicant Info",
      render: (item) => (
        <div className="flex items-center space-x-3">
          <img
            src={imagePathUrl(item.photo)}
            alt={item.fullName}
            className="size-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <div>
            <div className="text-sm flex gap-1 items-center font-medium text-gray-900 dark:text-white">
              {item.fullName}
              <GenderIcon gender={item.gender} />
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
            {fromSnakeCase(item.program)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {fromSnakeCase(item.specialization)} {item.batch}
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
      header: "Status",
      render: (item) => (
        <span
          className={`inline-flex uppercase items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.status === "applied"
              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (item) => <Actions onView={() => setModal("view", item.id)} />,
    },
  ];

  return (
    <>
      <Table data={data} architecture={architecture} />
      {modal.name === "view" && (
        <ApplicantModal id={modal.id} onClose={closeModal} />
      )}
    </>
  );
};

export default ApplicationTable;
