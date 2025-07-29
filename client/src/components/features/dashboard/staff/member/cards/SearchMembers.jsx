import { CheckCircle, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Input from "../../../../../forms/input/Input-2";
import { useForm } from "../../../../../../hooks/useForm";
import server from "../../../../../../services/server.api";
import useFeedback from "../../../../../../hooks/useFeedback";
import { imagePathUrl } from "../../../../../../utils/functions";

const SearchMembers = ({ onSelect = () => {} }) => {
  const setFeedback = useFeedback();
  const [selectedMember, setSelectedMember] = useState(null);
  const { formFields, handleChange } = useForm();
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    try {
      if (!formFields.search) return;
      const res = await server.member.search(formFields.search);

      setData(res.data);
    } catch (error) {
      setFeedback(2, error);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch();
      onSelect(null);
    }, 1000);
    return () => clearTimeout(debounce);
  }, [formFields]);

  const handleMemberSelect = (member) => {
    setSelectedMember(member);
    onSelect(member);
  };

  return (
    <>
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Search className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            Select Member
          </h3>

          <Input
            label="Search"
            name="search"
            placeholder="Last 3 digits of membership ID"
            SVG={<Search />}
            onChange={handleChange}
            type="number"
          />

          <div className="space-y-3 mt-5 max-h-96 overflow-y-auto">
            {data.map((member) => (
              <div
                key={member.id}
                onClick={() => handleMemberSelect(member)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedMember?.id === member.id
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={imagePathUrl(member.photo)}
                    alt={member.fullName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {member.fullName}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {member.membershipId}
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400">
                      {member.program}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 px-2 py-1 rounded-full">
                        {member.libraryCards.length} Cards
                      </span>
                      {/* {member.previousCards.length > 0 && (
                        <span className="text-xs bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200 px-2 py-1 rounded-full">
                          {member.previousCards.length} Previous
                        </span>
                      )} */}
                    </div>
                  </div>
                  {selectedMember?.id === member.id && (
                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchMembers;
