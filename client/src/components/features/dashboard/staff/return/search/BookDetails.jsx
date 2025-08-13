const BookDetails = ({ book }) => {
  // ✅ SAFE: A top-level guard clause prevents any rendering if `book` is missing.
  if (!book) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">
        Book Details
      </h4>
      <div className="flex items-start space-x-4">
        <img
          src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg"
          alt={book?.title ?? "Book cover"} // ✅ SAFE
          className="w-16 h-20 object-cover rounded-lg border border-blue-200 dark:border-blue-600"
        />
        <div className="flex-1">
          <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
            {book?.title ?? "Title Not Available"} {/* ✅ SAFE */}
          </h5>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
            by {book?.author ?? "Author Not Available"} {/* ✅ SAFE */}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-blue-600 dark:text-blue-400">
            <div>ID: {book?.accessionNumber ?? "N/A"}</div> {/* ✅ SAFE */}
            <div>ISBN: {book?.isbn ?? "N/A"}</div> {/* ✅ SAFE */}
            <div>Category: {book?.category ?? "N/A"}</div> {/* ✅ SAFE */}
            <div>Location: {book?.location ?? "N/A"}</div> {/* ✅ SAFE */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
