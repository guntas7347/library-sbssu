import React, { useState } from "react";
import {
  Scan,
  User,
  Search,
  BookOpen,
  GraduationCap,
  ArrowLeft,
  CheckCircle,
  IdCard,
  Hash,
  Calendar,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { getPatronById, quickSearchPatrons } from "@/lib/koha/patrons/patron"; // Assuming this handles multi-query
import { getUserCheckouts } from "@/lib/koha/patrons/checkouts";
import toast from "react-hot-toast";

const MemberSearch = ({
  onSelect = () => {},
}: {
  onSelect: (memberData: any) => void;
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e?.preventDefault();

    const searchTerm = query.trim();
    if (!searchTerm) return;

    setLoading(true);
    setSelectedMember(null);

    try {
      const data = await quickSearchPatrons(searchTerm);

      const matches = Array.isArray(data) ? data : [];

      setResults(matches);

      if (matches.length === 0) {
        toast.error("No patrons found");
      }
    } catch (err) {
      console.error("Search Error:", err);
      toast.error("Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 2. Selection Logic
  const handleSelect = async (member) => {
    setLoading(true);
    try {
      const checkoutData = await getUserCheckouts(member.patron_id);
      setSelectedMember(member);
      setCheckouts(checkoutData || []);
      onSelect(member);
    } catch (err) {
      toast.error("Failed to load member details.");
    } finally {
      setLoading(false);
    }
  };

  const getAcademicString = (m) => {
    const attrs = m?.extended_attributes || {};
    return [attrs.COURSE, attrs.BRANCH, attrs.BATCH]
      .filter(Boolean)
      .join(" - ");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 1. Search Section - Cleaner & More Focused */}
      <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <User className="text-blue-600 dark:text-blue-400 w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Find Patron
            </h3>
          </div>

          <form
            onSubmit={handleSearch}
            className="relative flex items-center gap-2"
          >
            <div className="relative flex-1 group">
              <Scan className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors size-5" />
              <input
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 dark:text-gray-200"
                placeholder="Scan ID or type name/mobile..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-6 h-[54px] rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search size={20} />
              )}
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>
        </div>
      </div>

      {/* 2. View: Search Results List */}
      {!selectedMember && results.length > 0 && (
        <div className="bg-white p-4 dark:bg-gray-800 rounded-[2rem] shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-2">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Matches Found ({results.length})
            </p>
          </div>

          <div className="grid gap-3">
            {results.map((m) => (
              <button
                key={m.userid}
                onClick={() => handleSelect(m)}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all text-left group relative overflow-hidden"
              >
                <div className="absolute right-0 top-0 h-full w-1 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform" />

                <div className="size-14 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-700 shadow-inner">
                  {m.extended_attributes?.IMAGE_ID ? (
                    <img
                      src={`/api/uploads/${m.extended_attributes.IMAGE_ID}`}
                      className="object-cover size-full"
                    />
                  ) : (
                    <User className="text-gray-300 w-8 h-8" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                    {m.firstname} {m.surname}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-700/50 px-1.5 py-0.5 rounded">
                      {m.userid}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <GraduationCap size={12} />{" "}
                      {getAcademicString(m) || "General"}
                    </span>
                  </div>
                </div>
                <ChevronRight
                  className="text-gray-300 group-hover:text-blue-500 transition-colors"
                  size={20}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. View: Detailed Member Profile */}
      {selectedMember && (
        <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 sm:p-8 text-white relative">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 left-6 text-white/80 hover:text-white flex items-center gap-1 text-sm font-medium bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all backdrop-blur-md"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <div className="size-24 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center border-2 border-white/30 shadow-2xl overflow-hidden">
                  {selectedMember.extended_attributes?.IMAGE_ID ? (
                    <img
                      src={`/api/uploads/${selectedMember.extended_attributes.IMAGE_ID}`}
                      className="object-cover size-full"
                    />
                  ) : (
                    <User size={48} className="text-white/80" />
                  )}
                </div>
                <div
                  className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-blue-700 size-6 rounded-full shadow-lg"
                  title="Active"
                />
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-black tracking-tight">
                  {selectedMember.firstname} {selectedMember.surname}
                </h2>
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
                  <span className="flex items-center gap-1.5 text-blue-100 text-sm bg-blue-400/20 px-3 py-1 rounded-full border border-blue-400/30">
                    <IdCard size={14} /> {selectedMember.userid}
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-100 text-sm bg-blue-400/20 px-3 py-1 rounded-full border border-blue-400/30">
                    <GraduationCap size={14} />{" "}
                    {getAcademicString(selectedMember)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Checkouts Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h4 className="flex items-center gap-2 font-bold text-gray-800 dark:text-gray-100">
                  <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <BookOpen className="text-orange-600 size-4" />
                  </div>
                  Active Checkouts
                </h4>
                <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs font-bold text-gray-500">
                  {checkouts.length} Items
                </span>
              </div>

              <div className="grid gap-3">
                {checkouts.length > 0 ? (
                  checkouts.map((c) => {
                    const isOverdue = new Date(c.due_date) < new Date();
                    return (
                      <div
                        key={c.checkout_id}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-orange-200 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                            <Hash className="text-gray-400 size-4" />
                          </div>
                          <span className="font-bold text-gray-700 dark:text-gray-200">
                            Item #{c.item_id}
                          </span>
                        </div>

                        <div className="mt-3 sm:mt-0 flex items-center gap-4">
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">
                              Return By
                            </span>
                            <div
                              className={`flex items-center gap-1.5 font-bold ${isOverdue ? "text-red-500" : "text-blue-600"}`}
                            >
                              <Calendar size={14} />
                              {new Date(c.due_date).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </div>
                          </div>
                          {isOverdue && (
                            <AlertCircle
                              className="text-red-500 animate-pulse"
                              size={20}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/30 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <CheckCircle
                      className="text-gray-200 dark:text-gray-700 mb-2"
                      size={40}
                    />
                    <p className="text-gray-400 font-medium">
                      No books currently issued
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberSearch;
