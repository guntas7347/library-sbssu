import React from "react";
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

  // This is now the single source of truth for the compatibility matrix
  const { data, setData, loading, handleSave } = useSetting(
    "ISSUE-COMPATIBILITY",
    {}
  );

  if (l1 || l2 || loading) return <Spinner />;

  // A single, clean handler to update the compatibility state
  const handleToggle = (cardType, bookCategory, isEnabled) => {
    setData((prevData) => ({
      ...prevData,
      [cardType]: {
        ...(prevData?.[cardType] || {}),
        [bookCategory]: isEnabled,
      },
    }));
  };

  return (
    <div className="card p-6">
      <CardHeader
        title="Issue Compatibility"
        svg={BookOpen}
        svgClass="bg-purple-100 text-purple-600"
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-500" />
                  <span>Card Type</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <Book className="w-4 h-4 text-green-500" />
                  <span>Book Category</span>
                </div>
              </th>
              {books.map((col) => (
                <th
                  key={col}
                  className="text-center py-3 px-4 font-medium text-gray-900 dark:text-gray-100"
                >
                  {fromSnakeCase(col, true)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cards.map((row) => (
              <tr
                key={row}
                className="border-b border-gray-100 dark:border-gray-800"
              >
                <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">
                  {fromSnakeCase(row, 1)}
                </td>
                {books.map((col) => (
                  <td key={col} className="py-3 px-4 text-center">
                    <Toggle
                      // The onToggle now calls our clean handler
                      onToggle={(isEnabled) =>
                        handleToggle(row, col, isEnabled)
                      }
                      // The 'checked' prop directly reads from our single state
                      checked={data?.[row]?.[col] || false}
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
  );
};

export default IssueCompatibilityCard;
