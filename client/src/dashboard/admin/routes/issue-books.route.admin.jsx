import { Route, Routes } from "react-router-dom";
import IssueBooksPage from "../pages/issue-book/issue-book-route.admin";
import IssueNewBookPage from "../pages/issue-book/issue-new-book/issue-new-book.page.admin";
import ReturnIssuedBookPage from "../pages/issue-book/return-issued-book/return-issued-book.page.admin";
import SearchIssuedBooks from "../pages/issue-book/search-issued-books/search-issued-books.page.admin";
import SearchReturnedBooks from "../pages/issue-book/searh-returned-books/search-returned-books.page.admin";
import ViewReturnedBookPage from "../pages/issue-book/searh-returned-books/view-book.issue-book.page.admin";
import ViewIssuedBookPage from "../pages/issue-book/search-issued-books/view-book.issue-book.page.admin";

const IssueBooksRoute = () => {
  return (
    <Routes>
      <Route index element={<IssueBooksPage />} />
      <Route path="/issue-new-book/" element={<IssueNewBookPage />} />
      <Route path="/return-issued-book/" element={<ReturnIssuedBookPage />} />
      <Route path="/search-issued-books" element={<SearchIssuedBooks />} />
      <Route
        path="search-issued-books/view-book/:_id"
        element={<ViewIssuedBookPage />}
      />
      <Route path="/search-returned-books" element={<SearchReturnedBooks />} />
      <Route
        path="search-returned-books/view-book/:_id"
        element={<ViewReturnedBookPage />}
      />
    </Routes>
  );
};

export default IssueBooksRoute;
