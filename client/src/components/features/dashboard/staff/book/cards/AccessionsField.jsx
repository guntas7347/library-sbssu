import { Hash, Plus, Trash2 } from "lucide-react";
import Input from "../../../../../forms/input/Input-2";
import useSetting from "../../../../../../hooks/useSetting";
import Select from "../../../../../forms/select/Select";

const AccessionsField = ({
  accessions = [],
  onAccessionChange = () => {},
  onAddAccession = () => {},
  onRemoveAccession = () => {},
}) => {
  const { data: categories, loading } = useSetting("BOOKS-CATEGORIES");

  if (loading) return <div>Loading Categories...</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Hash className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
          Book Accessions
        </h3>
        <button
          type="button"
          onClick={onAddAccession} // Calls the function from the parent
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Copy</span>
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-scroll">
        {accessions.map((book, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
          >
            <span className="font-bold">{index + 1}.</span>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Book ID"
                placeholder="Enter Accession"
                value={book.accessionNumber}
                onChange={(e) =>
                  onAccessionChange(index, "accessionNumber", e.target.value)
                }
                required
              />
              <Select
                label="Condition"
                options={["unknown", "new", "good", "fair", "damaged", "lost"]}
                value={book.condition}
                onChange={(e) =>
                  onAccessionChange(index, "condition", e.target.value)
                }
              />
              <Select
                label="Category"
                options={categories || []}
                value={book.category}
                onChange={(e) =>
                  onAccessionChange(index, "category", e.target.value)
                }
                required
              />
            </div>
            {accessions.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveAccession(index)} // Calls the function from the parent
                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessionsField;
