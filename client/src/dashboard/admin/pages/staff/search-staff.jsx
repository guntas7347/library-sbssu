import { fetchAllStaff } from "../../hooks/http-requests.hooks.admin";
import { processData } from "../../../../utils/functions";
import { useState } from "react";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Table from "../../../../components/table/button-table";
import SearchBarMenu from "../../../../components/forms/search-bar-menu";
import StaffModal from "./staff-modal";
import StaffButtonSVG from "../../../../components/buttons/svg-buttons/staff-svg.button";
import AddStaffModal from "./add-staff.modal";
import EditStaffModal from "./edit-staff.modal";

const SearchStaffPage = () => {
  const setFeedback = useFeedback();

  const [rowData, setRowData] = useState([]);

  const [modal, setModal] = useState([]);

  const handleFetch = async () => {
    await fetchAllStaff()
      .then((res) =>
        setRowData(processData(res, ["_id", "idNumber", "fullName", "rights"]))
      )
      .catch((error) => {
        setFeedback([1, 2, error]);
      });
  };

  return (
    <>
      <div>
        <div>
          <div className="px-10">
            <h1 className="text-3xl font-semibold my-5">Staff</h1>
            <div className="c-box">
              <div class="flex justify-center items-center ">
                <div className="basis-1/3" />
                <div className="basis-1/3">
                  <SearchBarMenu
                    onSearch={(e) => {
                      handleFetch(e);
                    }}
                    menuOptions={["Name"]}
                  />
                </div>
                <div className="basis-1/3 flex">
                  <div className="ml-auto flex">
                    <StaffButtonSVG onClick={() => setModal(["add", ""])} />
                  </div>
                </div>
              </div>

              <div className="my-5">
                <Table
                  cols={["ID Number", "Name", "Rights", "Action"]}
                  rows={rowData}
                  onClick={(a, e) => setModal([a, e])}
                  actions={["view", "edit"]}
                  totalPages={1}
                  currentPage={1}
                />
              </div>
            </div>
            {modal[0] === "view" && (
              <StaffModal id={modal[1]} onClose={() => setModal([])} />
            )}
            {modal[0] === "add" && (
              <AddStaffModal onClose={() => setModal([])} />
            )}{" "}
            {modal[0] === "edit" && (
              <EditStaffModal id={modal[1]} onClose={() => setModal([])} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchStaffPage;
