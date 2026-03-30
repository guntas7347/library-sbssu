import React, { useState, useMemo } from "react";
import { BookOpen, CheckCircle, CalendarDays } from "lucide-react";
import { issueBook } from "@/lib/koha/circulation";
import { checkinCall } from "@/lib/koha/internal/internal-koha";
import toast from "react-hot-toast";

const formatLocalDate = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const IssueSummary = ({
  data = {
    member: null,
    book: null,
    duration: 14,
    issueCondition: "",
    remark: "",
  },
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date();
  const [issueDate, setIssueDate] = useState(formatLocalDate(today));

  const normalizedBook = useMemo(() => {
    const book = data.book;
    return {
      title: book?.biblio?.title || "Unknown Title",
      itemId: book?.item_id,
      barcode: book?.external_id,
    };
  }, [data.book]);

  const normalizedMember = useMemo(() => {
    const member = data.member;
    console.log(member);
    return {
      name:
        `${member?.firstname || ""} ${member?.surname || ""}`.trim() ||
        "Unknown Patron",
      patronId: member?.patron_id,
      userId: member?.userid || "N/A",
    };
  }, [data.member]);

  const dueDate = useMemo(() => {
    if (!issueDate) return "";

    const [y, m, d] = issueDate.split("-").map(Number);

    // force UTC base date
    const base = new Date(Date.UTC(y, m - 1, d));

    const days = Number(data.duration) || 14;
    base.setUTCDate(base.getUTCDate() + days);

    return base.toISOString(); // ISO 8601
  }, [issueDate, data.duration]);

  const handleIssueBook = async () => {
    if (!normalizedMember.patronId || !normalizedBook.itemId) return;

    const isConfirmed = window.confirm(
      `Issue "${normalizedBook.title}" to ${normalizedMember.name}?`,
    );

    if (!isConfirmed || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const payload = {
        patronId: normalizedMember.patronId,
        itemId: normalizedBook.itemId,
        dueDate,
        checkout_date: new Date(issueDate).toISOString(),
      };

      console.log(payload);

      await issueBook(payload);

      toast.success("Book issued successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to issue book");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center border-b border-gray-100 dark:border-gray-700 pb-4">
        <CheckCircle className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
        Issue Summary
      </h3>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/50">
          <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-1.5 uppercase tracking-wider text-xs">
            Patron
          </h4>
          {data.member ? (
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-semibold text-base">{normalizedMember.name}</p>
              <p className="mt-0.5">
                User ID:{" "}
                <span className="font-mono">{normalizedMember.userId}</span>
              </p>
            </div>
          ) : (
            <p className="text-sm text-blue-600/70 dark:text-blue-400/70 italic">
              No patron selected
            </p>
          )}
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-800/50">
          <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-1.5 uppercase tracking-wider text-xs">
            Book
          </h4>
          {data.book ? (
            <div className="text-sm text-purple-800 dark:text-purple-200">
              <p className="font-semibold text-base capitalize">
                {normalizedBook.title}
              </p>
              <p className="mt-0.5">
                Barcode:{" "}
                <span className="font-mono">
                  {normalizedBook.barcode || "N/A"}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-sm text-purple-600/70 dark:text-purple-400/70 italic">
              No book scanned
            </p>
          )}
        </div>

        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-800/50">
          <div className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
            <div className="flex justify-between font-medium">
              <span>Duration:</span>
              <span>{data.duration} days</span>
            </div>
            <div className="flex justify-between font-bold text-amber-900 dark:text-amber-100 mt-1">
              <span>Due Date:</span>
              <span>{dueDate.split("T")[0]}</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Issue Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarDays className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all outline-none"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleIssueBook}
            disabled={
              !normalizedMember.patronId ||
              !normalizedBook.itemId ||
              isSubmitting
            }
            className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 text-white rounded-2xl hover:from-green-700 hover:to-green-800 dark:hover:from-green-600 dark:hover:to-green-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <BookOpen className="w-6 h-6" />
            <span>{isSubmitting ? "Processing..." : "Issue Book"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueSummary;
