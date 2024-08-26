import InputSelect from "../input-select/input-select.component";
import InputField from "../input-field/input-field.component";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "../use-form-hook/use-form.hook.component";
import { createURLQuery } from "../../../utils/functions";

const SearchQueriesComponent = ({ selectFields }) => {
  const navigate = useNavigate();

  const { formFields, handleChange } = useForm({ filter: "", filterValue: "" });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formFields.filter !== "" || formFields.filterValue !== "") {
        const q = createURLQuery({
          filter: formFields.filter,
          filterValue: formFields.filterValue,
        });
        navigate(`?${q}`);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [formFields]);

  return (
    <>
      <div className="flex items-center gap-5">
        <InputSelect
          fields={selectFields}
          label="Search By"
          onChange={handleChange}
          value={formFields.filter}
          name="filter"
        />

        <InputField label="Value" name="filterValue" onChange={handleChange} />
      </div>
    </>
  );
};

export default SearchQueriesComponent;
