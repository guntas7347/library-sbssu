import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const InputSelect = (props) => {
  const { fields, onChange, label } = props;
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={onChange}
          defaultValue={fields[0].value}
          {...props}
        >
          {fields.map((menuItem, index) => (
            <MenuItem key={index} value={menuItem.value}>
              {menuItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default InputSelect;
