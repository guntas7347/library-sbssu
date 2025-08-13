import { Plus } from "lucide-react";
import { useForm } from "../../../hooks/useForm";

const InputList = ({
  onAdd = () => {},
  placeholder,
  name = "input",
  ...props
}) => {
  const { formFields, handleChange, resetFormFields } = useForm();

  const handleAdd = () => {
    onAdd(formFields[name]);
    resetFormFields();
  };

  return (
    <>
      <div className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          value={formFields[name] || ""}
          onChange={handleChange}
          autoComplete="off"
          onKeyUp={(e) => {
            if (e.key === "Enter" && e.target.value) handleAdd();
          }}
          {...props}
          className="flex-1 w-4/5 bg-transparent border-none outline-none text-sm placeholder-gray-500"
        />
        <button
          className="p-1 w-1/5 flex justify-end text-blue-500 hover:bg-blue-50 rounded transition-colors"
          onClick={handleAdd}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default InputList;
