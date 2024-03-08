import { useContext, useState } from "react";
import { useForm } from "../../../../../../components/forms/use-form-hook/use-form.hook.component";
import {
  allotLibraryCardToStudent,
  fetchStudentByRollNumber,
} from "../../../../hooks/http-requests.hooks.admin";
import { rowsArray } from "../../../../../../utils/functions";
import InputField from "../../../../../../components/forms/input-field/input-field.component";
import AlertDialog from "../../../../../../components/feedback/dialog/alert-dialog.component";
import CustomTable from "../../../../../../components/table/custom-table.component";
import { SnackBarContext } from "../../../../../../components/context/snackbar.context";
import Button from "../../../../../../components/buttons/button.component";

import "./add-library-card.styles.scss";

const AllotLibraryCardPage = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [showStudentTable, setShowStudentTable] = useState(false);

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    rollNumber: "",
    cardNumber: "",
  });

  const { rollNumber, cardNumber } = formFields;

  const handleFetchStudent = async () => {
    await fetchStudentByRollNumber(rollNumber)
      .then(async (res) => {
        setRowData(
          rowsArray(
            [res],
            ["_id", "rollNumber", "fullName", "program", "batch"]
          )
        );
        setShowStudentTable(true);
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  const handleSubmit = async () => {
    await allotLibraryCardToStudent(formFields)
      .then((res) => {
        setFeedback([1, 1, res]);
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  return (
    <div className="">
      <h2 className="text-center page-header">Allot Library card to Student</h2>
      <div className="white-container">
        <div className="search-container-addLibraryCard">
          <InputField
            label="Student's Roll Number"
            name="rollNumber"
            type="number"
            value={rollNumber}
            disabled={showStudentTable}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            onClick={handleFetchStudent}
            label="Fetch Student"
          />
        </div>

        {showStudentTable ? (
          <div className="">
            <CustomTable
              columns={["Roll Number", "Name", "Program", "Batch"]}
              rows={rowData}
            />
            <div className="submit-container-addLibraryCard">
              <InputField
                label="Roll Number"
                type="number"
                name="rollNumber"
                value={rollNumber}
                disabled
                InputLabelProps={{ shrink: true }}
              />

              <InputField
                label="Card Number"
                type="text"
                name="cardNumber"
                value={cardNumber}
                onChange={handleChange}
              />

              <Button
                onClick={() => setShowAlertDialog(true)}
                variant="contained"
                label="Submit"
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        <AlertDialog
          open={showAlertDialog}
          handleClick={(e) => {
            if (e) handleSubmit();
            setShowAlertDialog(false);
          }}
        />
      </div>
    </div>
  );
};

export default AllotLibraryCardPage;
