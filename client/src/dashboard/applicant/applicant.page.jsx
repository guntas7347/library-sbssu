import { useEffect, useState } from "react";
import ApplyStudentPage from "./apply-student.page.applicant";
import { fetchApplication } from "../http-requests";
import AppliedStatusPage from "./applied-status.page.applicant";
import ApplicationNavBar from "./applicant-header.component";

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
    <>
      <ApplicationNavBar />
      <div className="text-center">
        <div className="">
          {application ? (
            <AppliedStatusPage applicationDoc={application} />
          ) : (
            <ApplyStudentPage />
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicantHomePage;
