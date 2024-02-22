import { useEffect, useState } from "react";
import ApplyStudentPage from "./apply-student.page.applicant";
import { fetchApplication } from "../http-requests";
import AppliedStatusPage from "./applied-status.page.applicant";

const ApplicantHomePage = () => {
  const [application, setApplication] = useState(false);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const { payload } = await fetchApplication();
        setApplication(payload);
      } catch (error) {
        console.error(error);
      }
    };

    if (application === false) {
      asyncFunc();
    }
  }, []);

  return (
    <div className="text-center">
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
