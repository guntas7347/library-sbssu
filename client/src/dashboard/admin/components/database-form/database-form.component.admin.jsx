import InputField from "../../../../components/forms/input-field/input-field.component";
import { useState } from "react";

const DatabaseForm = ({ valueProps, onChange }) => {
  const [enableEdit, setEnableEdit] = useState(true);
  const handleClick = () => setEnableEdit(!enableEdit);

  return (
    <>
      <div className="grid grid-cols-10 my-5">
        <div className="col-span-8">
          <InputField
            inputclassname="w-96"
            disabled={enableEdit}
            name={valueProps.label}
            onChange={onChange}
            {...valueProps}
          />
        </div>
        <div className="flex flex-row justify-center items-center">
          <button className="my-button" onClick={handleClick}>
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default DatabaseForm;
