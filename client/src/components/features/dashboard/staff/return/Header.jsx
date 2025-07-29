import { BookMarked } from "lucide-react";
import ModalTitle from "../../../../modals/ModalTitle";

const Header = () => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-1">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <ModalTitle
              title="Return Book"
              sub="Return"
              svg={<BookMarked className="w-6 h-6 text-white" />}
              colorClass="bg-blue-700"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
