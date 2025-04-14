import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { addNewBook } from "../../../hooks/http-requests.hooks.admin";
import { useContext, useState } from "react";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const AddBookPage = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const { formFields, handleChange } = useForm({
    isbn: "",
    title: "",
    author: "",
    placeAndPublishers: "",
    publicationYear: "",
    pages: "",
    volume: "",
    source: "",
    cost: "",
    callNumber: "",
  });

  const {
    title,
    author,
    isbn,
    volume,
    pages,
    source,
    cost,
    callNumber,
    publicationYear,
    placeAndPublishers,
  } = formFields;

  const handleAddNewBook = async () => {
    await addNewBook(formFields)
      .then((res) => {
        setFeedback([1, 1, res]);
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">Add New Book</h1>
      <div className="bg-white p-5 rounded-3xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowAlertDialog(true);
          }}
        >
          <div className="grid md:grid-cols-2 gap-x-28 gap-5 justify-center items-center">
            <InputField
              label="Title"
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
            <InputField
              label="Author"
              type="text"
              name="author"
              value={author}
              onChange={handleChange}
            />
            <InputField
              label="ISBN Number"
              type="number"
              name="isbn"
              value={isbn}
              onChange={handleChange}
            />
            <InputField
              label="Place and Publishers"
              type="text"
              name="placeAndPublishers"
              value={placeAndPublishers}
              onChange={handleChange}
            />
            <InputField
              label="Publication Year"
              type="number"
              name="publicationYear"
              value={publicationYear}
              onChange={handleChange}
            />
            <InputField
              label="Pages"
              type="number"
              name="pages"
              value={pages}
              onChange={handleChange}
            />
            <InputField
              label="Volume"
              type="text"
              name="volume"
              value={volume}
              onChange={handleChange}
            />
            <InputField
              label="Source"
              type="text"
              name="source"
              value={source}
              onChange={handleChange}
            />
            <InputField
              label="Price"
              type="number"
              name="cost"
              value={cost}
              onChange={handleChange}
            />
            <InputField
              label="Call Number"
              type="number"
              name="callNumber"
              value={callNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mt-5 flex flex-row justify-center">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div>
        <AlertDialog
          open={showAlertDialog}
          handleClick={(e) => {
            if (e) handleAddNewBook();
            setShowAlertDialog(false);
          }}
        />
      </div>
    </div>
  );
};

export default AddBookPage;
