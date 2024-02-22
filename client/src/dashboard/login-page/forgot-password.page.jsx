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
  resetPasswordAdmin,
  resetPasswordAdminSendOtp,
  resetPasswordAdminVerifyOtp,
} from "../http-requests";
import { Link } from "react-router-dom";
import { useState } from "react";
import SnackbarFeedbackCustom from "../../components/feedback/snackbar/snackbar-full.component";

const ForgotPassword = () => {
  const [showSnackbarFeedback, setSnackbarFeedback] = useState();

  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const { formFields, handleChange } = useForm({
    email: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
    id: "",
  });

  const handleSendOtp = async () => {
    await resetPasswordAdminSendOtp(formFields.email)
      .then(({ message }) => {
        setSnackbarFeedback([1, 1, message]);
        setShowOtpField(true);
      })
      .catch((err) => {
        setSnackbarFeedback([1, 2, err]);
      });
  };

  const handleVerifyOtp = async () => {
    await resetPasswordAdminVerifyOtp({
      email: formFields.email,
      otp: formFields.otp,
    })
      .then((res) => {
        console.log(res);
        setSnackbarFeedback([1, 1, res.message]);
        setShowPasswordField(true);
      })
      .catch((err) => {
        setSnackbarFeedback([1, 2, err]);
      });
  };

  const handleUpdatePassword = async () => {
    if (formFields.newPassword !== formFields.confirmNewPassword) {
      setSnackbarFeedback([1, 2, "Passwords must match"]);
      return;
    }

    await resetPasswordAdmin({
      email: formFields.email,
      otp: formFields.otp,
      newPassword: formFields.newPassword,
    })
      .then((res) => {
        setSnackbarFeedback([1, 1, res.message]);
      })
      .catch((err) => {
        setSnackbarFeedback([1, 2, err]);
      });
  };

  const DynamicButton = () => {
    if (showOtpField) {
      if (showPasswordField) {
        return (
          <Button
            onClick={handleUpdatePassword}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Password
          </Button>
        );
      }
      return (
        <Button
          onClick={handleVerifyOtp}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Verify OTP
        </Button>
      );
    }

    return (
      <Button onClick={handleSendOtp} variant="contained" sx={{ mt: 3, mb: 2 }}>
        Send OTP
      </Button>
    );
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
            Reset your password
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <InputField
              margin="normal"
              label="Email Address"
              name="email"
              type="email"
              disabled={showOtpField}
              onChange={handleChange}
            />

            {showOtpField && (
              <>
                <InputField
                  margin="normal"
                  name="otp"
                  label="OTP"
                  type="password"
                  disabled={showPasswordField}
                  onChange={handleChange}
                />
                {showPasswordField && (
                  <>
                    <InputField
                      margin="normal"
                      name="newPassword"
                      label="New Password"
                      type="password"
                      onChange={handleChange}
                    />
                    <InputField
                      margin="normal"
                      name="confirmNewPassword"
                      label="Confirm New Password"
                      type="password"
                      onChange={handleChange}
                    />
                  </>
                )}
              </>
            )}

            <DynamicButton />

            <Grid container>
              <Grid item>
                <Link to={"/"}>{"Already have an accession? Login In"}</Link>
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

export default ForgotPassword;
