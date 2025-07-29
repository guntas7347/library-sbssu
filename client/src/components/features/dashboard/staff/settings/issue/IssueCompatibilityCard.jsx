import {
  ArrowDown,
  ArrowRight,
  Book,
  BookOpen,
  CreditCard,
} from "lucide-react";
import CardHeader from "../../../../../header/CardHeader";
import Toggle from "../../../../../forms/toggle/Toggle";
import useSetting from "../../../../../../hooks/useSetting";
import { fromSnakeCase } from "../../../../../../utils/functions";
import Spinner from "../../../../../feedback/spinner/Spinner";
import SaveCancelButton from "../../../../../buttons/SaveCancelButton";

const IssueCompatibilityCard = () => {
  const { data: cards, loading: l1 } = useSetting("LIBRARY-CARD-TYPES", []);
  const { data: books, loading: l2 } = useSetting("BOOKS-CATEGORIES", []);
  const { data, setData, loading, handleSave } = useSetting(
    "ISSUE-COMPATIBILITY",
    {}
  );

  if (l1 || l2 || loading) return <Spinner />;

  const handleToggle = (row, col, toggle) => {
    setData((prev) => ({
      ...prev,
      [row]: {
        ...(prev?.[row] || {}),
        [col]: toggle,
      },
    }));
  };

  return (
    <>
      <div className="card p-6">
        <CardHeader
          title="Issue Compatibility"
          svg={BookOpen}
          svgClass="bg-purple-100 text-purple-600"
        />
        {/* Toggle Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium flex text-gray-900">
                  <ArrowDown /> Card Type / Book Categories <ArrowRight />
                </th>
                {/* // books passed as col and cards as row */}
                {books.map((col) => (
                  <th
                    key={col}
                    className="text-center  py-3 px-4 font-medium text-gray-900"
                  >
                    <div className="flex-center gap-2">
                      <Book className="text-green-400" />
                      {fromSnakeCase(col, true)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cards.map((row) => (
                <tr key={row} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">
                    <div className="flex gap-2">
                      <CreditCard className="text-purple-400" />
                      {fromSnakeCase(row, true)}
                    </div>
                  </td>
                  {books.map((col) => (
                    <td key={col} className="py-3 px-4 font-medium text-center">
                      <Toggle
                        onToggle={(t) => handleToggle(row, col, t)}
                        defaultToggle={data?.[row]?.[col]}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SaveCancelButton onSave={handleSave} />
      </div>
    </>
  );
};

export default IssueCompatibilityCard;
