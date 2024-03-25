import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useState } from "react";
import CustomTable from "../../../../../components/table/custom-table.component";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";
import { fetchAllFines } from "../../../hooks/http-requests.hooks.admin";
import { rowsArray } from "../../../../../utils/functions";
import { useNavigate } from "react-router-dom";

const SearchFinesPage = () => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange } = useForm({
    sortSelect: "fetchAllFines",
    sortValue: "",
  });

  const handleClick = async () => {
    await fetchAllFines()
      .then((res) => {
        console.log(res);
        setRowData(
          rowsArray(res, [
            "_id",
            "createdAt",
            "rollNumber",
            "fullName",
            "recieptNumber",
            "category",
            "amount",
          ])
        );
      })
      .catch((err) =>
        setSnackbarFeedback({ open: true, message: err, severity: "error" })
      );
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">Search Fines</h1>
      <div className="grid grid-cols-4 gap-10 my-5 bg-white p-5 rounded-3xl">
        <SearchQueriesComponent
          className="col-span-3"
          selectFields={[
            {
              name: "Search All Fines",
              value: "fetchAllFines",
              inputField: "none",
            },
          ]}
          selectValue={formFields.sortSelect}
          inputValue={formFields.selectValue}
          onChange={handleChange}
        />
        <div className="col-span-1 flex flex-row justify-center items-center">
          <button className="my-button" onClick={handleClick}>
            Search
          </button>
        </div>
      </div>
      <div className="">
        <CustomTable
          columns={[
            "Date",
            "Roll Number",
            "Student Name",
            "Reciept Number",
            "Category",
            "Amount",
          ]}
          rows={rowData}
          handleRowClick={(e) => navigate(e)}
        />
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

export default SearchFinesPage;
