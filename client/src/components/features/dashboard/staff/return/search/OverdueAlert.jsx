import { AlertCircle } from "lucide-react";

const OverdueAlert = ({ issue }) => {
  // ✅ SAFE: If the `issue` prop is missing, the component returns nothing.
  if (!issue) {
    return null;
  }

  const overdueDays = (due, today = new Date()) =>
    Math.floor((new Date(today) - new Date(due)) / (1000 * 60 * 60 * 24));

  const dueDays = overdueDays(issue.dueDate || new Date());

  // Only render the alert if the book is actually overdue.
  if (dueDays <= 0) return null;

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4">
      <div className="flex items-center space-x-3">
        <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
        <div>
          <h4 className="font-semibold text-red-800 dark:text-red-200">
            Overdue Book
          </h4>
          <p className="text-sm text-red-700 dark:text-red-300">
            {dueDays} days overdue
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverdueAlert;
