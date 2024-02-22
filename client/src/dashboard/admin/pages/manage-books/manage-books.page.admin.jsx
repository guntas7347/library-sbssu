import LinkButton from "../../../../components/forms/link-button/link-button.component";

const ManageBooksPage = () => {
  const previousPath = "/dashboard/admin/manage-books";
  return (
    <div className="text-center">
      <h1 className="my-4">Manage Books</h1>
      <LinkButton to={`${previousPath}/add-book`} label="Add new Book" />
      <br />
      <br />
      <LinkButton
        to={`${previousPath}/add-book-accession`}
        label="Add Book Accession"
      />
      <br />
      <br />
      <LinkButton to={`${previousPath}/search-books`} label="Search Books" />
    </div>
  );
};

export default ManageBooksPage;
