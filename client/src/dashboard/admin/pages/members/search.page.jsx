import { fetchAllStudents } from "../../hooks/http-requests.hooks.admin";
import { processData } from "../../../../utils/functions";
import { useState } from "react";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Table from "../../../../components/table/button-table";
import SearchBarMenu from "../../../../components/forms/search-bar-menu";
import MembersModal from "./member.modal";
import EditMemberModal from "./edit-member.modal";
import SvgButton from "../../../../components/buttons/svg-button";
import { FilterSVG, MastercardSVG } from "../../../../components/svg/svg-icons";
import AddCardModal from "./add-card.modal";
import FiltersModal from "./filters.modal";

const SearchMembersPage = () => {
  const setFeedback = useFeedback();
  const [rowData, setRowData] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState(["", ""]);

  const [currentFilter, setCurrentFilter] = useState({});

  const handleFetch = async (e) => {
    setCurrentFilter({ ...currentFilter, ...e });
    await fetchAllStudents({ ...currentFilter, ...e })
      .then((res) => {
        setTotalPages(res.p.totalPages);
        setRowData(
          processData(res.p.studentsArray, [
            "_id",
            "membershipId",
            "fullName",
            "role",
            "program",
            "batch",
          ])
        );
      })
      .catch((error) => {
        setFeedback(2, error.m);
      });
  };

  return (
    <div>
      <div>
        <div className="px-10">
          <h1 className="text-3xl font-semibold my-5">Members</h1>
          <div className="c-box">
            <div class="flex justify-center items-center ">
              <div className="basis-1/3">
                <SvgButton
                  svg={<FilterSVG />}
                  onClick={() => setModal(["filter"])}
                />
              </div>
              <div className="basis-1/3">
                <SearchBarMenu
                  onSearch={(e) => {
                    handleFetch(e);
                  }}
                  menuOptions={[
                    "Full Name",
                    "Roll No",
                    "Membership Id",
                    "Email",
                  ]}
                />
              </div>
              <div className="basis-1/3 flex">
                <div className="ml-auto flex">
                  <SvgButton
                    svg={<MastercardSVG />}
                    onClick={() => setModal(["add-card"])}
                  />
                </div>
              </div>
            </div>
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
          {modal[0] === "add-card" && (
            <AddCardModal onClose={() => setModal(["", ""])} />
          )}
          {modal[0] === "filter" && (
            <FiltersModal onClose={() => setModal(["", ""])} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchMembersPage;
