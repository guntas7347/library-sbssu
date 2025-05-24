import Input from "../../../../components/forms/input";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import server from "../../hooks/http-requests.hooks.admin";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Select from "../../../../components/forms/select-input";
import { useEffect, useState } from "react";
import TextArea from "../../../../components/forms/text-area";
import Modal from "../../../../components/modals/modal.component";
import Button from "../../../../components/buttons/interactive-button";

const AddBookModal = ({ onClose }) => {
  const setFeedback = useFeedback();

  const [accessionNumbers, setAccessionNumbers] = useState("");

  const { formFields, handleChange, setFields } = useForm();

  const [acnCategories, setAcnCategories] = useState([""]);

  const [btn, setBtn] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setBtn(true);
    try {
      const res = await server.book.addNewBook(formFields);
      onClose();
      setFeedback(1, res);
      setBtn(false);
    } catch (error) {
      setFeedback(2, error);
      setBtn(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await server.settings.fetchSetting("ACN-CATEGORIES");
        setAcnCategories(res.value);
      } catch (error) {
        setFeedback(2, error);
      }
    })();
  }, []); // fetch accession categories

  return (
    <Modal onClose={onClose} title="Add book">
      <form action="submit" onSubmit={handleCreate}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Input
            onChange={handleChange}
            label="Name"
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
        <hr className="h-px mt-7 mb-3 bg-gray-200 border-0 dark:bg-gray-600" />
        <Button label="Confirm" spinner={btn} passive={false} type="submit" />
      </form>
    </Modal>
  );
};

export default AddBookModal;
