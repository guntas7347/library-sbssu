import { Button, Grid } from "@mui/material";
import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllStudents } from "../../../hooks/http-requests.hooks.admin";
import { rowsArray } from "../../../../../utils/functions";
import { useState } from "react";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";

const SearchStudentsPage = () => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    severity: "info",
    message: "",
    open: false,
  });

  const { formFields, handleChange } = useForm({
    sortSelect: "fetchAllStudents",
    sortValue: "",
  });

  const handleFetch = async () => {
    await fetchAllStudents(formFields)
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
    navigate(`/dashboard/admin/manage-students/search-students/${e}`);
  };

  return (
    <div className="text-center">
      <h3 className="m-3">Search Students</h3>
      <div>
        <div className="mx-5 d-flex">
          <SearchQueriesComponent
            selectFields={[
              {
                name: "Search All Students",
                value: "fetchAllStudents",
                inputField: "none",
              },
              {
                name: "Roll Number",
                value: "rollNumber",
                inputField: "number",
              },
              { name: "Date Of Birth", value: "dob", inputField: "date" },

              { name: "Name", value: "name", inputField: "text" },
              {
                name: "Phone Number",
                value: "phoneNumber",
                inputField: "number",
              },
              { name: "Email", value: "email", inputField: "text" },
              {
                name: "Specialization",
                value: "specialization",
                inputField: "text",
              },
              { name: "Batch", value: "batch", inputField: "number" },
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

export default SearchStudentsPage;
