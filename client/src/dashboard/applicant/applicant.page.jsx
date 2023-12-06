import { Button, Grid } from "@mui/material";
import InputField from "../../components/forms/input-field/input-field.component";
import InputSelect from "../../components/forms/input-select/input-select.component";
import AlertDialog from "../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedback from "../../components/feedback/snackbar/snackbar.component";
import { useEffect, useState } from "react";
import { fetchSettingsAcademicPrograms } from "../admin/hooks/http-requests.hooks.admin";
import { useForm } from "../../components/forms/use-form-hook/use-form.hook.component";
import ApplyStudentPage from "./apply-student.page.applicant";
import { fetchApplication } from "../http-requests";
import AppliedStatusPage from "./applied-status.page.applicant";

const ApplicantHomePage = () => {
  const [application, setApplication] = useState(false);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const application = await fetchApplication();
        setApplication(application);
      } catch (error) {
        console.error(error);
      }
    };

    if (application === false) {
      asyncFunc();
    }
  }, []);

  return (
    <div className="text-center m-5">
      <div className="">
        {application ? (
          <AppliedStatusPage applicationDoc={application} />
        ) : (
          <ApplyStudentPage />
        )}
      </div>
    </div>
  );
};

export default ApplicantHomePage;
