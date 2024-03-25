import { useContext, useEffect, useState } from "react";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useParams } from "react-router-dom";
import {
  editExistingBook,
  fetchBookDetails,
} from "../../../hooks/http-requests.hooks.admin";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const EditBookPage = () => {
  const { _id } = useParams();

  const { setFeedback } = useContext(SnackBarContext);

  const { formFields, handleChange, setFormFields } = useForm({
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

  const handleSubmit = async () => {
    await editExistingBook(formFields)
      .then((res) => setFeedback([1, 1, res]))
      .catch((err) => setFeedback([1, 2, err]));
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchBookDetails(_id)
        .then((res) => setFormFields(res))
        .catch((err) => setFeedback([1, 2, err]));
    };
    asyncFunc();
  }, []);

  return (
    <div className="">
      <h1 className="text-center font-bold text-3xl my-5">Edit Book Details</h1>
      <div className="bg-white p-5 rounded-3xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid md:grid-cols-2 gap-x-10 gap-5 justify-center items-center">
            <div>
              <InputField
                label="Title"
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
                label="Author"
                type="text"
                name="author"
                value={author}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
                label="ISBN Number"
                type="number"
                name="isbn"
                value={isbn}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
                label="Place and Publishers"
                type="text"
                name="placeAndPublishers"
                value={placeAndPublishers}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
                label="Publication Year"
                type="number"
                name="publicationYear"
                value={publicationYear}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
                label="Pages"
                type="number"
                name="pages"
                value={pages}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
                label="Volume"
                type="text"
                name="volume"
                value={volume}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
                label="Source"
                type="text"
                name="source"
                value={source}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
                label="Price"
                type="number"
                name="cost"
                value={cost}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
                label="Call Number"
                type="number"
                name="callNumber"
                value={callNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-row justify-center gap-5">
            <button
              className="my-button"
              style={{ backgroundColor: "green" }}
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookPage;
