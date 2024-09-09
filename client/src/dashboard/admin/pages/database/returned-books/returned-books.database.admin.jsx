import { Button, Grid } from "@mui/material";
import DatabaseForm from "../../../components/database-form/database-form.component.admin";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useState } from "react";
import { restCall } from "../../../hooks/http-requests.hooks.admin";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";

const ReturnedBooksDatabasePage = () => {
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange } = useForm({
    _id: "65b8824b6d22519e8b630129",
  });

  const [returnedBookDoc, setReturnedBookDoc] = useState({});

  const handleFetch = async () => {
    await restCall("database/get-returned-book", formFields, "DBSF200RSB")
      .then((res) => {
        setReturnedBookDoc(res);
      })
      .catch((err) =>
        setSnackbarFeedback({ open: true, message: err, severity: "error" })
      );
  };

  const createDocArray = (returnedBookDoc = {}) => {
    const array = [];
    for (const [key, value] of Object.entries(returnedBookDoc)) {
      array.push({
        label: key,
        value,
      });
    }
    return array;
  };
  const disableSearchField = () => {
    const length = createDocArray(returnedBookDoc).length;
    if (length === 0) return false;
    else return true;
  };

  return (
    <div className="m-5 text-center">
      <h1>Returned Book Document</h1>
      <div>
        <div className="my-5">
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <InputField
                name="_id"
                label="_id"
                value={formFields._id}
                disabled={disableSearchField()}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Button disabled={disableSearchField()} onClick={handleFetch}>
                Search
              </Button>
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={2}>
          {createDocArray(returnedBookDoc).map((element, index) => {
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
        </Grid>
      </div>
      <div>
        <SnackbarFeedbackCustom
          feedback={showSnackbarFeedback}
          handleClose={setSnackbarFeedback}
        />
      </div>
    </div>
  );
};

// export default ReturnedBooksDatabasePage;
