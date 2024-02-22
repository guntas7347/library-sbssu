import { Button, Grid } from "@mui/material";
import InputField from "../../../../components/forms/input-field/input-field.component";
import { useState } from "react";

const DatabaseForm = ({ keyProps, valueProps, onChange }) => {
  const [enableEdit, setEnableEdit] = useState(true);
  const handleClick = () => setEnableEdit(!enableEdit);

  return (
    <>
      <Grid item xs={3}>
        <InputField disabled {...keyProps} />
      </Grid>
      <Grid item xs={8}>
        <InputField
          disabled={enableEdit}
          name={valueProps.label}
          onChange={onChange}
          {...valueProps}
        />
      </Grid>
      <Grid item xs={1}>
        <Button onClick={handleClick}>Edit</Button>
      </Grid>
    </>
  );
};

export default DatabaseForm;
