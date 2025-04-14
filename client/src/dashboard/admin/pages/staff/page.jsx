import { fetchAllStaff } from "../../hooks/http-requests.hooks.admin";
import { processData } from "../../../../utils/functions";
import { useContext, useState } from "react";
import { SnackBarContext } from "../../../../components/context/snackbar.context";
import Table from "../../../../components/table/button-table";
import SearchBarMenu from "../../../../components/forms/search-bar-menu";
import StaffModal from "./staff-modal";

const SearchStaffPage = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [rowData, setRowData] = useState([]);

  const [modal, setModal] = useState("");

  const handleFetch = async () => {
    await fetchAllStaff()
      .then((res) =>
        setRowData(processData(res, ["_id", "idNumber", "fullName", "level"]))
      )
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  return (
    <>
      <div>
        <div>
          <div className="px-10">
            <h1 className="text-3xl font-semibold my-5">Staff</h1>
            <div className="c-box">
              <SearchBarMenu
                onSearch={(e) => {
                  handleFetch(e);
                }}
                menuOptions={["Name"]}
              />
              <div className="my-5">
                <Table
                  cols={["ID Number", "Name", "Level", "Action"]}
                  rows={rowData}
                  onClick={(a, e) => setModal(e)}
                  actions={["View"]}
                  totalPages={1}
                  currentPage={1}
                />
              </div>
            </div>
            {modal !== "" ? (
              <StaffModal id={modal} onClose={() => setModal("")} />
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchStaffPage;
