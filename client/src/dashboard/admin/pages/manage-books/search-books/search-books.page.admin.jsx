import { Button } from "@mui/material";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllBooks } from "../../../hooks/http-requests.hooks.admin";
import { useState } from "react";
import { sortObjectUsingKeys } from "../../../../../utils/functions";

const SearchBooksPage = () => {
  const [rowData, setRowData] = useState([]);

  const handleFetch = async () => {
    await fetchAllBooks().then((res) => setRowData(rowsArray(res)));
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, ["ISBN", "title", "author", "genre"])
      );
    });
  };

  return (
    <div className="text-center">
      <h3 className="m-3">Search Books</h3>
      <div>
        <div>
          <InputSelect
            fields={[
              { name: "Search All Books", value: "fetchAllBooks" },
              { name: "ISBN", value: "isbn" },
            ]}
          />
          {/* <InputField label="Search" /> */}
          <br />
          <Button onClick={handleFetch}>Search</Button>
        </div>
        <div className="p-5">
          <CustomTable
            columns={["ISBN", "Title", "Author", "Genre"]}
            rows={rowData}
            path={"/dashboard/admin/manage-books/view-book"}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBooksPage;
