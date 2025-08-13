import { Edit, Eye, Trash2 } from "lucide-react";

type ActionsProps = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
};

const Actions: React.FC<ActionsProps> = ({
  onView,
  onEdit,
  onDelete,
  children,
}) => {
  return (
    <div className="flex justify-start items-center space-x-2">
      {onView && (
        <button
          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200"
          onClick={onView}
          type="button"
        >
          <Eye className="w-4 h-4" />
        </button>
      )}
      {children}
      {onEdit && (
        <button
          className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-lg transition-all duration-200"
          onClick={onEdit}
          type="button"
        >
          <Edit className="w-4 h-4" />
        </button>
      )}
      {onDelete && (
        <button
          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-all duration-200"
          onClick={onDelete}
          type="button"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Actions;
