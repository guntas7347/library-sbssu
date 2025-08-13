import { NotebookPen } from "lucide-react";

const RemarkCard = ({
  onChange = () => {},
  label = "Remark",
  placeholder,
  rows = 4,
}) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <NotebookPen className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
          {label}
        </h3>
        <textarea
          name="remark"
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
        />
      </div>
    </>
  );
};

export default RemarkCard;
