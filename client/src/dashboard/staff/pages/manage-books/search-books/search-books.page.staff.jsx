import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllBooks } from "../../../hooks/http-requests.hooks.staff";
import { useContext, useState } from "react";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const SearchBooksPage = () => {
  const navigate = useNavigate();
  const { setFeedback } = useContext(SnackBarContext);

  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    sortSelect: "fetchAllBooks",
    sortValue: "",
  });

  const handleFetch = async () => {
    await fetchAllBooks(formFields)
      .then((res) => {
        if (res.length === 0) {
          setFeedback([1, 2, "No Data Found"]);
          return;
        }
        setRowData(rowsArray(res));
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
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
    navigate(e);
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">Search Books</h1>
      <div>
        <div className="grid grid-cols-4 gap-10 my-5 bg-white p-5 rounded-3xl">
          <SearchQueriesComponent
            className="col-span-3"
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
          <div className="col-span-1 flex flex-row justify-center items-center">
            <button className="my-button " onClick={handleFetch}>
              Submit
            </button>
          </div>
        </div>
        <div className="">
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
    </div>
  );
};

export default SearchBooksPage;
