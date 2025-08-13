import { Book, Save } from "lucide-react";
import PageHeader from "../../../../components/header/PageHeader";
import BasicInfoForm from "../../../../components/features/dashboard/staff/book/cards/BasicInfoForm";
import LocationPhysicalDetails from "../../../../components/features/dashboard/staff/book/cards/LocationPhysicalDetails";
import TagsForm from "../../../../components/forms/tags/TagsForm";
import AccessionsField from "../../../../components/features/dashboard/staff/book/cards/AccessionsField";
import Confirmation from "../../../../components/features/dashboard/staff/book/modals/Confirmation";
import { useForm } from "../../../../hooks/useForm";
import useAlert from "../../../../hooks/useAlert";
import server from "../../../../services/server.api";
import useFeedback from "../../../../hooks/useFeedback";

const AddBookPage = () => {
  const setFeedback = useFeedback();
  const { showAlert, closeAlert, openAlert } = useAlert();

  // The entire form state, including accessions, is managed here.
  const { formFields, handleChange, setFields, setFormFields } = useForm({
    tags: [],
    accessions: [{ accessionNumber: "", category: "", condition: "" }],
  });

  // --- LOGIC FOR MANAGING ACCESSIONS ---

  const handleAccessionsChange = (index, field, value) => {
    const updatedAccessions = [...formFields.accessions];
    updatedAccessions[index][field] = value;
    setFields({ accessions: updatedAccessions });
  };

  const addAccession = () => {
    setFields({
      accessions: [
        ...formFields.accessions,
        { accessionNumber: "", category: "", condition: "" },
      ],
    });
  };

  const removeAccession = (index) => {
    if (formFields.accessions.length > 1) {
      const updatedAccessions = formFields.accessions.filter(
        (_, i) => i !== index
      );
      setFields({ accessions: updatedAccessions });
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await server.book.create(formFields);
      setFeedback(1, res);
      setFormFields({
        tags: [],
        accessions: [{ accessionNumber: "", category: "", condition: "" }],
      });
    } catch (error) {
      setFeedback(2, error);
    } finally {
      closeAlert();
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Add new book"
        sub="add book"
        svg={Book}
        colorClass="bg-green-700"
      />
      <form
        className="grid lg:grid-cols-2 gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          openAlert();
        }}
      >
        <div className="space-y-4">
          {/* Pass the form state and handler down */}
          <BasicInfoForm formFields={formFields} onChange={handleChange} />
          <TagsForm
            value={formFields.tags}
            onChange={(newTags) => setFields({ tags: newTags })}
          />
        </div>
        <div className="space-y-4">
          <button
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 text-white rounded-2xl hover:from-green-700 hover:to-green-800 dark:hover:from-green-600 dark:hover:to-green-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Save className="w-5 h-5" />
            <span>Add Book</span>
          </button>

          {/* Pass the accessions state and the new handlers down */}
          <AccessionsField
            accessions={formFields.accessions}
            onAccessionChange={handleAccessionsChange}
            onAddAccession={addAccession}
            onRemoveAccession={removeAccession}
          />

          <LocationPhysicalDetails
            formFields={formFields}
            onChange={handleChange}
          />
        </div>
      </form>
      <Confirmation
        show={showAlert}
        data={formFields}
        onYes={handleSubmit}
        onClose={closeAlert}
      />
    </div>
  );
};

export default AddBookPage;
