import { Grid } from "@mui/material";
import InputSelect from "../input-select/input-select.component";
import InputField from "../input-field/input-field.component";
import { useEffect, useState } from "react";

const SearchQueriesComponent = ({
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
    const { inputField = "none", name } = selectFields.find(
      (field) => field.value === selectValue
    );
    setInputField(name);
    setInputFieldType(inputField);
  });

  const conditionallyRenderInputField = () => {
    switch (inputFieldType) {
      case "none":
        break;

      default:
        return (
          <Grid item xs={12} sm={3} md={3}>
            <InputField
              fullWidth
              label={inputLabel}
              name={inputName}
              value={inputValue}
              onChange={onChange}
              type={inputFieldType}
              InputLabelProps={
                inputFieldType === "date" ? { shrink: true } : {}
              }
            />
          </Grid>
        );
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3} md={3}>
        <InputSelect
          fullWidth
          fields={selectFields}
          value={selectValue}
          onChange={onChange}
          name={selectName}
        />
      </Grid>
      {conditionallyRenderInputField()}
    </Grid>
  );
};

export default SearchQueriesComponent;
