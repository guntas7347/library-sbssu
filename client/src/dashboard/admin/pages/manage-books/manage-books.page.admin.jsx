import LinkButton from "../../../../components/forms/link-button/link-button.component";

const ManageBooksPage = () => {
  const previousPath = "/dashboard/admin/manage-books";
  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-5">Manage Books</h1>
      <div className="grid grid-cols-1 gap-5 place-items-center">
        <LinkButton to={`${previousPath}/add-book`} label="Add new Book" />
        <LinkButton
          to={`${previousPath}/add-book-accession`}
          label="Add Book Accession"
        />
        <LinkButton to={`${previousPath}/search-books`} label="Search Books" />
      </div>{" "}
    </div>
  );
};

export default ManageBooksPage;
