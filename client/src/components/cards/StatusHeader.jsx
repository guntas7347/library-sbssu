import { X } from "lucide-react";

const StatusHeader = ({ data, onClose = () => {} }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "green";
      case "timely return":
        return "green";
      case "overdue":
        return "red";
      case "dueSoon":
        return "yellow";
      default:
        return "gray";
    }
  };
  return (
    <>
      <div className={` bg-${getStatusColor(data.status)}-500  p-4 text-white`}>
        <div className="flex items-center justify-between">
          <span className="font-semibold uppercase">{data.status}</span>
          <span className="text-sm">
            {data.daysLeft ? (
              <>
                {data.daysLeft > 0
                  ? `${data.daysLeft} days left`
                  : `${Math.abs(data.daysLeft)} days overdue`}
              </>
            ) : (
              <>
                <span className="text-sm">{data.daysHeld} days held</span>
              </>
            )}
          </span>
          <button
            className="cursor-pointer hover:bg-green-400 p-2 rounded-lg transition-all duration-100"
            type="button"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
      </div>
    </>
  );
};

export default StatusHeader;
