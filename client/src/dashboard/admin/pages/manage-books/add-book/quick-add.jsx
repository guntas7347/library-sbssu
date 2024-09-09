import React, { useContext } from "react";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { quickAddBook } from "../../../hooks/http-requests.hooks.admin";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const QuickAddBook = ({ passSuccess }) => {
  const { setFeedback } = useContext(SnackBarContext);

  const { formFields, handleChange, resetFormFields } = useForm({
    title: "",
    author: "",
    isbn: "",
    accessionNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await quickAddBook(formFields)
      .then((res) => {
        passSuccess();
        resetFormFields();
        setFeedback([1, 1, res]);
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  return (
    <div className="bg-white rounded-3xl p-10 grid gap-10  z-50 opacity-100">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-10">
          <InputField
            label="Book Title"
            name="title"
            type="text"
            onChange={handleChange}
          />
          <InputField
            label="Author"
            name="author"
            type="text"
            onChange={handleChange}
          />
          <InputField
            label="ISBN"
            name="isbn"
            type="number"
            onChange={handleChange}
            required={false}
          />
          <InputField
            label="Accession Number"
            name="accessionNumber"
            type="number"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center mt-5">
          <button className="my-button" type="submit">
            Add Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuickAddBook;
