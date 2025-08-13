import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import { FolderPlus, Search } from "lucide-react";
import server from "../../services/server.api";

const BookCard = ({ book }) => {
  const availableCopies = book.accessions.filter(
    (acc) => acc.status === "available"
  ).length;
  const totalCopies = book.accessions.length;

  const availabilityClass =
    availableCopies > 0
      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
      : "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300";
  const availabilityText = availableCopies > 0 ? "Available" : "Unavailable";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700 transform hover:-translate-y-1 transition-all duration-300">
      <img
        src={book.cover}
        alt={`Cover of ${book.title}`}
        className="w-full h-64 object-cover"
      />
      <div className="p-5">
        <h2
          className="text-xl font-bold text-slate-900 dark:text-white truncate"
          title={book.title}
        >
          {book.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-1">{book.author}</p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {availableCopies} of {totalCopies} copies
          </span>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${availabilityClass}`}
          >
            {availabilityText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Catalogue() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    try {
      if (!searchTerm || searchTerm.trim() === "") return setData([]);
      const res = await server.public.catalogue(searchTerm);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(handleSearch, 800);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <>
      <Header />
      <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen font-sans">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Library Catalogue
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Search for books by title, author, or accession number.
            </p>
          </header>

          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., 'Dune', 'Frank Herbert', or '1001'"
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
              />
            </div>
          </div>

          {data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FolderPlus className="mx-auto h-12 w-12 text-slate-400" />
              <h2 className="mt-2 text-xl font-semibold text-slate-700 dark:text-slate-300">
                No Matches Found
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Try a different search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
