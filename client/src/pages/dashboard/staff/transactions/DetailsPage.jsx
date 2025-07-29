import React, { useEffect, useState } from "react";
import PageHeader from "../../../../components/header/PageHeader";
import { CreditCard } from "lucide-react";
import MemberInfo from "../../../../components/features/dashboard/staff/transaction/view/MemberInfo";
import { useNavigate, useParams } from "react-router-dom";
import useFeedback from "../../../../hooks/useFeedback";
import server from "../../../../services/server.api";
import BookInfo from "../../../../components/features/dashboard/staff/transaction/view/BookInfo";
import TransactionDetailsCard from "../../../../components/features/dashboard/staff/transaction/view/TransactionDetailsCard";
import History from "../../../../components/features/dashboard/staff/transaction/view/History";

const TransactionDetailsPage = () => {
  const { id } = useParams();
  const setFeedback = useFeedback();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/staff/dashboard/transactions"); // Redirect if no ID
      return;
    }
    const fetchTransaction = async () => {
      try {
        // This server endpoint needs to be created
        const res = await server.transaction.fetch(id);
        setData(res.data);
      } catch (error) {
        setFeedback(2, error.message || "Failed to fetch transaction details.");
        navigate("/staff/dashboard/transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, []);

  if (loading) return null;

  if (!data) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">Transaction Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-5">
      <PageHeader
        title="Transaction Details"
        svg={CreditCard}
        sub={`Details for transaction ID #${
          data?.transaction?.receiptNumber ?? data?.transaction?.id.slice(0, 8)
        }`}
        colorClass="bg-purple-700"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <MemberInfo data={data.member} />
          <BookInfo data={data.book} />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-6">
          <TransactionDetailsCard data={data.transaction} />
          <History data={data.history} />
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsPage;
