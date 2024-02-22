import LinkButton from "../../../../components/forms/link-button/link-button.component";

const IssueBooksPage = () => {
  const previousPath = "/dashboard/admin/issue-books";
  return (
    <div className="text-center">
      <h1 className="my-4">Issue Books</h1>
      <LinkButton
        to={`${previousPath}/issue-new-book`}
        label="Issue new Book"
      />
      <br />
      <br />
      <LinkButton
        to={`${previousPath}/return-issued-book`}
        label="Return Issued Book"
      />
      <br />
      <br />
      <LinkButton
        to={`${previousPath}/search-issued-books`}
        label="Search Issued Books"
      />
      <br />
      <br />
      <LinkButton
        to={`${previousPath}/search-returned-books`}
        label="Search Returned Books"
      />
    </div>
  );
};

export default IssueBooksPage;
