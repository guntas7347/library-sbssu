import Input from "../../../../components/forms/input";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import server from "../../hooks/http-requests.hooks.admin";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Select from "../../../../components/forms/select-input";
import { useEffect, useState } from "react";
import TextArea from "../../../../components/forms/text-area";
import Modal from "../../../../components/modals/modal.component";
import Button from "../../../../components/buttons/interactive-button";
import ConfirmationModal from "../../../../components/modals/confirmation-model";

const AddBookModal = ({ onClose }) => {
  const setFeedback = useFeedback();

  const [accessionNumbers, setAccessionNumbers] = useState("");
  const { formFields, handleChange, setFields } = useForm();
  const [acnCategories, setAcnCategories] = useState([""]);
  const [btn, setBtn] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleCreate = async () => {
    setBtn(true);
    try {
      console.log(formFields);
      const res = await server.book.addNewBook(formFields);
      setFeedback(1, res.m);
      onClose();
    } catch (error) {
      setFeedback(2, error.m);
      setBtn(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await server.settings.fetchSetting("ACN-CATEGORIES");
        setAcnCategories(res.p.value);
        setFields("category", res.p.value[0]);
      } catch (error) {
        setFeedback(2, error.m);
      }
    })();
  }, []); // fetch accession categories

  return (
    <>
      <Modal onClose={onClose} title="Add book">
        <form
          action="submit"
          onSubmit={(e) => {
            e.preventDefault();
            setAlert(true);
          }}
        >
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <Input
              onChange={handleChange}
              label="Title"
              name="title"
              required={true}
            />
            <Input
              onChange={handleChange}
              label="Author"
              name="author"
              required={true}
            />
            <Input
              onChange={handleChange}
              label="Place and Publishers"
              name="placeAndPublishers"
            />
            <Input
              onChange={handleChange}
              label="Publication Year"
              name="publicationYear"
            />
            <Input onChange={handleChange} label="Source" name="source" />
            <Select
              onChange={handleChange}
              label="Accession Category"
              name="category"
              options={acnCategories}
              value={formFields.category}
            />
            <Input onChange={handleChange} label="Cost" name="cost" />
            <Input onChange={handleChange} label="Pages" name="pages" />
            <Input
              onChange={handleChange}
              label="ISBN"
              name="isbn"
              required={false}
            />
            <TextArea
              value={accessionNumbers}
              onChange={(e) => {
                let { value } = e.target;
                value = value.replace(/[^0-9,]/g, "");
                setAccessionNumbers(value);
                const acns = value.split(",").filter((v) => v !== "");
                setFields("accessionNumbers", acns);
              }}
              label="Accession Numbers (comma separated)"
              name="accessionNumbers"
              required={true}
            />
          </div>
          <hr className="c-hr" />
          <Button label="Confirm" spinner={btn} passive={false} type="submit" />
        </form>
      </Modal>
      <ConfirmationModal
        show={alert}
        onClose={() => setAlert(false)}
        onYes={handleCreate}
        title="Are you sure of it to create below book?"
      >
        <div className="grid grid-cols-2 text-start mb-5">
          <span> Book title:</span>
          <span> {formFields.title} </span>
          <span> Book author:</span>
          <span> {formFields.author} </span>
          <span> Place and Publishers:</span>
          <span> {formFields.placeAndPublishers} </span>
          <span> Publication Year:</span>
          <span> {formFields.publicationYear} </span>
          <span> ISBN:</span>
          <span> {formFields.isbn} </span>
          <span> Source:</span>
          <span> {formFields.source} </span>
          <span> Pages:</span>
          <span> {formFields.pages} </span>
          <span> Cost:</span>
          <span> {formFields.cost} </span>
          <span> Accession categories:</span>
          <span> {formFields.category} </span>
          <span> Accession numbers:</span>
          <span> {accessionNumbers} </span>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default AddBookModal;
