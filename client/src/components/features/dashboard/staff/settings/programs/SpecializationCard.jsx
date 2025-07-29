import { BookOpen, Clock, Plus, X } from "lucide-react";
import React from "react";
import { useForm } from "../../../../../../hooks/useForm";
import { fromSnakeCase } from "../../../../../../utils/functions";

const SpecializationCard = ({
  program = {},
  onSubAdd = () => {},
  onSubDelete = () => {},
  onDeleteProgram = () => {},
}) => {
  const { formFields, handleChange, resetFormFields } = useForm();
  const disabled = formFields.subStream;

  const handleAddSub = () => {
    onSubAdd(formFields.subStream);
    resetFormFields();
  };
  return (
    <>
      <div className="card p-6">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold uppercase text-gray-900 dark:text-gray-100">
                  {fromSnakeCase(program.name)}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {program.duration} years duration
                  </span>
                </div>
              </div>
            </div>
            <button
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              onClick={onDeleteProgram}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Substreams */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900">Substreams</h4>
            <button
              className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm disabled:cursor-not-allowed"
              onClick={handleAddSub}
              disabled={!disabled}
            >
              <Plus className="w-4 h-4" />
              Add Substream
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center truncate gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg">
              <input
                type="text"
                placeholder="Enter Substream"
                name="subStream"
                onChange={handleChange}
                value={formFields.subStream || ""}
                onKeyUp={(e) => e.key === "Enter" && handleAddSub()}
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-500"
              />
              <button className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {program.specialization.map((sub, idx) => (
              <div
                key={sub.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium uppercase text-gray-700">
                    {fromSnakeCase(sub.name, true)}
                  </span>
                </div>
                <button
                  className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  onClick={() => onSubDelete(idx)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecializationCard;
