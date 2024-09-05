import { Route, Routes } from "react-router-dom";
import ManageStudentsPage from "../pages/manage-members/manage-members.page.admin";
import AddStudentPage from "../pages/manage-members/add-member/add-member.page.admin";
import SearchStudentsPage from "../pages/manage-members/search-members/search-members.page.admin";
import ApproveStudentPage from "../pages/manage-members/approve-member/approve-member.page.admin";
import AllotLibraryCardPage from "../pages/manage-members/library-cards/add-library-card/add-library-card.page.admin";
import ViewStudentPage from "../pages/manage-members/view-member/view-member.page.admin";
import ViewApplicantPage from "../pages/manage-members/approve-member/view-applicant.page.admin";
import EditStudentPage from "../pages/manage-members/edit-member/edit-member.page.admin";

const ManageStudentsRoute = () => {
  return (
    <Routes>
      <Route index element={<ManageStudentsPage />} />
      <Route path="/add-member/" element={<AddStudentPage />} />{" "}
      <Route
        path="/add-member/add-member-card/"
        element={<AllotLibraryCardPage />}
      />
      <Route path="/search-members/" element={<SearchStudentsPage />} />
      <Route path="/search-members/:_id" element={<ViewStudentPage />} />
      <Route path="/approve-members/" element={<ApproveStudentPage />} />
      <Route path="/approve-members/:_id" element={<ViewApplicantPage />} />
      <Route
        path="/search-members/:_id/edit-member/"
        element={<EditStudentPage />}
      />
    </Routes>
  );
};

export default ManageStudentsRoute;
