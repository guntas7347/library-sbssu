import { Route, Routes } from "react-router-dom";
import ManageStudentsPage from "../pages/manage-students/manage-students.page.admin";
import AddStudentPage from "../pages/manage-students/add-student/add-student.page.admin";
import SearchStudentsPage from "../pages/manage-students/search-students/search-student.page.admin";
import ApproveStudentPage from "../pages/manage-students/approve-student/approve-student.page.admin";
import AddStudentCardPage from "../pages/manage-students/student-cards/add-student-card.page.admin";

const ManageStudentsRoute = () => {
  return (
    <Routes>
      <Route index element={<ManageStudentsPage />} />
      <Route path="/add-student/" element={<AddStudentPage />} />{" "}
      <Route
        path="/add-student/add-student-card/"
        element={<AddStudentCardPage />}
      />
      <Route path="/search-students/" element={<SearchStudentsPage />} />
      <Route path="/approve-students/" element={<ApproveStudentPage />} />
    </Routes>
  );
};

export default ManageStudentsRoute;
