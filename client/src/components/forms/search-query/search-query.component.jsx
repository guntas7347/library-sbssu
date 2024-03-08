import { useEffect, useState } from "react";
import InputSelect from "../input-select/input-select.component";
import InputField from "../input-field/input-field.component";
import "./search-query.styles.scss";

const SearchQueriesComponent = ({
  className = "",
  selectFields,
  selectValue,
  selectName = "sortSelect",
  inputName = "sortValue",
  inputValue,
  onChange,
}) => {
  const [inputFieldType, setInputFieldType] = useState("text");
  const [inputLabel, setInputField] = useState("Field");

  useEffect(() => {
    var fieldValue = selectFields.find((field) => field.value === selectValue);
    if (!fieldValue) fieldValue = { inputField: "none", name: "none" };
    const { inputField = "none", name } = fieldValue;
    setInputField(name);
    setInputFieldType(inputField);
  });

  return (
    <div className={className}>
      <div className="container-search-query">
        <div>
          <InputSelect
            className="w-full"
            fields={selectFields}
            value={selectValue}
            onChange={onChange}
            name={selectName}
          />
        </div>
        <div
          className={`${
            inputFieldType === "none" && "hide-inputfield-search-query"
          }`}
        >
          <InputField
            className="w-full"
            label={inputLabel}
            name={inputName}
            value={inputValue}
            onChange={onChange}
            type={inputFieldType}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchQueriesComponent;
