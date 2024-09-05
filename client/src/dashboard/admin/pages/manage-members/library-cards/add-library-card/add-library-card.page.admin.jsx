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

const AllotLibraryCardPage = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [showMemberTable, setShowMemberTable] = useState(false);

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    membershipId: "",
    cardNumber: "",
  });

  const { membershipId, cardNumber } = formFields;

  const handleFetchMember = async () => {
    await fetchStudentByRollNumber(Number(membershipId))
      .then(async (res) => {
        console.log(res);
        setRowData(
          rowsArray(
            [res],
            ["_id", "membershipId", "fullName", "program", "batch"]
          )
        );
        setShowMemberTable(true);
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
        Allot Library card to Member
      </h1>
      <div className="bg-white p-5 rounded-3xl">
        <div className="flex flex-row justify-around items-center">
          <InputField
            label="Membership Id"
            name="membershipId"
            type="number"
            value={membershipId}
            // disabled={showMemberTable}
            onChange={handleChange}
          />

          <button className="my-button" onClick={handleFetchMember}>
            Fetch Member
          </button>
        </div>

        {showMemberTable ? (
          <div>
            <div className="my-10">
              <CustomTable
                columns={["Membership Id", "Name", "Program", "Batch"]}
                rows={rowData}
              />
            </div>
            <div className="flex gap-5 items-center">
              <InputField
                label="Membership Id"
                type="number"
                name="membershipId"
                value={membershipId}
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

              <button
                onClick={() => setShowAlertDialog(true)}
                className="my-button ml-auto"
              >
                Submit
              </button>
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
