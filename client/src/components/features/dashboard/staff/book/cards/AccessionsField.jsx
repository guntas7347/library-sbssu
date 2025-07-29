import { Hash, Plus, Scan, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Input from "../../../../../forms/input/Input-2";

const AccessionsField = ({ onChange = () => {} }) => {
  const [accessions, setAccessions] = useState([
    { accessionNumber: "", barcode: "", condition: "" },
  ]);
  const addBookId = () => {
    setAccessions((prev) => [
      ...prev,
      { accessionNumber: "", barcode: "", condition: "" },
    ]);
  };

  const removeBookId = (index) => {
    if (accessions.length > 1) {
      setAccessions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      onChange(accessions);
    }, 1000);
    return () => clearTimeout(debounce);
  }, [accessions]);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Hash className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
            Book Accessions
          </h3>
          <button
            type="button"
            onClick={addBookId}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Copy</span>
          </button>
        </div>

        <div className="space-y-4">
          {accessions.map((book, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
            >
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Book ID"
                  placeholder="Enter Accession"
                  value={book.accessionNumber}
                  onChange={(e) => {
                    const updated = [...accessions];
                    updated[index].accessionNumber = e.target.value;
                    setAccessions(updated);
                  }}
                  required
                />

                <Input
                  label="Condition"
                  placeholder="Condition"
                  onChange={(e) => {
                    const updated = [...accessions];
                    updated[index].condition = e.target.value;
                    setAccessions(updated);
                  }}
                />
                <Input
                  label="Barcode"
                  placeholder="Scan or type"
                  onChange={(e) => {
                    const updated = [...accessions];
                    updated[index].barcode = e.target.value;
                    setAccessions(updated);
                  }}
                  SVG={<Scan />}
                />
              </div>
              {accessions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBookId(index)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AccessionsField;
