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
  adminLoginWithCredentials,
  applicantLoginWithCredentials,
  signOut,
  studentLoginWithCredentials,
} from "../http-requests";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SnackbarFeedbackCustom from "../../components/feedback/snackbar/snackbar-full.component";
import InputSelect from "../../components/forms/input-select/input-select.component";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("ADMIN");

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

    switch (loginType) {
      case "ADMIN":
        await adminLoginWithCredentials(formFields)
          .then((res) => {
            if (res.payload === "ADMIN") navigate("/dashboard/admin");
            if (res.payload === "STAFF") navigate("/dashboard/staff");
          })
          .catch((err) => setSnackbarFeedback([1, 2, err]));
        break;

      case "STUDENT":
        await studentLoginWithCredentials(formFields)
          .then(() => {
            navigate("/dashboard/student");
          })
          .catch((err) => setSnackbarFeedback([1, 2, err]));
        break;

      case "APPLICANT":
        await applicantLoginWithCredentials(formFields)
          .then(() => {
            navigate("/dashboard/applicant");
          })
          .catch((err) => setSnackbarFeedback([1, 2, err]));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await signOut().catch((err) => console.log(err));
    };
    asyncFunc();
  }, []);

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
                <Link to={"/forgot-password"}>Forgot password</Link>
              </Grid>
              <Grid item>
                <Link to={"/sign-up"}>Create Account</Link>
              </Grid>
            </Grid>
            <Grid item>
              <InputSelect
                name="Login Type"
                fields={[
                  { name: "Student", value: "STUDENT" },
                  { name: "Admin", value: "ADMIN" },
                  { name: "Applicant", value: "APPLICANT" },
                ]}
                value={loginType}
                onChange={(e) => setLoginType(e.target.value)}
              />
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
      <SnackbarFeedbackCustom
        feedback={showSnackbarFeedback}
        handleClose={setSnackbarFeedback}
      />
    </div>
  );
};

export default LoginPage;
