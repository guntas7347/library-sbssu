import { Button } from "@mui/material";
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
    <div className="text-center">
      <h3 className="m-3">Search Fines</h3>
      <div className="mx-5 d-flex">
        <SearchQueriesComponent
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
        <Button onClick={handleClick}>Submit</Button>
      </div>
      <div className="p-5">
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
