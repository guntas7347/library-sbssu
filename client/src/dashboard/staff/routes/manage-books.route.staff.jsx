import { Route, Routes } from "react-router-dom";
import AddBookPage from "../pages/manage-books/add-book/add-book.page.staff";
import SearchBooksPage from "../pages/manage-books/search-books/search-books.page.staff";
import ViewBookPage from "../pages/manage-books/view-book/view-book.page.staff";
import ManageBooksPage from "../pages/manage-books/manage-books.page.staff";
import AddBookAccessionPage from "../pages/manage-books/book-accessions/add-book-accession.page.staff";

const ManageBooksRoute = () => {
  return (
    <Routes>
      <Route index element={<ManageBooksPage />} />
      <Route path="/add-book/" element={<AddBookPage />} />
      <Route path="/add-book-accession/" element={<AddBookAccessionPage />} />
      <Route path="/search-books/" element={<SearchBooksPage />} />
      <Route path="/view-book/:accessionNumber" element={<ViewBookPage />} />
    </Routes>
  );
};

export default ManageBooksRoute;
