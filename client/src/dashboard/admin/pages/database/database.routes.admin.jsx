import LinkButton from "../../../../components/forms/link-button/link-button.component";

const DatabasePage = () => {
  const previousPath = "/dashboard/admin/database";
  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-5">Database</h1>
      <div className="grid grid-cols-3 gap-2 place-items-center">
        <LinkButton to={`${previousPath}/issued-books`} label="Issued Books" />
        <LinkButton
          to={`${previousPath}/returned-books`}
          label="Returned Books"
        />

        <LinkButton
          to={`${previousPath}/book-accessions`}
          label="Book Accessions"
        />
        <LinkButton to={`${previousPath}/books`} label="Books" />

        <LinkButton
          to={`${previousPath}/library-cards`}
          label="Library Cards"
        />
        <LinkButton to={`${previousPath}/students`} label="Students" />

        <LinkButton to={`${previousPath}/applications`} label="Applications" />
        <LinkButton to={`${previousPath}/staff`} label="Staff" />

        <LinkButton to={`${previousPath}/auth-admin`} label="Auth Admin" />
        <LinkButton to={`${previousPath}/auth-student`} label="Auth Student" />
        <LinkButton
          to={`${previousPath}/auth-applicant`}
          label="Auth Applicant"
        />
      </div>
    </div>
  );
};

export default DatabasePage;
