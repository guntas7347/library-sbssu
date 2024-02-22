import { Button, Grid } from "@mui/material";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllStaff } from "../../../hooks/http-requests.hooks.admin";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import { useState } from "react";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";

const SearchStaffPage = () => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange } = useForm({
    sortSelect: "fetchAllStaff",
    sortValue: "",
  });

  const handleFetch = async () => {
    await fetchAllStaff()
      .then((res) => setRowData(rowsArray(res)))
      .catch((err) => {
        setSnackbarFeedback([1, 2, err]);
      });
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, ["_id", "idNumber", "fullName", "role"])
      );
    });
  };

  const handleRowClick = (e) => {
    navigate(`/dashboard/admin/manage-staff/search-staff/view-staff/${e}`);
  };

  return (
    <div className="text-center">
      <h3 className="m-3">Search Staff</h3>
      <div>
        <div className="mx-5 d-flex">
          <Grid container spacing={2}>
            <Grid item>
              <InputSelect
                fields={[{ name: "Search All Staff", value: "fetchAllStaff" }]}
                value={formFields.sortSelect}
                onChange={handleChange}
                name="sortSelect"
              />
            </Grid>
          </Grid>
          <Button onClick={handleFetch}>Search</Button>
        </div>
        <div className="p-5">
          <CustomTable
            columns={["ID Number", "Name", "Role"]}
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

export default SearchStaffPage;
