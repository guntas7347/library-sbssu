import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllStudents } from "../../../hooks/http-requests.hooks.admin";
import { processData } from "../../../../../utils/functions";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";
import Pagination from "../../../../../components/pagination/pagination";
import useQueryParams from "../../../../../components/hooks/useQueryParams.hook";

const SearchStudentsPage = () => {
  const navigate = useNavigate();
  const { queryString } = useQueryParams();
  const { setFeedback } = useContext(SnackBarContext);
  const [rowData, setRowData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const handleFetch = async () => {
    await fetchAllStudents(queryString)
      .then((res) => {
        setTotalPages(res.totalPages);
        console.log(res.studentsArray);
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

  useEffect(() => {
    handleFetch();
  }, [queryString]);
  return (
    <>
      <h1 className="text-center font-bold text-3xl my-2">Search Students</h1>
      <div>
        <div className="flex gap-10 justify-between my-5 bg-white p-5 rounded-3xl">
          <SearchQueriesComponent
            selectFields={[
              {
                name: "Search All Students",
                value: "fetchAllStudents",
              },
              {
                name: "Roll Number",
                value: "rollNumber",
              },

              { name: "Name", value: "fullName", inputField: "text" },
              {
                name: "Specialization",
                value: "specialization",
                inputField: "text",
              },
              { name: "Batch", value: "batch", inputField: "number" },
            ]}
          />
        </div>
        <div>
          <CustomTable
            columns={["Membership Id", "Name", "Type", "Program", "Batch"]}
            rows={rowData}
            handleRowClick={(e) => navigate(e)}
          />
        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
};

export default SearchStudentsPage;
