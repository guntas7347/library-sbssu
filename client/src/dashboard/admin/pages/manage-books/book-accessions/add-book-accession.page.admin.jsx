import { useContext, useState } from "react";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import {
  createBookAccession,
  fetchBookByISBN,
} from "../../../hooks/http-requests.hooks.admin";
import { rowsArray } from "../../../../../utils/functions";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { useNavigate } from "react-router-dom";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";
import Button from "../../../../../components/buttons/button.component";

const AddBookAccessionPage = () => {
  const navigate = useNavigate();

  const { setFeedback } = useContext(SnackBarContext);

  const [showBookTable, setShowBookTable] = useState(false);

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    isbn: "",
    accessionNumber: "",
  });
  const { isbn } = formFields;

  const handleFetchBook = async () => {
    await fetchBookByISBN(isbn)
      .then(async (res) => {
        setRowData(
          rowsArray(
            [res],
            ["_id", "isbn", "title", "author", "publicationYear", "cost"]
          )
        );
        setShowBookTable(true);
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  const handleCreateBookAccession = async () => {
    await createBookAccession(formFields)
      .then((res) => {
        setFeedback([1, 1, res]);
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  const handleRowClick = (e) => {
    navigate(`/dashboard/admin/manage-books/view-book/${e}`);
  };

  return (
    <div className="text-center">
      <h2 className="page-header">Add Accession number to Book</h2>
      <div className="white-container">
        <div className="grid grid-cols-10 gap-5 mb-5">
          <div className="col-span-8">
            <InputField
              className="w-full"
              label="Book's ISBN"
              name="isbn"
              type="text"
              value={isbn}
              disabled={showBookTable}
              onChange={handleChange}
            />
          </div>

          <Button
            className="col-span-2 my-button"
            disabled={showBookTable}
            onClick={handleFetchBook}
            label="Fetch Book"
          />
        </div>

        {showBookTable ? (
          <div>
            <CustomTable
              columns={["ISBN", "Title", "Author", "Publication Year", "Price"]}
              rows={rowData}
              handleRowClick={handleRowClick}
            />
            <div className=" ">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowAlertDialog(true);
                }}
              >
                <div className="grid grid-cols-9 gap-5 mt-10">
                  <div className="col-span-3">
                    <InputField
                      className="w-full"
                      label="ISBN"
                      type="number"
                      name="isbn"
                      value={isbn}
                      disabled
                      InputLabelProps={{ shrink: true }}
                    />
                  </div>
                  <div className="col-span-3">
                    <InputField
                      className="w-full"
                      label="Accession Number"
                      type="number"
                      name="accessionNumber"
                      onChange={handleChange}
                    />
                  </div>
                  <button className="my-button col-span-3" type="submit">
                    Submit
                  </button>
                </div>{" "}
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
        <br />
      </div>
      <div>
        <AlertDialog
          title="Confirm?"
          content="This action can not be undone"
          open={showAlertDialog}
          handleClick={(e) => {
            if (e) handleCreateBookAccession();
            setShowAlertDialog(false);
          }}
        />
      </div>
    </div>
  );
};

export default AddBookAccessionPage;
