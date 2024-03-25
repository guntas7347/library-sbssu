import { Route, Routes } from "react-router-dom";
import AddBookPage from "../pages/manage-books/add-book/add-book.page.admin";
import SearchBooksPage from "../pages/manage-books/search-books/search-books.page.admin";
import ViewBookPage from "../pages/manage-books/view-book/view-book.page.admin";
import ManageBooksPage from "../pages/manage-books/manage-books.page.admin";
import AddBookAccessionPage from "../pages/manage-books/book-accessions/add-book-accession.page.admin";
import EditBookPage from "../pages/manage-books/edit-book/edit-book.page.admin";

const ManageBooksRoute = () => {
  return (
    <Routes>
      <Route index element={<ManageBooksPage />} />
      <Route path="/add-book/" element={<AddBookPage />} />
      <Route path="/add-book-accession/" element={<AddBookAccessionPage />} />
      <Route path="/search-books/" element={<SearchBooksPage />} />
      <Route path="/search-books/:_id" element={<ViewBookPage />} />
      <Route path="/search-books/:_id/edit-book" element={<EditBookPage />} />
    </Routes>
  );
};
export default ManageBooksRoute;
