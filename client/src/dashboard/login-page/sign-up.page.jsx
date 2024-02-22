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
  initalizeSignUpWithCredentials,
} from "../http-requests";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SnackbarFeedbackCustom from "../../components/feedback/snackbar/snackbar-full.component";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [showOTPForm, setShowOTPForm] = useState(false);

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange, resetFormFields } = useForm({
    displayName: "",
    email: "",
    password: "",
    otp: "",
    _id: "",
  });

  const { displayName, email, password, otp } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!showOTPForm) {
      await initalizeSignUpWithCredentials(formFields)
        .then((res) => {
          handleChange({ target: { name: "_id", value: res.payload } });
          setSnackbarFeedback({
            open: true,
            severity: "success",
            message: res.message,
          });
          setShowOTPForm(true);
        })
        .catch((err) => setSnackbarFeedback([1, 2, err]));
    } else {
      await compleateSignUpWithCredentials({
        otp: +formFields.otp,
        _id: formFields._id,
      })
        .then((res) => {
          setSnackbarFeedback({
            open: true,
            severity: "success",
            message: res.message,
          });
          setShowOTPForm(false);
          resetFormFields();
        })
        .catch((err) => setSnackbarFeedback([1, 2, err]));
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <InputField
              margin="normal"
              label="Full Name"
              name="displayName"
              autoComplete="name"
              value={displayName}
              autoFocus
              onChange={handleChange}
              disabled={showOTPForm}
            />
            <InputField
              margin="normal"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              autoFocus
              onChange={handleChange}
              disabled={showOTPForm}
            />
            <InputField
              margin="normal"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChange}
              disabled={showOTPForm}
            />
            {showOTPForm && (
              <InputField
                margin="normal"
                name="otp"
                label="6 Digit One Time Password"
                type="number"
                value={otp}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 6);
                }}
              />
            )}
            {showOTPForm ? (
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
              </Button>
            ) : (
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send OTP
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
        <SnackbarFeedbackCustom
          feedback={showSnackbarFeedback}
          handleClose={setSnackbarFeedback}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
