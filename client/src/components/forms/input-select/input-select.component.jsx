import { MenuItem, Select } from "@mui/material";

const InputSelect = ({ name, fields, value, onChange }) => {
  return (
    <div>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name={name}
        value={value}
        onChange={onChange}
        defaultValue={fields[0].value}
      >
        {fields.map((menuItem, index) => (
          <MenuItem key={index} value={menuItem.value}>
            {menuItem.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default InputSelect;
