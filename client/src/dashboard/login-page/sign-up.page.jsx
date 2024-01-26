import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import InputField from "../../components/forms/input-field/input-field.component";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "../../components/forms/use-form-hook/use-form.hook.component";
import {
  compleateSignUpWithCredentials,
  createAdminAuth,
  initalizeSignUpWithCredentials,
} from "../http-requests";
import { Link, useNavigate } from "react-router-dom";
import SnackbarFeedback from "../../components/feedback/snackbar/snackbar.component";
import { useState } from "react";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [showOTPForm, setShowOTPForm] = useState(false);

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange, setFormFields } = useForm({
    displayName: "",
    email: "",
    password: "",
    otp: "",
    _id: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (showOTPForm) {
      await compleateSignUpWithCredentials({
        otp: +formFields.otp,
        _id: formFields._id,
      })
        .then((res) => {
          setSnackbarFeedback({
            open: true,
            severity: "success",
            message: res,
          });
        })
        .catch((err) =>
          setSnackbarFeedback({ open: true, severity: "error", message: err })
        );
    } else {
      await initalizeSignUpWithCredentials(formFields)
        .then((res) => {
          const { status, payload } = res;
          setFormFields({ ...formFields, _id: payload });
          setSnackbarFeedback({
            open: true,
            severity: "success",
            message: status,
          });
          setShowOTPForm(true);
        })
        .catch((err) =>
          setSnackbarFeedback({ open: true, severity: "error", message: err })
        );
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create New Account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <InputField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              name="displayName"
              autoComplete="name"
              autoFocus
              onChange={handleChange}
              disabled={showOTPForm}
            />
            <InputField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              disabled={showOTPForm}
            />
            <InputField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
              disabled={showOTPForm}
            />
            {showOTPForm ? (
              <InputField
                margin="normal"
                required
                fullWidth
                name="otp"
                label="6 Digit One Time Password"
                type="number"
                onChange={handleChange}
              />
            ) : (
              ""
            )}
            {showOTPForm ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Accession
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Next
              </Button>
            )}

            <Grid container>
              <Grid item>
                <Link to={"/"}>{"Already have an account? Login In"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
      <div>
        <SnackbarFeedback
          open={showSnackbarFeedback.open}
          message={showSnackbarFeedback.message}
          severity={showSnackbarFeedback.severity}
          handleClose={() => {
            setSnackbarFeedback({ open: false, severity: "", message: "" });
            if (
              showSnackbarFeedback.message === "Account Created Successfully"
            ) {
              navigate("/");
            }
          }}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
