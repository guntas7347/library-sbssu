import { Button, Grid } from "@mui/material";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllBooks } from "../../../hooks/http-requests.hooks.admin";
import { useState } from "react";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { signOut } from "../../../../http-requests";
import useSignOut from "../../../hooks/useSignOut.hooks";
import { useNavigate } from "react-router-dom";

const SearchBooksPage = () => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);

  const { handleSignOut } = useSignOut();

  const [pagenation_count, setPagenation_count] = useState(0);
  const [pagenation_page, setPagenation_page] = useState(0);

  const { formFields, handleChange } = useForm({
    sortSelect: "fetchAllBooks",
    sortValue: "",
  });

  const handleFetch = async () => {
    await fetchAllBooks(formFields)
      .then((res) => {
        setPagenation_count(res.totalBooks);
        setRowData(rowsArray(res.books));
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          alert("Unauthorised");
          handleSignOut();
        }
      });
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(
          { ...obj, accessionNumber: obj.accessionNumbers[0] },
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
    navigate(`/dashboard/staff/manage-books/view-book/${e}`);
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
                  { name: "Accession Number", value: "accessionNumber" },
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
            columns={[
              "Accession Number",
              "Title",
              "Author",
              "Place And Publishers",
              "Publication Year",
            ]}
            rows={rowData}
            handleRowClick={handleRowClick}
            pagenation_handlePageChange={(e, newPage) =>
              setPagenation_page(newPage)
            }
            pagenation_page={pagenation_page}
            pagenation_count={pagenation_count}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBooksPage;
