import { useContext, useState } from "react";
import { useForm } from "../../../../../../components/forms/use-form-hook/use-form.hook.component";
import {
  allotLibraryCardToStudent,
  fetchStudentByRollNumber,
} from "../../../../hooks/http-requests.hooks.staff";
import { rowsArray } from "../../../../../../utils/functions";
import InputField from "../../../../../../components/forms/input-field/input-field.component";
import AlertDialog from "../../../../../../components/feedback/dialog/alert-dialog.component";
import CustomTable from "../../../../../../components/table/custom-table.component";
import { SnackBarContext } from "../../../../../../components/context/snackbar.context";

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
    <div>
      <h1 className="text-center font-bold text-3xl my-2">
        Allot Library card to Student
      </h1>
      <div className="bg-white p-5 rounded-3xl">
        <div className="flex flex-row justify-around items-center">
          <InputField
            label="Student's Roll Number"
            name="rollNumber"
            type="number"
            value={rollNumber}
            disabled={showStudentTable}
            onChange={handleChange}
          />

          <button className="my-button" onClick={handleFetchStudent}>
            Fetch Student
          </button>
        </div>

        {showStudentTable ? (
          <div>
            <div className="my-10">
              <CustomTable
                columns={["Roll Number", "Name", "Program", "Batch"]}
                rows={rowData}
              />
            </div>
            <div className="grid grid-cols-3 gap-5 items-center">
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
              <div className="flex flex-row justify-center">
                <button
                  onClick={() => setShowAlertDialog(true)}
                  className="my-button"
                >
                  Submit
                </button>
              </div>
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
