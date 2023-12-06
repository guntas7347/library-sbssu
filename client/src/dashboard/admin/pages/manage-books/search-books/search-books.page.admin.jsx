import { Button, Grid } from "@mui/material";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllBooks } from "../../../hooks/http-requests.hooks.admin";
import { useState } from "react";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";

const SearchBooksPage = () => {
  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    sortSelect: "fetchAllBooks",
    sortValue: "",
  });

  const handleFetch = async () => {
    await fetchAllBooks(formFields).then((res) => setRowData(rowsArray(res)));
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, ["ISBN", "title", "author", "genre"])
      );
    });
  };

  const handleRowClick = (e) => {
    console.log(e);
  };

  return (
    <div className="text-center">
      <h3 className="m-3">Search Books</h3>
      <div>
        <div className="mx-5 d-flex">
          <Grid container spacing={2}>
            <Grid item>
              <InputSelect
                fields={[
                  { name: "Search All Books", value: "fetchAllBooks" },
                  { name: "ISBN", value: "ISBN" },
                  { name: "Account Number", value: "accountNumber" },
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
            columns={["ISBN", "Title", "Author", "Genre"]}
            rows={rowData}
            handleRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBooksPage;
