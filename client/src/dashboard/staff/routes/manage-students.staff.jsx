import { Route, Routes } from "react-router-dom";
import ManageStudentsPage from "../pages/manage-students/manage-students.page.staff";
import AddStudentPage from "../pages/manage-students/add-student/add-student.page.staff";
import SearchStudentsPage from "../pages/manage-students/search-students/search-student.page.staff";
import ApproveStudentPage from "../pages/manage-students/approve-student/approve-student.page.staff";
import AllotLibraryCardPage from "../pages/manage-students/library-cards/add-library-card/add-library-card.page.staff";
import ViewStudentPage from "../pages/manage-students/view-student/view-student.page.staff";
import ViewApplicantPage from "../pages/manage-students/approve-student/view-applicant.page.staff";

const ManageStudentsRoute = () => {
  return (
    <Routes>
      <Route index element={<ManageStudentsPage />} />
      <Route path="/add-student/" element={<AddStudentPage />} />{" "}
      <Route
        path="/add-student/add-student-card/"
        element={<AllotLibraryCardPage />}
      />
      <Route path="/search-students/" element={<SearchStudentsPage />} />
      <Route path="/search-students/:_id" element={<ViewStudentPage />} />
      <Route path="/approve-students/" element={<ApproveStudentPage />} />
      <Route
        path="/approve-students/:applicationNumber"
        element={<ViewApplicantPage />}
      />
    </Routes>
  );
};

export default ManageStudentsRoute;
