import { useEffect, useState } from "react";
import { Scan, User } from "lucide-react";
import Input from "../../../../../forms/input/Input-2";
import useFeedback from "../../../../../../hooks/useFeedback";
import { useForm } from "../../../../../../hooks/useForm";
import server from "../../../../../../services/server.api";
import { imagePathUrl } from "../../../../../../utils/functions";

const MemberSearch = ({ onSelect = () => {} }) => {
  const setFeedback = useFeedback();
  const { formFields, handleChange } = useForm();
  const [selectedCard, setSelectedCard] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (card, member) => {
    setSelectedCard(card.id);
    onSelect({
      ...card,
      fullName: member.fullName,
      membershipId: member.membershipId,
    });
  };

  const fetchMember = async () => {
    const input = formFields.search?.trim();
    if (!input || input.length < 6) {
      setData(null);
      return;
    }

    setLoading(true);
    try {
      const res = await server.issue.member(input);
      const member = res.data;

      if (!member) {
        setFeedback(2, "No member found.");
        setData(null);
        return;
      }

      setData(member);
    } catch (err) {
      setFeedback(2, err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(fetchMember, 800);
    return () => clearTimeout(debounce);
  }, [formFields.search]);

  return (
    <div className="bg-white dark:bg-gray-800 space-y-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <User className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
        Member Information
      </h3>

      <Input
        label="Member ID"
        placeholder="eg., 25001"
        name="search"
        onChange={handleChange}
        SVG={<Scan />}
      />

      {loading && (
        <div className="text-sm text-blue-500 dark:text-blue-400">
          Searching...
        </div>
      )}

      {data && (
        <div
          key={data.id}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700"
        >
          {/* Member Overview */}
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={imagePathUrl(data.photo)}
              alt={data.fullName || "Member"}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 dark:border-blue-600 transition-all delay-0 hover:absolute hover:size-96 hover:border-8"
            />
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                {data.fullName || "N/A"}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {data.program || "N/A"} {data.specialization || ""}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                {data.email || "No email provided"}
              </p>
            </div>
          </div>

          {/* Library Cards */}
          <div className="space-y-3">
            <h5 className="font-medium text-blue-900 dark:text-blue-100">
              Available Library Cards:
            </h5>

            {data.libraryCards?.length > 0 ? (
              data.libraryCards.map((card) => (
                <label
                  key={card.id}
                  className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-600 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200"
                >
                  <input
                    type="radio"
                    name="libraryCard"
                    value={card.id}
                    checked={selectedCard === card.id}
                    onChange={() => handleSelect(card, data)}
                    className="text-blue-600 focus:ring-blue-500"
                    disabled={card.status !== "available"}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {card.cardNumber || "N/A"}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          card.status === "available"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                        }`}
                      >
                        {card.status?.toUpperCase() || "UNKNOWN"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {card.type || "Unknown"} • Expires:{" "}
                      {new Date(card.expiry).toDateString() || "N/A"}
                    </div>
                  </div>
                </label>
              ))
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                No cards assigned to this member.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberSearch;
