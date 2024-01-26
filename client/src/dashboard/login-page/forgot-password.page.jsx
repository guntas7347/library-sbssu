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
import { forgotPassword, signUpWithCredentials } from "../http-requests";
import { Link, useNavigate } from "react-router-dom";
import SnackbarFeedback from "../../components/feedback/snackbar/snackbar.component";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await forgotPassword(formFields)
      .then((res) => {
        setSnackbarFeedback({ open: true, severity: "success", message: res });
      })
      .catch((err) =>
        setSnackbarFeedback({ open: true, severity: "error", message: err })
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
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
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
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Continue
            </Button>
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
        <SnackbarFeedback
          open={showSnackbarFeedback.open}
          message={showSnackbarFeedback.message}
          severity={showSnackbarFeedback.severity}
          handleClose={() => {
            setSnackbarFeedback({ open: false, severity: "", message: "" });
            // navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
