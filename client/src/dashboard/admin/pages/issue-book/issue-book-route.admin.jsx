import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const IssueBooksPage = () => {
  const previousPath = "/dashboard/admin/issue-books";
  return (
    <div className="text-center">
      <h1 className="my-4">Issue Books</h1>
      <Button as={Link} to={`${previousPath}/issue-new-book`}>
        Issue new Book
      </Button>
      <br />
      <br />
      <Button as={Link} to={`${previousPath}/return-issued-book`}>
        Return Issued Book
      </Button>
      <br />
      <br />
      <Button as={Link} to={`${previousPath}/search-issued-books`}>
        Search Issued Books
      </Button>
      <br />
      <br />
      <Button as={Link} to={`${previousPath}/search-returned-books`}>
        Search Returned Books
      </Button>
    </div>
  );
};

export default IssueBooksPage;
