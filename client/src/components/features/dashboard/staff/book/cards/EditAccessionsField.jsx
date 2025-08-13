import { Hash } from "lucide-react";
import Input from "../../../../../forms/input/Input-2";
import useSetting from "../../../../../../hooks/useSetting";
import Select from "../../../../../forms/select/Select";

const EditAccessionsField = ({
  accessions = [],
  onAccessionChange = () => {},
}) => {
  const { data: categories, loading } = useSetting("BOOKS-CATEGORIES");

  if (loading) return <div>Loading Categories...</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Hash className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
          Manage Book Accessions
        </h3>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {accessions.map((book, index) => (
          <div
            key={book.id}
            className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
          >
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Input
                label="Accession No."
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditAccessionsField;
