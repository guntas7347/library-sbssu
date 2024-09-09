import DatabaseComponent from "../../components/database-form/database.component.admin";

export const BookAccessionsDatabasePage = () => {
  return (
    <>
      <DatabaseComponent
        colName="Book Accession Document"
        url="/get-book-accession"
        crs="DBSF200BA"
      />
    </>
  );
};

export const BooksDatabasePage = () => {
  return (
    <>
      <DatabaseComponent
        colName="Book Document"
        url="get-book"
        crs="DBSF200BKS"
      />
    </>
  );
};

export const LibraryCardsDatabasePage = () => {
  return (
    <>
      <DatabaseComponent
        colName="Library Card Document"
        url="get-library-card"
        crs="DBSF200LC"
      />
    </>
  );
};

export const StudentsDatabasePage = () => {
  return (
    <>
      <DatabaseComponent
        colName="Student Document"
        url="get-student"
        crs="DBSF200STU"
      />
    </>
  );
};

export const IssuedBooksDatabasePage = () => {
  return (
    <>
      <DatabaseComponent
        colName="Issued Book Document"
        url="get-issued-book"
        crs="DBSF200ISB"
      />
    </>
  );
};

export const ReturnedBooksDatabasePage = () => {
  return (
    <>
      <DatabaseComponent
        colName="Returned Book Document"
        url="get-returned-book"
        crs="DBSF200RSB"
      />
    </>
  );
};

export const StaffDatabasePage = () => {
  return (
    <>
      <DatabaseComponent
        colName="Staff Document"
        url="get-staff"
        crs="DBSF200STF"
      />
    </>
  );
};

export const ApplicationDatabasePage = () => {
  return (
    <>
      <DatabaseComponent
        colName="Application Document"
        url="get-application"
        crs="DBSF200APP"
      />
    </>
  );
};

export const AuthAdminDatabasePage = () => {
  return (
    <>
      <DatabaseComponent
        colName="Auth Admin Document"
        url="get-auth-admin"
        crs="DBSF200AUAD"
      />
    </>
  );
};

export const AuthStudentDatabasePage = () => {
  return (
    <>
      <DatabaseComponent
        colName="Auth Student Document"
        url="get-auth-student"
        crs="DBSF200AUST"
      />
    </>
  );
};
export const AuthApplicantDatabasePage = () => {
  return (
    <>
      <DatabaseComponent
        colName="Auth Applicant Document"
        url="get-auth-applicant"
        crs="DBSF200AUAP"
      />
    </>
  );
};
