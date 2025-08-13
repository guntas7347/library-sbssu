import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color?: string;
  svg: LucideIcon;
}

interface QuickActionsProps {
  actions: ActionButtonProps[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions = [] }) => {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
      <h4 className="font-bold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h4>
      <div className="space-y-3">
        {actions.map((action, idx) => (
          <ActionButton key={idx} {...action} />
        ))}
      </div>
    </div>
  );
};

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  color = "green",
  svg: SVG,
  ...props
}) => {
  return (
    <button
      className={`w-full flex items-center space-x-3 p-3 bg-${color}-50 dark:bg-${color}-900/50 text-${color}-700 dark:text-${color}-300 rounded-xl hover:bg-${color}-100 dark:hover:bg-${color}-900/70 transition-all duration-200`}
      {...props}
    >
      <SVG className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
};

export default QuickActions;
