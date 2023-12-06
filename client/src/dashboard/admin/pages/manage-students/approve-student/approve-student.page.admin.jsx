import { Button, Grid } from "@mui/material";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllApplications } from "../../../hooks/http-requests.hooks.admin";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import { useState } from "react";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";

const ApproveStudentPage = () => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    sortSelect: "applicationNumber",
    sortValue: "",
  });

  const handleFetch = async () => {
    await fetchAllApplications(formFields)
      .then((res) => setRowData(rowsArray(res)))
      .catch((err) => {
        console.error(err);
      });
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, [
          "applicationNumber",
          "rollNumber",
          "name",
          "program",
          "batch",
        ])
      );
    });
  };

  const handleRowClick = (e) => {
    console.log(e);
    navigate(`/dashboard/admin/manage-students/approve-students/${e}`);
  };

  return (
    <div className="text-center">
      <h3 className="m-3">Search Applications</h3>
      <div>
        <div className="mx-5 d-flex">
          <Grid container spacing={2}>
            <Grid item>
              <InputSelect
                fields={[
                  { name: "Application Number", value: "applicationNumber" },
                  {
                    name: "Search All Applications",
                    value: "fetchAllApplications",
                  },
                ]}
                value={formFields.sortSelect}
                onChange={handleChange}
                name="sortSelect"
              />
            </Grid>
            <Grid item>
              <InputField
                label="Value"
                name="sortValue"
                type="number"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button onClick={handleFetch}>Search</Button>
        </div>
        <div className="p-5">
          <CustomTable
            columns={[
              "Application Number",
              "Roll Number",
              "Name",
              "Program",
              "Batch",
            ]}
            rows={rowData}
            handleRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ApproveStudentPage;
