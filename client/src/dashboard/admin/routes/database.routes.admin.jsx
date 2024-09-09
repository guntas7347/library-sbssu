import { Route, Routes } from "react-router-dom";
import DatabasePage from "../pages/database/database.routes.admin";
import {
  ApplicationDatabasePage,
  AuthAdminDatabasePage,
  AuthApplicantDatabasePage,
  AuthStudentDatabasePage,
  BookAccessionsDatabasePage,
  BooksDatabasePage,
  IssuedBooksDatabasePage,
  LibraryCardsDatabasePage,
  ReturnedBooksDatabasePage,
  StaffDatabasePage,
  StudentsDatabasePage,
} from "../pages/database/database.pages.admin";

const DatabaseRoutes = () => {
  return (
    <Routes>
      <Route index element={<DatabasePage />} />
      <Route path="/issued-books" element={<IssuedBooksDatabasePage />} />
      <Route path="/returned-books" element={<ReturnedBooksDatabasePage />} />
      <Route path="/book-accessions" element={<BookAccessionsDatabasePage />} />
      <Route path="/library-cards" element={<LibraryCardsDatabasePage />} />
      <Route path="/books" element={<BooksDatabasePage />} />
      <Route path="/students" element={<StudentsDatabasePage />} />
      <Route path="/staff" element={<StaffDatabasePage />} />
      <Route path="/applications" element={<ApplicationDatabasePage />} />
      <Route path="/auth-admin" element={<AuthAdminDatabasePage />} />
      <Route path="/auth-student" element={<AuthStudentDatabasePage />} />
      <Route path="/auth-applicant" element={<AuthApplicantDatabasePage />} />
    </Routes>
  );
};

export default DatabaseRoutes;
