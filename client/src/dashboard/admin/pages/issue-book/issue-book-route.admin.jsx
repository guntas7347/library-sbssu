import LinkButton from "../../../../components/forms/link-button/link-button.component";

const IssueBooksPage = () => {
  const previousPath = "/dashboard/admin/issue-books";
  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-5">Issue Books</h1>
      <div className="grid grid-cols-1 gap-5 place-items-center">
        <LinkButton
          to={`${previousPath}/issue-new-book`}
          label="Issue new Book"
        />
        <LinkButton
          to={`${previousPath}/return-issued-book`}
          label="Return Issued Book"
        />
        <LinkButton
          to={`${previousPath}/search-issued-books`}
          label="Search Issued Books"
        />
        <LinkButton
          to={`${previousPath}/search-returned-books`}
          label="Search Returned Books"
        />
      </div>
    </div>
  );
};

export default IssueBooksPage;
