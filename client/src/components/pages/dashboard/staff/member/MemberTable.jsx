import React from "react";
import Table from "../../../../table/Table";
import Actions from "../../../../table/Actions";
import MemberDetails from "./MemberDetails";
import useModal from "../../../../../hooks/useModal";
import ViewMemberModal from "./modal/ViewMemberModal";
import LibraryCardsPage from "./modal/LibraryCards";

const MemberTable = ({ data }) => {
  const { modal, setModal, closeModal } = useModal();

  const architecture = [
    {
      header: "Member Info",
      render: (item) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {item.fullName}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {item.email}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {item.membershipId}
          </div>
        </div>
      ),
    },
    { header: "Department", key: "department" },
    { header: "Level", key: "level" },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`inline-flex uppercase items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
              : item.status === "Inactive"
              ? "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200"
              : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    { header: "Books Issued", key: "booksIssued" },
    {
      header: "Actions",
      render: (item) => (
        <>
          <Actions
            onView={() => {
              setModal("view", item.id);
            }}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <Table data={data} architecture={architecture} />{" "}
      {modal.name === "view" && (
        <ViewMemberModal id={modal.id} onClose={closeModal} />
      )}
      <LibraryCardsPage />
    </>
  );
};

export default MemberTable;
