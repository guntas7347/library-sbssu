import { Button, Grid } from "@mui/material";
import SnackbarFeedbackCustom from "../../../../components/feedback/snackbar/snackbar-full.component";
import InputField from "../../../../components/forms/input-field/input-field.component";
import DatabaseForm from "./database-form.component.admin";
import { useState } from "react";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import { restCall } from "../../hooks/http-requests.hooks.admin";

const DatabaseComponent = ({ colName, url, crs }) => {
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
    await restCall(`database/${url}`, formFields, crs)
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
      <h1>{colName}</h1>
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

export default DatabaseComponent;
