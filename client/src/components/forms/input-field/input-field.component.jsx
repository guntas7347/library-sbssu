import { TextField } from "@mui/material";

const InputField = (props) => {
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      required
      {...props}

      // value={props.value}
    />
  );
};

export default InputField;
