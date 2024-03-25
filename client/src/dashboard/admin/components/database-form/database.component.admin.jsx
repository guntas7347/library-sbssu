import SnackbarFeedbackCustom from "../../../../components/feedback/snackbar/snackbar-full.component";
import InputField from "../../../../components/forms/input-field/input-field.component";
import DatabaseForm from "./database-form.component.admin";
import { useContext, useState } from "react";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import { restCall } from "../../hooks/http-requests.hooks.admin";
import { SnackBarContext } from "../../../../components/context/snackbar.context";

const DatabaseComponent = ({ colName, url, crs }) => {
  const { setFeedback } = useContext(SnackBarContext);

  const { formFields, handleChange } = useForm({
    _id: "65b8824b6d22519e8b630129",
  });

  const [issuedBookDoc, setIssuedBookDoc] = useState({});

  const handleFetch = async () => {
    await restCall(`database/${url}`, formFields, crs)
      .then((res) => {
        setIssuedBookDoc(res);
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  const createDocArray = (issuedBookDoc = {}) => {
    const array = [];
    for (const [key, value] of Object.entries(issuedBookDoc)) {
      array.push({
        label: key,
        value,
      });
    }
    return array;
  };
  const disableSearchField = () => {
    const length = createDocArray(issuedBookDoc).length;
    if (length === 0) return false;
    else return true;
  };
  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">{colName}</h1>
      <div>
        <div className="bg-white rounded-3xl p-5 grid grid-cols-2 gap-5">
          <div className="">
            <InputField
              inputclassname="w-full"
              name="_id"
              label="_id"
              value={formFields._id}
              disabled={disableSearchField()}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <button
              className="my-button"
              disabled={disableSearchField()}
              onClick={handleFetch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl mt-5">
          {createDocArray(issuedBookDoc).map((element, index) => {
            const { label, value } = element;
            return (
              <DatabaseForm
                key={index}
                keyProps={{ label }}
                valueProps={{ label, value }}
                onChange={handleChange}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DatabaseComponent;
