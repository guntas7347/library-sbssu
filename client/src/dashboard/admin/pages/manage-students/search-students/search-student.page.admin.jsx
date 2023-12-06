import { Button, Grid } from "@mui/material";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllStudents } from "../../../hooks/http-requests.hooks.admin";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import { useState } from "react";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";

const SearchStudentsPage = () => {
  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    sortSelect: "fetchAllStudents",
    sortValue: "",
  });

  const handleFetch = async () => {
    await fetchAllStudents(formFields)
      .then((res) => setRowData(rowsArray(res)))
      .catch((err) => {
        console.error(err);
      });
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, ["rollNumber", "name", "program", "batch"])
      );
    });
  };

  const handleRowClick = (e) => {
    console.log(e);
  };

  return (
    <div className="text-center">
      <h3 className="m-3">Search Students</h3>
      <div>
        <div className="mx-5 d-flex">
          <Grid container spacing={2}>
            <Grid item>
              <InputSelect
                fields={[
                  { name: "Search All Students", value: "fetchAllStudents" },
                  { name: "Roll Number", value: "rollNumber" },
                  { name: "Name", value: "name" },
                  { name: "Phone Number", value: "phoneNumber" },
                  { name: "Email", value: "email" },
                  { name: "Specialization", value: "specialization" },
                  { name: "Batch", value: "batch" },
                  { name: "Date Of Birth", value: "dob" },
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
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button onClick={handleFetch}>Search</Button>
        </div>
        <div className="p-5">
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

export default SearchStudentsPage;
