import { Route, Routes } from "react-router-dom";
import ManageStudentsPage from "../pages/manage-students/manage-students.page.admin";
import AddStudentPage from "../pages/manage-students/add-student/add-student.page.admin";
import SearchStudentsPage from "../pages/manage-students/search-students/search-student.page.admin";
import ApproveStudentPage from "../pages/manage-students/approve-student/approve-student.page.admin";
import AddLibraryCardPage from "../pages/manage-students/library-cards/add-library-card/add-library-card.page.admin";
import ViewStudentPage from "../pages/manage-students/view-student/view-student.page.admin";
import ViewApplicantPage from "../pages/manage-students/approve-student/view-applicant.page.admin";

const ManageStudentsRoute = () => {
  return (
    <Routes>
      <Route index element={<ManageStudentsPage />} />
      <Route path="/add-student/" element={<AddStudentPage />} />{" "}
      <Route
        path="/add-student/add-student-card/"
        element={<AddLibraryCardPage />}
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
