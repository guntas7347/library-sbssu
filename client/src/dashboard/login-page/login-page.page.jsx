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
import { loginWithCredentials } from "../http-requests";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SnackbarFeedback from "../../components/feedback/snackbar/snackbar.component";
import SnackbarFeedbackCustom from "../../components/feedback/snackbar/snackbar-full.component";

const LoginPage = () => {
  const navigate = useNavigate();

  const { formFields, handleChange } = useForm({
    email: "",
    password: "",
  });

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginWithCredentials(formFields)
      .then((role) => {
        redirectOnRole(role);
      })
      .catch((err) =>
        setSnackbarFeedback({ open: true, severity: "error", message: err })
      );
  };

  const redirectOnRole = (role) => {
    switch (role) {
      case "ADMIN":
        navigate("/dashboard/admin");
        break;

      case "STUDENT":
        navigate("/dashboard/student");
        break;

      case "APPLICANT":
        navigate("/dashboard/applicant");
        break;

      default:
        break;
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
            Sign in
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={"/forgot-password"}>Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to={"/sign-up"}>{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
      <SnackbarFeedbackCustom
        showSnackbarFeedback={showSnackbarFeedback}
        setSnackbarFeedback={setSnackbarFeedback}
      />
    </div>
  );
};

export default LoginPage;
