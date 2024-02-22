import { useEffect, useState } from "react";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import {
  addRecieptNumber,
  fetchFineById,
} from "../../../hooks/http-requests.hooks.admin";
import { useParams } from "react-router-dom";
import { Button, Dialog } from "@mui/material";
import FormDialog from "../../../../../components/modals/form-dialoge.component";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";

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

  const showEditButton = () => {
    if (fineData.recieptNumber === "NULL") return true;
    return false;
  };

  const { fullName, rollNumber, amount, category, createdAt } = fineData;

  const handleAddRecieptNumber = async () => {
    console.log(formFields);
    await addRecieptNumber({ _id, ...formFields });
    setShowRecieptDialoge(false);
    fetchData();
  };

  return (
    <div className="text-center m-5">
      <div className="mb-4">
        <h1>Fine Details</h1>
      </div>
      <div>
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
      </div>
      <div>
        {showEditButton() && (
          <div>
            <Button onClick={() => setShowRecieptDialoge(true)}>
              Add Reciept
            </Button>
            <Dialog open={showRecieptDialoge}>
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
                <div className="d-flex">
                  <Button onClick={() => setShowRecieptDialoge(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddRecieptNumber}>Submit</Button>
                </div>
              </div>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewFinePage;
