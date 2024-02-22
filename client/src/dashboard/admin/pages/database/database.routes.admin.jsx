import LinkButton from "../../../../components/forms/link-button/link-button.component";

const DatabasePage = () => {
  const previousPath = "/dashboard/admin/database";
  return (
    <div className="text-center">
      <h1 className="my-4">DATABASE</h1>
      <LinkButton to={`${previousPath}/issued-books`} label="Issued Books" />

      <LinkButton
        to={`${previousPath}/returned-books`}
        label="Returned Books"
      />
      <br />
      <LinkButton
        to={`${previousPath}/book-accessions`}
        label="Book Accessions"
      />
      <LinkButton to={`${previousPath}/books`} label="Books" />
      <br />
      <LinkButton to={`${previousPath}/library-cards`} label="Library Cards" />
      <LinkButton to={`${previousPath}/students`} label="Students" />
      <br />
      <LinkButton to={`${previousPath}/applications`} label="Applications" />
      <LinkButton to={`${previousPath}/staff`} label="Staff" />
      <br />
      <LinkButton to={`${previousPath}/auth-admin`} label="Auth Admin" />
      <LinkButton to={`${previousPath}/auth-student`} label="Auth Student" />
      <LinkButton
        to={`${previousPath}/auth-applicant`}
        label="Auth Applicant"
      />
    </div>
  );
};

export default DatabasePage;
