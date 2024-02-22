import { Route, Routes } from "react-router-dom";
import AddBookPage from "../pages/manage-books/add-book/add-book.page.admin";
import SearchBooksPage from "../pages/manage-books/search-books/search-books.page.admin";
import ViewBookPage from "../pages/manage-books/view-book/view-book.page.admin";
import ManageBooksPage from "../pages/manage-books/manage-books.page.admin";
import AddBookAccessionPage from "../pages/manage-books/book-accessions/add-book-accession.page.admin";

const ManageBooksRoute = () => {
  return (
    <Routes>
      <Route index element={<ManageBooksPage />} />
      <Route path="/add-book/" element={<AddBookPage />} />
      <Route path="/add-book-accession/" element={<AddBookAccessionPage />} />
      <Route path="/search-books/" element={<SearchBooksPage />} />
      <Route path="/view-book/:_id" element={<ViewBookPage />} />
    </Routes>
  );
};

export default ManageBooksRoute;
