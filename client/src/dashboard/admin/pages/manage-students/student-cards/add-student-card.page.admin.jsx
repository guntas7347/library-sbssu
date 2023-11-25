import { useState } from "react";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import {
  createStudentCard,
  fetchStudentByRollNumber,
} from "../../../hooks/http-requests.hooks.admin";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import { Button, Grid } from "@mui/material";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import CustomTableSelect from "../../../../../components/table/custom-table-select.component";

const AddStudentCardPage = () => {
  const [showStudentTable, setShowStudentTable] = useState(false);

  const [showCardNumberField, setShowAccountNumberField] = useState(false);

  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    rollNumber: "",
    cardNumber: "",
  });
  const { rollNumber } = formFields;

  const handleFetchStudent = async () => {
    await fetchStudentByRollNumber(formFields).then(async (res) =>
      setRowData(rowsArray([res]))
    );
    setShowStudentTable(true);
  };

  const handleSelect = (selectedValue) => {
    if (selectedValue !== null) {
      setShowAccountNumberField(selectedValue);
    } else {
      setShowAccountNumberField(false);
    }
  };

  const handleSubmit = async () => {
    await createStudentCard(formFields)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, ["rollNumber", "name", "program", "batch"])
      );
    });
  };

  return (
    <div>
      <br />
      <br />
      <div className="m-5">
        <Grid container spacing={4}>
          <Grid item>
            <InputField
              label="Student's Roll Number"
              name="rollNumber"
              type="number"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleFetchStudent}>
              Fetch Student
            </Button>
          </Grid>
        </Grid>
        {showStudentTable ? (
          <CustomTableSelect
            columns={["Roll Number", "Name", "Program", "Batch"]}
            rows={rowData}
            onSelect={handleSelect}
          />
        ) : (
          ""
        )}
        <br />

        {showCardNumberField ? (
          <div>
            <Grid container spacing={2}>
              <Grid item>
                <InputField
                  label="Roll Number"
                  type="text"
                  name="rollNumber"
                  value={rollNumber}
                  disabled
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item>
                <InputField
                  label="Card Number"
                  type="text"
                  name="cardNumber"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <Button onClick={handleSubmit} variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddStudentCardPage;
