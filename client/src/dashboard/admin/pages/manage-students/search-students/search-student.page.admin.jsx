import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllStudents } from "../../../hooks/http-requests.hooks.admin";
import { rowsArray } from "../../../../../utils/functions";
import { useContext, useState } from "react";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const SearchStudentsPage = () => {
  const navigate = useNavigate();
  const { setFeedback } = useContext(SnackBarContext);

  const [rowData, setRowData] = useState([]);

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
          setFeedback([1, 2, "No data found"]);
        }
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  const handleRowClick = (e) => {
    navigate(`/dashboard/admin/manage-students/search-students/${e}`);
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">Search Students</h1>
      <div>
        <div className="grid grid-cols-4 gap-10 my-5 bg-white p-5 rounded-3xl">
          <SearchQueriesComponent
            className="col-span-3"
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

          <div className="col-span-1 flex flex-row justify-center items-center">
            <button className="my-button " onClick={handleFetch}>
              Submit
            </button>
          </div>
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

export default SearchStudentsPage;
