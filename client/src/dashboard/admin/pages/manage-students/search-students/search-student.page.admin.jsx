import { Button } from "@mui/material";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllStudents } from "../../../hooks/http-requests.hooks.admin";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import { useState } from "react";

const SearchStudentsPage = () => {
  const [rowData, setRowData] = useState([]);

  const handleFetch = async () => {
    await fetchAllStudents().then((res) => setRowData(rowsArray(res)));
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, ["rollNumber", "name", "program", "batch"])
      );
    });
  };

  return (
    <div className="text-center">
      <h3 className="m-3">Search Students</h3>
      <div>
        <div>
          <InputSelect
            fields={[
              { name: "Search All Students", value: "fetchAllStudents" },
              { name: "Roll Number", value: "rollNumber" },
            ]}
          />
          {/* <InputField label="Search" /> */}
          <br />
          <Button onClick={handleFetch}>Search</Button>
        </div>
        <div className="p-5">
          <CustomTable
            columns={["Roll Number", "Name", "Program", "Batch"]}
            rows={rowData}
            path={"/dashboard/admin/manage-students/search-students"}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchStudentsPage;
