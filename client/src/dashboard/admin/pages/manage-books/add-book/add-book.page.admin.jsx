import { Button, Grid } from "@mui/material";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import {
  addNewBook,
  fetchBookDetailsByIsbnApi,
} from "../../../hooks/http-requests.hooks.admin";
import useLengthTrigger from "../../../../../components/forms/hooks/useLengthTrigger/uselengthTrigger.hook.component";

const AddBookPage = () => {
  const { formFields, handleChange, setFormFields } = useForm({
    title: "",
    author: "",
    ISBN: "",
    genre: "",
    publicationYear: null,
    publisher: "",
    program: "",
    language: "",
    description: "",
    price: 0.0,
    tags: [],
  });

  const { title, author, publisher, publicationYear } = formFields;

  const handleAutoFetch = async () => {
    const { title, publish_date, publishers, author } =
      await fetchBookDetailsByIsbnApi(formFields.ISBN);

    setFormFields({
      ...formFields,
      title: title,
      publisher: publishers[0],
      publicationYear: new Date(publish_date).getFullYear(),
      author: author,
    });
  };

  useLengthTrigger(formFields.ISBN, 13, handleAutoFetch);

  const handleClick = async () => {
    console.log(await addNewBook(formFields));
  };

  return (
    <div>
      <br />
      <br />
      <div className="m-5">
        <Grid container spacing={2}>
          <Grid item>
            <InputField
              label="Title"
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputField
              label="Author"
              type="text"
              name="author"
              value={author}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputField
              label="ISBN"
              type="number"
              name="ISBN"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputField
              label="Genre"
              type="text"
              name="genre"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputField
              label="Publication Year"
              type="number"
              name="publicationYear"
              value={publicationYear}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputField
              label="Publisher"
              type="text"
              name="publisher"
              value={publisher}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <InputField
              label="Description"
              type="text"
              name="description"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputField
              label="Price"
              type="number"
              name="price"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <br />
        <Button onClick={handleClick} variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddBookPage;
