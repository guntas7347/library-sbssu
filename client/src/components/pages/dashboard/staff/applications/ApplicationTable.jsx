import Actions from "../../../../table/Actions";
import Table from "../../../../table/Table";
import ApplicantModal from "./ApplicationModal";
import { memberTypeLabels } from "../../../../../utils/selectLabels";
import { Mars, Venus } from "lucide-react";
import useModal from "../../../../../hooks/useModal";

const ApplicationTable = ({ data }) => {
  const { modal, setModal, closeModal } = useModal();

  const architecture = [
    {
      header: "Applicant",
      render: (item) => (
        <div>
          <div className="text-sm flex gap-1 items-center font-medium text-gray-900 dark:text-white">
            {item.fullName}

            {item.gender === "male" ? (
              <Mars className="size-5 text-blue-400" />
            ) : (
              <Venus className="size-5 text-pink-400" />
            )}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {item.email}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {item.applicationId}
          </div>
        </div>
      ),
    },
    {
      header: "Degree",
      render: (item) => (
        <div>
          {item.program} | {item.specialization}
        </div>
      ),
    },
    {
      header: "Level",
      render: (item) => <div>{memberTypeLabels[item.memberType]}</div>,
    },
    {
      header: "Submitted",
      render: (item) => <div>{new Date(item.createdAt).toDateString()}</div>,
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
              : item.status === "applied"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
              : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
          }`}
        >
          {item.status.toUpperCase()}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (item) => (
        <>
          <Actions
            onView={() => {
              setModal("view", item.id);
            }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Table data={data} architecture={architecture} />
      {modal.name === "view" && (
        <>
          <ApplicantModal id={modal.id} onClose={closeModal} />
        </>
      )}
    </>
  );
};

export default ApplicationTable;
