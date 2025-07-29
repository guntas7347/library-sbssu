import { Plus } from "lucide-react";
import Input from "../../../../../forms/input/Input-2";
import { useForm } from "../../../../../../hooks/useForm";
import CounterField from "../../../../../forms/counter/CounterField";
import CardHeader from "../../../../../header/CardHeader";

const AddProgramCard = ({ onAddProgram = () => {} }) => {
  const { formFields, handleChange, resetFormFields, setFields } = useForm();

  const disabled = formFields.program && formFields.duration;
  return (
    <>
      <div className="card p-6">
        <div className="flex justify-between gap-3 mb-4">
          <CardHeader
            title="  Add New Program"
            svg={Plus}
            svgClass="bg-blue-100 text-blue-600"
          />

          <div className="flex-center gap-3">
            <button
              className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm disabled:cursor-not-allowed"
              onClick={() => {
                onAddProgram(formFields);
                resetFormFields();
              }}
              disabled={!disabled}
            >
              <Plus className="w-4 h-4" />
              Add Program
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Program Name"
            name="program"
            onChange={handleChange}
            value={formFields.program || ""}
            placeholder="Enter degree/diploma name"
          />

          <CounterField
            label="Duration (years)"
            name="duration"
            onChange={(count) => setFields({ duration: count })}
            defaultValue={0}
          />
        </div>
      </div>
    </>
  );
};

export default AddProgramCard;
