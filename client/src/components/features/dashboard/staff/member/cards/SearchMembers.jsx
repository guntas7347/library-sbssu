import React, { useEffect, useState } from "react";
import { CheckCircle, Loader, Search } from "lucide-react";

import Input from "../../../../../forms/input/Input-2";
import { useForm } from "../../../../../../hooks/useForm";
import server from "../../../../../../services/server.api";
import useFeedback from "../../../../../../hooks/useFeedback";
import { imagePathUrl } from "../../../../../../utils/functions";

/**
 * A safe and improved component for searching and selecting a member.
 * It handles multiple search results, loading states, and empty states.
 * @param {object} props
 * @param {function} props.onSelect - Callback function that returns the selected member object or null.
 */
const SearchMembers = ({ onSelect = () => {} }) => {
  const setFeedback = useFeedback();
  const [selectedMember, setSelectedMember] = useState(null);
  const { formFields, handleChange } = useForm();
  const [data, setData] = useState([]); // Expect an array of results
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      const searchTerm = formFields.search?.trim();

      // Clear results and parent state if search term is empty
      if (!searchTerm) {
        setData([]);
        onSelect(null);
        setSelectedMember(null);
        return;
      }

      setLoading(true);
      try {
        const res = await server.member.search(searchTerm);
        setData(res.data || []); // Ensure data is always an array
      } catch (error) {
        setFeedback(2, error.message || "Failed to search for members.");
        setData([]); // Clear data on error
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(handleSearch, 800);
    return () => clearTimeout(debounce);
  }, [formFields.search]);

  const handleMemberSelect = (member) => {
    setSelectedMember(member);
    onSelect(member);
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Search className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
          Select Member
        </h3>

        <Input
          label="Search Member"
          name="search"
          placeholder="Name or Membership ID"
          SVG={<Search />}
          onChange={handleChange}
        />

        <div className="space-y-3 mt-5 max-h-96 overflow-y-auto pr-2">
          {loading && <Loader message="Searching..." />}

          {!loading && data.length === 0 && formFields.search && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
              No members found.
            </p>
          )}

          {/* ✅ FIX: Map over the data array to render a list of results */}
          {!loading &&
            data.map((member) => (
              <div
                key={member?.id} // Use the unique ID from the mapped item
                onClick={() => handleMemberSelect(member)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedMember?.id === member?.id
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    // ✅ SAFE: Use optional chaining and provide a fallback
                    src={imagePathUrl(member?.photo)}
                    alt={member?.fullName ?? "Member"}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/48x48/cccccc/333333?text=N/A";
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {member?.fullName ?? "Unknown Member"}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {member?.membershipId ?? "N/A"}
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 capitalize">
                      {member?.program ?? ""}
                    </p>
                  </div>
                  {selectedMember?.id === member?.id && (
                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchMembers;
