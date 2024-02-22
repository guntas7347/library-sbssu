import { Button, Grid } from "@mui/material";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllApplications } from "../../../hooks/http-requests.hooks.admin";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { rowsArray, sortObjectUsingKeys } from "../../../../../utils/functions";
import { useState } from "react";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import SnackbarFeedback from "../../../../../components/feedback/snackbar/snackbar.component";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";

const ApproveStudentPage = () => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    severity: "info",
    message: "",
    open: false,
  });

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
          setSnackbarFeedback([1, 2, "No data found"]);
        }
      })
      .catch((err) => {
        setSnackbarFeedback([1, 2, err]);
      });
  };

  const handleRowClick = (e) => {
    navigate(`/dashboard/admin/manage-students/approve-students/${e}`);
  };

  return (
    <div className="text-center">
      <h3 className="m-3">Search Applications</h3>
      <div>
        <div className="mx-5 d-flex">
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

          <Button onClick={handleFetch}>Submit</Button>
        </div>

        <div className="p-5">
          <CustomTable
            columns={["Roll Number", "Name", "Program", "Batch"]}
            rows={rowData}
            handleRowClick={handleRowClick}
          />
        </div>
      </div>
      <div>
        <SnackbarFeedbackCustom
          feedback={showSnackbarFeedback}
          handleClose={setSnackbarFeedback}
        />
      </div>
    </div>
  );
};

export default ApproveStudentPage;
