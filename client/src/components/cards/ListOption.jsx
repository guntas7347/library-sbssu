import { X } from "lucide-react";

const ListOption = ({ onDelete = () => {}, label = "" }) => {
  return (
    <>
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <span className="font-medium">{label}</span>
        <button className="p-1 text-red-500 hover:bg-red-50 rounded">
          <X className="w-4 h-4" onClick={onDelete} />
        </button>
      </div>
    </>
  );
};

export default ListOption;
