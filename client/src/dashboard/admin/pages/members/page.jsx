import { fetchAllStudents } from "../../hooks/http-requests.hooks.admin";
import { processData } from "../../../../utils/functions";
import { useContext, useState } from "react";
import { SnackBarContext } from "../../../../components/context/snackbar.context";
import Table from "../../../../components/table/button-table";
import SearchBarMenu from "../../../../components/forms/search-bar-menu";
import MembersModal from "./member.modal";
import EditMemberModal from "./edit-member.modal";

const SearchStudentsPage = () => {
  const { setFeedback } = useContext(SnackBarContext);
  const [rowData, setRowData] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState(["", ""]);

  const [currentFilter, setCurrentFilter] = useState({});

  const handleFetch = async (e) => {
    setCurrentFilter({ ...currentFilter, ...e });
    await fetchAllStudents({ ...currentFilter, ...e })
      .then((res) => {
        setTotalPages(res.totalPages);
        setRowData(
          processData(res.studentsArray, [
            "_id",
            "membershipId",
            "fullName",
            "role",
            "program",
            "batch",
          ])
        );
        if (res.length === 0) {
          setFeedback([1, 2, "No data found"]);
        }
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  return (
    <div>
      <div>
        <div className="px-10">
          <h1 className="text-3xl font-semibold my-5">Members</h1>
          <div className="c-box">
            <SearchBarMenu
              onSearch={(e) => {
                handleFetch(e);
              }}
              menuOptions={["Full Name", "Roll No", "Membership Id", "Email"]}
            />
            <div className="my-5">
              <Table
                cols={[
                  "Name",
                  "Membership Id",
                  "User Type",
                  "Program",
                  "Batch",
                  "Action",
                ]}
                rows={rowData}
                onClick={(a, e) => setModal([a, e])}
                actions={["View", "Edit"]}
                totalPages={totalPages}
                currentPage={currentPage}
                setPage={(e) => {
                  setCurrentPage(e);
                  handleFetch({ page: e });
                }}
              />
            </div>
          </div>

          {modal[0] === "View" && (
            <MembersModal id={modal[1]} onClose={() => setModal(["", ""])} />
          )}
          {modal[0] === "Edit" && (
            <EditMemberModal id={modal[1]} onClose={() => setModal(["", ""])} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchStudentsPage;
