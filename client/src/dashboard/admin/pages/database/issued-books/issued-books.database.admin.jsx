import { Button, Grid } from "@mui/material";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import DatabaseForm from "../../../components/database-form/database-form.component.admin";
import { db_fetchIssuedBookDoc } from "../../../hooks/http-requests.hooks.admin";
import { useState } from "react";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";

const IssuedBooksDatabasePage = () => {
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const { formFields, handleChange } = useForm({
    _id: "65b8824b6d22519e8b630129",
  });

  const [issuedBookDoc, setIssuedBookDoc] = useState({});

  const handleFetch = async () => {
    await db_fetchIssuedBookDoc(formFields._id)
      .then((res) => {
        setIssuedBookDoc(res);
      })
      .catch((err) =>
        setSnackbarFeedback({ open: true, message: err, severity: "error" })
      );
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
    <div className="m-5 text-center">
      <h1>Issued Book Document</h1>
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

export default IssuedBooksDatabasePage;
