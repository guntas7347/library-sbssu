import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useContext, useEffect, useState } from "react";
import {
  editStaff,
  fetchStaffById,
} from "../../../hooks/http-requests.hooks.admin";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";
import { useParams } from "react-router-dom";

const EditStaffPage = () => {
  const { _id } = useParams();

  const { setFeedback } = useContext(SnackBarContext);

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const { formFields, handleChange, setFormFields } = useForm({
    fullName: "",
  });
  const { idNumber, fullName, email, level } = formFields;

  const handleSubmit = async () => {
    await editStaff(_id, formFields)
      .then((res) => {
        setFeedback([1, 1, res]);
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchStaffById(_id)
        .then((res) => setFormFields(res))
        .catch((err) => {
          setFeedback([1, 2, err]);
        });
    };
    asyncFunc();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold my-5 text-center">Edit Staff Member</h1>
      <div className="bg-white p-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowAlertDialog(true);
          }}
        >
          <div className="grid grid-cols-2 gap-10 my-5">
            <InputField
              label="ID Number"
              type="number"
              name="idNumber"
              value={idNumber}
              onChange={handleChange}
            />

            <InputField
              label="Full Name"
              type="text"
              name="fullName"
              value={fullName}
              onChange={handleChange}
            />

            <InputField
              label="Email"
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
            />

            <InputSelect
              name="level"
              label="Level"
              fields={[
                { name: "1 (Issue-Return)", value: 1 },
                { name: "2 (Searches)", value: 2 },
                { name: "3 (Approve)", value: 3 },
                { name: "4 (Edit)", value: 4 },
                { name: "5 (Excel)", value: 5 },
                { name: "6 (Admin)", value: 6 },
              ]}
              value={level}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div>
        <AlertDialog
          title="Confirm?"
          content="This action can not be undone"
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

export default EditStaffPage;
