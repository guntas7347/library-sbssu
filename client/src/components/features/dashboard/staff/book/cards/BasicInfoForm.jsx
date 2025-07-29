import { Book, IndianRupee } from "lucide-react";
import React from "react";
import Input from "../../../../../forms/input/Input-2";

const BasicInfoForm = ({ onChange = () => {} }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Book className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
          Basic Information
        </h3>

        <div className="grid grid-cols-2 gap-x-5 gap-y-2">
          <Input
            label="Title"
            name="title"
            placeholder="Enter book title"
            required
            onChange={onChange}
          />
          <Input
            label="Author"
            name="author"
            placeholder="Enter author name"
            required
            onChange={onChange}
          />
          <Input
            label="Category"
            name="category"
            placeholder="Select category"
            required
            onChange={onChange}
          />
          <Input
            label="ISBN"
            name="isbn"
            placeholder="Enter ISBN"
            onChange={onChange}
          />
          <Input
            label="Place And Publishers"
            name="placeAndPublishers"
            placeholder="Enter publisher"
            onChange={onChange}
          />
          <Input
            label="Publication Year"
            name="publicationYear"
            placeholder="dd-mm-yyyy"
            onChange={onChange}
          />
          <Input
            label="Edition"
            name="edition"
            placeholder="e.g., 1st Edition"
            onChange={onChange}
          />
          <Input
            label="Pages"
            name="pages"
            placeholder="Number of pages"
            onChange={onChange}
          />
          <Input
            label="Price"
            name="cost"
            placeholder="0.00"
            SVG={<IndianRupee />}
            onChange={onChange}
          />
          <Input
            label="Description"
            name="description"
            placeholder="Description"
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default BasicInfoForm;
