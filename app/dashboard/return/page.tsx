"use client";

import React, { useState } from "react";
import {
  BookMarked,
  Scan,
  User,
  Calendar,
  Clock,
  Search,
  CheckCircle,
} from "lucide-react";
import { getCheckoutByBarcode } from "@/lib/koha/circulation";
import PageHeader from "@/components/pageHeader"; // Adjust path as needed
import toast from "react-hot-toast";
import { checkinByBarcode } from "@/lib/koha/circulation/checkin";

const ReturnBookPage = () => {
  const [barcode, setBarcode] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Fetch Book Details
  const handleSearch = async (e) => {
    e?.preventDefault();
    const query = barcode.trim();
    if (!query) return;

    setLoading(true);
    try {
      const res = await getCheckoutByBarcode(query);

      if (!res?.checkout) throw new Error("This item is not currently issued.");

      setData(res);
    } catch (err) {
      setData(null);
      toast.error(err.message || "Book not found.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Process Return
  const handleReturn = async () => {
    try {
      setLoading(true);
      const res = await checkinByBarcode(
        barcode,
        "CPL",
        "2026-04-14T00:00:00.000Z",
      );
      const title = res.iteminformation?.title || "Item";

      // Handle specific Koha messages
      if (res.messages?.ResFound) {
        const p = res.messages.ResFound;
        toast.success(`RETURNED: Hold for ${p.Firstname} ${p.Surname}`, {
          duration: 6000,
        });
      } else {
        toast.success(`Successfully returned: ${title}`);
      }

      // Reset UI for next scan
      setData(null);
      setBarcode("");
    } catch (err) {
      toast.error("Failed to complete return.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 mx-auto pb-10">
      <PageHeader
        title="Return Book"
        sub="Return"
        svg={BookMarked}
        colorClass="bg-blue-700"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Input */}
        <div className="lg:col-span-1 space-y-4">
          <form
            onSubmit={handleSearch}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <label className="block text-sm font-semibold mb-2">
              Accession Number
            </label>
            <div className="relative mb-4">
              <Scan className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Scan Barcode..."
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !barcode}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  <Search size={18} /> Fetch Details
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Details & Action */}
        <div className="lg:col-span-2">
          {data ? (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-right-4">
              {/* Header Info */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                    {data.biblio?.title}
                  </h2>
                  <p className="text-sm text-gray-500 font-mono mt-1">
                    {barcode}
                  </p>
                </div>
                {new Date(data.checkout?.due_date) < new Date() && (
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock size={14} /> OVERDUE
                  </span>
                )}
              </div>

              {/* Patron & Dates */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-800/50">
                    <div className="bg-green-600 p-2 rounded-full text-white">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-green-700 dark:text-green-400 font-bold uppercase">
                        Issued To
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {data.patron?.firstname} {data.patron?.surname}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Issued On:</span>
                    <span className="font-medium">
                      {new Date(
                        data.checkout?.checkout_date,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="text-gray-500">Due Date:</span>
                    <span
                      className={`font-bold ${new Date(data.checkout?.due_date) < new Date() ? "text-red-600" : "text-blue-600"}`}
                    >
                      {new Date(data.checkout?.due_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={handleReturn}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle /> Confirm Return
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl flex flex-col items-center justify-center text-gray-400">
              <BookMarked size={48} className="mb-4 opacity-20" />
              <p>Scan or enter a barcode to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturnBookPage;
