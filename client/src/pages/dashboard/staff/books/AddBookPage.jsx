import BasicInfoForm from "../../../../components/features/dashboard/staff/book/cards/BasicInfoForm";
import LocationPhysicalDetails from "../../../../components/features/dashboard/staff/book/cards/LocationPhysicalDetails";
import TagsForm from "../../../../components/forms/tags/TagsForm";
import AccessionsField from "../../../../components/features/dashboard/staff/book/cards/AccessionsField";
import { useForm } from "../../../../hooks/useForm";
import { Book, Save } from "lucide-react";
import Confirmation from "../../../../components/features/dashboard/staff/book/modals/Confirmation";
import useAlert from "../../../../hooks/useAlert";
import server from "../../../../services/server.api";
import useFeedback from "../../../../hooks/useFeedback";
import PageHeader from "../../../../components/header/PageHeader";

const AddBookPage = () => {
  const setFeedback = useFeedback();
  const { formFields, handleChange, setFields } = useForm();
  const { showAlert, closeAlert, openAlert } = useAlert();

  const handleSubmit = async () => {
    try {
      const res = await server.book.create(formFields);
      setFeedback(1, res);
    } catch (error) {
      console.log(error);
      setFeedback(2, error);
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
          <BasicInfoForm onChange={handleChange} />
          <TagsForm onChange={(e) => setFields({ tags: e })} />
        </div>
        <div className="space-y-4">
          <button
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 text-white rounded-2xl hover:from-green-700 hover:to-green-800 dark:hover:from-green-600 dark:hover:to-green-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Save className="w-5 h-5" />
            <span>Add Book</span>
          </button>
          <AccessionsField onChange={(e) => setFields({ accessions: e })} />{" "}
          <LocationPhysicalDetails onChange={handleChange} />
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
