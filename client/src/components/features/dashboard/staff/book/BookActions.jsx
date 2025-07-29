import { BookPlus } from "lucide-react";
import { Link } from "react-router-dom";

const BookActions = () => {
  return (
    <>
      <Link
        className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 hover:opacity-80 dark:from-green-500 dark:to-green-700 rounded-xl flex items-center justify-center"
        to="add"
      >
        <BookPlus className="w-6 h-6 text-white" />
      </Link>
    </>
  );
};

export default BookActions;
