import { Book, IndianRupee } from "lucide-react";
import Input from "../../../../../forms/input/Input-2";
import TextArea from "../../../../../forms/input/TextArea";

// This component is now fully controlled by the parent.
// It receives its values via `formFields` and reports changes via `onChange`.
const BasicInfoForm = ({ onChange, formFields }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <Book className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
        Basic Information
      </h3>
      <div className="grid grid-cols-2 gap-x-5 gap-y-2 mb-3">
        <Input
          label="Title"
          name="title"
          placeholder="Enter book title"
          required
          onChange={onChange}
          value={formFields.title || ""}
        />
        <Input
          label="Author"
          name="author"
          placeholder="Enter author name"
          required
          onChange={onChange}
          value={formFields.author || ""}
        />
        <Input
          label="ISBN"
          name="isbn"
          placeholder="Enter ISBN"
          onChange={onChange}
          value={formFields.isbn || ""}
        />
        <Input
          label="Place And Publishers"
          name="placeAndPublishers"
          placeholder="Enter publisher"
          onChange={onChange}
          value={formFields.placeAndPublishers || ""}
        />
        <Input
          label="Publication Year"
          name="publicationYear"
          placeholder="e.g., 2023"
          onChange={onChange}
          value={formFields.publicationYear || ""}
        />
        <Input
          label="Edition"
          name="edition"
          placeholder="e.g., 1st Edition"
          onChange={onChange}
          value={formFields.edition || ""}
        />
        <Input
          label="Pages"
          name="pages"
          placeholder="Number of pages"
          onChange={onChange}
          value={formFields.pages || ""}
        />
        <Input
          label="Price"
          name="cost"
          placeholder="0.00"
          SVG={<IndianRupee />}
          onChange={onChange}
          value={formFields.cost || ""}
        />
      </div>
      <TextArea
        label="Description"
        name="description"
        placeholder="A brief description of the book..."
        onChange={onChange}
        value={formFields.description || ""}
      />
    </div>
  );
};

export default BasicInfoForm;
