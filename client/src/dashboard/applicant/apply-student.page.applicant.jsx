import { Button, Grid } from "@mui/material";
import InputField from "../../components/forms/input-field/input-field.component";
import InputSelect from "../../components/forms/input-select/input-select.component";
import AlertDialog from "../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedback from "../../components/feedback/snackbar/snackbar.component";
import { useEffect, useState } from "react";
import { fetchSettingsAcademicPrograms } from "../admin/hooks/http-requests.hooks.admin";
import { useForm } from "../../components/forms/use-form-hook/use-form.hook.component";
import { createApplication } from "../http-requests";
import SnackbarFeedbackCustom from "../../components/feedback/snackbar/snackbar-full.component";

const ApplyStudentPage = () => {
  const [academicPrograms, setAcademicPrograms] = useState([
    { name: "", value: "" },
  ]);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    severity: "info",
    message: "",
    open: false,
  });

  const defaultFormFields = {
    rollNumber: "",
    fullName: "",
    fathersName: "",
    gender: "",
    category: "",
    dob: "",
    program: "",
    specialization: "",
    batch: "",
    email: "",
    phoneNumber: "",
  };

  const { formFields, handleChange, resetFormFields } =
    useForm(defaultFormFields);

  const {
    rollNumber,
    fullName,
    fathersName,
    gender,
    dob,
    category,
    program,
    specialization,
    batch,
    email,
    phoneNumber,
  } = formFields;

  const handleSubmit = async () => {
    await createApplication(formFields)
      .then((res) => {
        setSnackbarFeedback({
          open: true,
          severity: "success",
          message: res.message,
        });
        resetFormFields();
        window.location.reload();
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
  };

  useEffect(() => {
    const asyncFunc = async () => {
      const academicPrograms = await fetchSettingsAcademicPrograms();
      setAcademicPrograms(academicPrograms);
    };

    asyncFunc();
  }, []);

  const generateBatchYears = () => {
    const array = [];
    for (
      let i = new Date().getFullYear();
      i >= new Date().getFullYear() - 6;
      i--
    ) {
      array.push({ name: i.toString(), value: i });
    }

    return array;
  };

  const generateSpecialization = (program) => {
    switch (program) {
      case "BTECH": {
        const bTechBranches = [
          { name: "Computer Science and Engineering", value: "CSE" },
          { name: "Electrical Engineering", value: "EE" },
          { name: "Mechanical Engineering", value: "ME" },
          { name: "Civil Engineering", value: "CE" },
          { name: "Electronics and Communication Engineering", value: "ECE" },
          { name: "Information Technology", value: "IT" },
          { name: "Chemical Engineering", value: "ChemE" },
        ];
        return bTechBranches;
      }

      case "BCA": {
        const bcaBranches = [
          {
            value: "CS",
            name: "Computer Science",
          },
          {
            value: "IT",
            name: "Information Technology",
          },
          {
            value: "SE",
            name: "Software Engineering",
          },
          {
            value: "DBMS",
            name: "Database Management System",
          },
          {
            value: "NW",
            name: "Networking",
          },
        ];
        return bcaBranches;
      }

      case "BSC": {
        const bscBranches = [
          {
            value: "Math",
            name: "Mathematics",
          },
          {
            value: "Physics",
            name: "Physics",
          },
          {
            value: "Chem",
            name: "Chemistry",
          },
          {
            value: "Bio",
            name: "Biology",
          },
          {
            value: "CompSci",
            name: "Computer Science",
          },
        ];

        return bscBranches;
      }

      case "BBA": {
        const bbaBranches = [
          {
            value: "Mkt",
            name: "Marketing",
          },
          {
            value: "Fin",
            name: "Finance",
          },
          {
            value: "HR",
            name: "Human Resources",
          },
          {
            value: "Ops",
            name: "Operations",
          },
          {
            value: "Mgmt",
            name: "Management",
          },
        ];
        return bbaBranches;
      }

      default:
        return [{}];
    }
  };

  const maxDobDate = () => {
    return new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 365 * 16)
      .toISOString()
      .split("T")[0];
  };

  return (
    <div>
      <h2 className="my-4">Apply as Student</h2>
      <div className="mx-4 mx-md-4 mx-lg-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowAlertDialog(true);
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <InputField
                label="Roll Number"
                type="number"
                name="rollNumber"
                value={rollNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <InputSelect
                label="Batch"
                name="batch"
                fields={generateBatchYears()}
                value={batch}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <InputField
                label="Name"
                type="text"
                name="fullName"
                value={fullName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <InputField
                label="Father's Name"
                type="text"
                name="fathersName"
                value={fathersName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <InputField
                label="Date of Birth"
                type="date"
                name="dob"
                value={dob}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  max: maxDobDate(),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <InputSelect
                label="Gender"
                name="gender"
                fields={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" },
                ]}
                value={gender}
                onChange={handleChange}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={3} md={3}>
              <InputSelect
                label="Category"
                name="category"
                fields={[
                  { name: "General", value: "general" },
                  { name: "SC/ST", value: "SCST" },
                  { name: "Other", value: "other" },
                ]}
                value={category}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <InputSelect
                label="Program"
                name="program"
                fields={academicPrograms}
                value={program}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <InputSelect
                label="Specialization"
                name="specialization"
                fields={generateSpecialization(program)}
                value={specialization}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <InputField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <InputField
                label="Phone Number"
                type="number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
              />
            </Grid>
          </Grid>
          <br />
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Button fullWidth type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
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
        <SnackbarFeedbackCustom
          feedback={showSnackbarFeedback}
          handleClose={setSnackbarFeedback}
        />
      </div>
    </div>
  );
};

export default ApplyStudentPage;
