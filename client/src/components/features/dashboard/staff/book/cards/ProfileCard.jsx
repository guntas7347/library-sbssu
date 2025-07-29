import { Book } from "lucide-react";

const ProfileCard = ({ data }) => {
  // If no data, render nothing to avoid crashes
  if (!data) return null;

  // Safely access properties with optional chaining and nullish coalescing
  const title = data?.title ?? "Untitled Book";
  const author = data?.author ?? "Unknown Author";
  const tags = data?.tags || []; // Default to an empty array
  const issuedCopies = data?.issuedCopies ?? 0;
  const availableCopies = data?.availableCopies ?? 0;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-8 text-center">
          <div className="relative inline-block mb-6">
            <img
              src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt={title}
              className="w-48 h-64 object-cover rounded-xl shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/192x256/a78bfa/ffffff?text=Book";
              }}
            />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-purple-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
              <Book className="w-5 h-5 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-purple-600 dark:text-purple-400 font-semibold mb-4">
            by {author}
          </p>

          {/* Tags - Safely map over the tags array */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 text-center pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {issuedCopies}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Currently Issued
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {availableCopies}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
