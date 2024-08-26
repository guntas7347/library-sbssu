import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllApplications } from "../../../hooks/http-requests.hooks.admin";
import { rowsArray } from "../../../../../utils/functions";
import { useContext, useState } from "react";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const ApproveStudentPage = () => {
  const navigate = useNavigate();

  const { setFeedback } = useContext(SnackBarContext);

  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    sortSelect: "fetchAllApplications",
    sortValue: "",
  });

  const handleFetch = async () => {
    await fetchAllApplications(formFields)
      .then((res) => {
        setRowData(
          rowsArray(res, ["_id", "rollNumber", "fullName", "program", "batch"])
        );
        if (res.length === 0) {
          setFeedback([1, 2, "No data found"]);
        }
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  const handleRowClick = (e) => {
    navigate(`/dashboard/admin/manage-students/approve-students/${e}`);
  };

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
                inputField: "number",
              },
              {
                name: "Search All Applications",
                value: "fetchAllApplications",
                inputField: "none",
              },
            ]}
            selectValue={formFields.sortSelect}
            selectName="sortSelect"
            inputName="sortValue"
            inputValue={formFields.selectValue}
            onChange={handleChange}
          />
          <button className="my-button " onClick={handleFetch}>
            Submit
          </button>
        </div>

        <div>
          <CustomTable
            columns={["Roll Number", "Name", "Program", "Batch"]}
            rows={rowData}
            handleRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ApproveStudentPage;
