import { Button } from "@mui/material";
import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllBooks } from "../../../hooks/http-requests.hooks.admin";
import { useState } from "react";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import SnackbarFeedback from "../../../../../components/feedback/snackbar/snackbar.component";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";

const SearchBooksPage = () => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange } = useForm({
    sortSelect: "fetchAllBooks",
    sortValue: "",
  });

  const handleFetch = async () => {
    await fetchAllBooks(formFields)
      .then((res) => {
        if (res.length === 0) {
          setSnackbarFeedback({
            open: true,
            message: "No data found",
            severity: "error",
          });
          return;
        }
        setRowData(rowsArray(res));
      })
      .catch((err) => {
        setSnackbarFeedback({ open: true, message: err, severity: "error" });
      });
  };

  const mergeArrayElementsToString = (array = []) => {
    let string = "";
    let isFirst = true;
    array.forEach((element) => {
      if (isFirst) {
        string += `(${array.length}) ` + element.accessionNumber;
        isFirst = false;
      } else {
        string += ", " + element.accessionNumber;
      }
    });
    return string;
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      console.log(obj.accessionNumbers);
      return Object.values(
        sortObjectUsingKeys(
          {
            ...obj,
            accessionNumber: mergeArrayElementsToString(obj.accessionNumbers),
          },
          [
            "_id",
            "accessionNumber",
            "title",
            "author",
            "placeAndPublishers",
            "publicationYear",
          ]
        )
      );
    });
  };

  const handleRowClick = (e) => {
    navigate(`/dashboard/admin/manage-books/view-book/${e}`);
  };

  return (
    <div className="text-center">
      <h3 className="m-3">Search Books</h3>
      <div>
        <div className="mx-5 d-flex">
          <SearchQueriesComponent
            selectFields={[
              {
                name: "Search All Books",
                value: "fetchAllBooks",
                inputField: "none",
              },
              {
                name: "Accession Number",
                value: "accessionNumber",
                inputField: "number",
              },
            ]}
            selectValue={formFields.sortSelect}
            inputValue={formFields.selectValue}
            onChange={handleChange}
          />

          <Button onClick={handleFetch}>Submit</Button>
        </div>
        <div className="p-5">
          <CustomTable
            columns={[
              "Accession Number",
              "Title",
              "Author",
              "Place And Publishers",
              "Publication Year",
            ]}
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

export default SearchBooksPage;
