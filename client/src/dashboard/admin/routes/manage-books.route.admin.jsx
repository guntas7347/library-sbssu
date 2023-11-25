import { Route, Routes } from "react-router-dom";
import AddBookPage from "../pages/manage-books/add-book/add-book.page.admin";
import SearchBooksPage from "../pages/manage-books/search-books/search-books.page.admin";
import ViewBookPage from "../pages/manage-books/view-book/view-book.page.admin";
import ManageBooksPage from "../pages/manage-books/manage-books.page.admin";
import AddBookAccountPage from "../pages/manage-books/book-accounts/add-book-account/add-book-accounts.page.admin";

const ManageBooksRoute = () => {
  return (
    <Routes>
      <Route index element={<ManageBooksPage />} />
      <Route path="/add-book/" element={<AddBookPage />} />
      <Route
        path="/add-book/add-book-account"
        element={<AddBookAccountPage />}
      />

      <Route path="/search-books/" element={<SearchBooksPage />} />
      <Route path="/view-books/" element={<ViewBookPage />} />
    </Routes>
  );
};

export default ManageBooksRoute;
