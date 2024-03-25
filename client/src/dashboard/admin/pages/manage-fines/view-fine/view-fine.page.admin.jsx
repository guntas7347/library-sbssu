import { useEffect, useState } from "react";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import {
  addRecieptNumber,
  fetchFineById,
} from "../../../hooks/http-requests.hooks.admin";
import { useParams } from "react-router-dom";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";

const ViewFinePage = () => {
  const { _id } = useParams();

  const [fineData, setFineData] = useState({
    fullName: "",
    rollNumber: "",
    amount: "",
    category: "",
    createdAt: "",
    recieptNumber: "",
  });

  const [showRecieptDialoge, setShowRecieptDialoge] = useState(false);

  const { formFields, handleChange } = useForm({
    recieptNumber: "",
  });

  const { recieptNumber } = formFields;

  const fetchData = async () => {
    fetchFineById(_id)
      .then((res) => setFineData(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showEditbutton = () => {
    if (fineData.recieptNumber === "NULL") return true;
    return false;
  };

  const { fullName, rollNumber, amount, category, createdAt } = fineData;

  const handleAddRecieptNumber = async () => {
    await addRecieptNumber({ _id, ...formFields });
    setShowRecieptDialoge(false);
    fetchData();
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">Fine Details</h1>

      <SpanningTable
        rows={[
          ["Student Name", fullName],
          ["Roll Number", rollNumber],
          ["Fine Date", createdAt],
          ["Reciept Number", fineData.recieptNumber],
          ["Amount", amount],
          ["Category", category],
        ]}
      />

      <div>
        {showEditbutton() && (
          <div className="mt-2 flex flex-row justify-center">
            <button
              className="my-button"
              onClick={() => setShowRecieptDialoge(true)}
            >
              Add Reciept
            </button>
          </div>
        )}
      </div>
      <AlertDialog
        open={showRecieptDialoge}
        content={
          <div className="m-3 text-center">
            <h4 className="m-3">Add Reciept Number</h4>
            <InputField
              label="Reciept Number"
              type="number"
              name="recieptNumber"
              value={recieptNumber}
              onChange={handleChange}
              fullWidth={false}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
            />
          </div>
        }
        agreeMessage="Add"
        disagreeMessage="Back"
        handleClick={(e) =>
          e ? handleAddRecieptNumber() : setShowRecieptDialoge(false)
        }
      />
    </div>
  );
};

export default ViewFinePage;
