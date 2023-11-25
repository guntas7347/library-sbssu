import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ManageBooksPage = () => {
  const previousPath = "/dashboard/admin/manage-books";
  return (
    <div className="text-center">
      <h1 className="my-4">Manage Books</h1>
      <Button as={Link} to={`${previousPath}/add-book`}>
        Add new Book
      </Button>
      <br />
      <br />
      <Button as={Link} to={`${previousPath}/add-book/add-book-account`}>
        Add new Book Account
      </Button>
      <br />
      <br />
      <Button as={Link} to={`${previousPath}/search-books`}>
        Search Books
      </Button>
    </div>
  );
};

export default ManageBooksPage;
