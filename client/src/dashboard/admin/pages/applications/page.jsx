import { fetchAllApplications } from "../../hooks/http-requests.hooks.admin";
import { rowsArray } from "../../../../utils/functions";
import { useState } from "react";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Table from "../../../../components/table/button-table";
import SearchBarMenu from "../../../../components/forms/search-bar-menu";
import ApproveModal from "./application.modal";

const ApplicationsPage = () => {
  const setFeedback = useFeedback();

  const [rowData, setRowData] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState("");

  const [currentFilter, setCurrentFilter] = useState({});

  const handleFetch = async (e) => {
    setCurrentFilter({ ...currentFilter, ...e });

    await fetchAllApplications({ ...currentFilter, ...e })
      .then((res) => {
        setRowData(
          rowsArray(res, [
            "_id",
            "role",
            "rollNumber",
            "fullName",
            "program",
            "batch",
          ])
        );
        if (res.length === 0) {
          setFeedback([1, 2, "No data found"]);
        }
      })
      .catch((error) => {
        setFeedback([1, 2, error]);
      });
  };

  return (
    <>
      <div>
        <div>
          <div className="px-10">
            <h1 className="text-3xl font-semibold my-5">Applications</h1>
            <div className="c-box">
              <SearchBarMenu
                onSearch={(e) => {
                  handleFetch(e);
                }}
                menuOptions={["Roll No", "Full Name", "Membership Id"]}
              />
              <div className="my-5">
                <Table
                  cols={[
                    "User Type",
                    "Roll Number",
                    "Name",
                    "Program/Desigination",
                    "Batch",
                    "Action",
                  ]}
                  rows={rowData}
                  onClick={(a, e) => setModal(e)}
                  actions={["View"]}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setPage={(e) => {
                    setCurrentPage(e);
                    handleFetch({ page: e });
                  }}
                />
              </div>
            </div>
            {modal !== "" ? (
              <ApproveModal
                id={modal}
                onClose={() => {
                  setModal("");
                  handleFetch({ name: "allCategories" });
                }}
              />
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationsPage;
