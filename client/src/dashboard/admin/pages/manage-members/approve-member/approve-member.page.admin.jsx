import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllApplications } from "../../../hooks/http-requests.hooks.admin";
import { rowsArray } from "../../../../../utils/functions";
import { useContext, useEffect, useState } from "react";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";
import useQueryParams from "../../../../../components/hooks/useQueryParams.hook";

const ApproveStudentPage = () => {
  const navigate = useNavigate();
  const { queryString } = useQueryParams();
  const { setFeedback } = useContext(SnackBarContext);

  const [rowData, setRowData] = useState([]);

  const handleFetch = async () => {
    await fetchAllApplications(queryString)
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
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  useEffect(() => {
    handleFetch();
  }, [queryString]);

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">
        Search Applications
      </h1>
      <div>
        <div className="flex gap-10 justify-between my-5 bg-white p-5 rounded-3xl">
          <SearchQueriesComponent
            selectFields={[
              {
                name: "Roll Number",
                value: "rollNumber",
              },
              {
                name: "Search All Applications",
                value: "fetchAllApplications",
              },
            ]}
          />
        </div>

        <div>
          <CustomTable
            columns={[
              "User Type",
              "Roll Number",
              "Name",
              "Program/Desigination",
              "Batch",
            ]}
            rows={rowData}
            handleRowClick={(e) => navigate(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default ApproveStudentPage;
