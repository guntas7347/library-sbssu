import { useState } from "react";
import { useForm } from "../../../../../../components/forms/use-form-hook/use-form.hook.component";
import InputField from "../../../../../../components/forms/input-field/input-field.component";
import { Button, Grid } from "@mui/material";
import CustomTableSelect from "../../../../../../components/table/custom-table-select.component";
import {
  createBookAccount,
  fetchBookByISBN,
} from "../../../../hooks/http-requests.hooks.admin";
import { sortObjectUsingKeys } from "../../../../../../utils/functions";

const AddBookAccountPage = () => {
  const [showBookTable, setShowBookTable] = useState(false);

  const [showAccountNumberField, setShowAccountNumberField] = useState(false);

  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    isbn: "",
    accountNumber: "",
  });
  const { isbn } = formFields;

  const handleFetchBook = async () => {
    await fetchBookByISBN(formFields).then(async (res) =>
      setRowData(rowsArray([res]))
    );
    setShowBookTable(true);
  };

  const handleSelect = (selectedValue) => {
    if (selectedValue !== null) {
      setShowAccountNumberField(selectedValue);
    } else {
      setShowAccountNumberField(false);
    }
  };

  const handleSubmit = async () => {
    console.log(await createBookAccount(formFields));
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, ["ISBN", "title", "author", "genre", "price"])
      );
    });
  };

  return (
    <div>
      <br />
      <br />
      <div className="m-5">
        <Grid container spacing={4}>
          <Grid item>
            <InputField
              label="Book's ISBN"
              name="isbn"
              type="text"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleFetchBook}>
              Fetch Book
            </Button>
          </Grid>
        </Grid>
        {showBookTable ? (
          <CustomTableSelect
            columns={["ISBN", "Title", "Author", "Genre", "Price"]}
            rows={rowData}
            onSelect={handleSelect}
          />
        ) : (
          ""
        )}
        <br />

        {showAccountNumberField ? (
          <div>
            <Grid container spacing={2}>
              <Grid item>
                <InputField
                  label="ISBN"
                  type="number"
                  name="isbn"
                  value={isbn}
                  disabled
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item>
                <InputField
                  label="Account Number"
                  type="number"
                  name="accountNumber"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <Button onClick={handleSubmit} variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddBookAccountPage;
