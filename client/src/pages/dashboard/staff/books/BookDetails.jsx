// src/pages/staff/book/BookDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book } from "lucide-react";

import PageHeader from "../../../../components/header/PageHeader";
import ProfileCard from "../../../../components/features/dashboard/staff/book/cards/ProfileCard";
import BookInformation from "../../../../components/features/dashboard/staff/book/cards/BookInformation";
import CurrentIssues from "../../../../components/features/dashboard/staff/book/cards/CurrentIssues";
import useFeedback from "../../../../hooks/useFeedback";
import server from "../../../../services/server.api";
import AccessionNumbersCard from "../../../../components/features/dashboard/staff/book/cards/AccesionNumbersCard";
import QuickActions from "../../../../components/features/common/QuickActions";

const BookDetails = () => {
  const setFeedback = useFeedback();
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for a valid ID before fetching
    if (!id) {
      setFeedback(2, "No book ID provided.");
      return;
    }

    const fetchBook = async () => {
      try {
        const res = await server.book.fetch(id);
        setData(res.data);
      } catch (error) {
        setFeedback(2, error.message || "Failed to fetch book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // A more informative loading state
  if (loading) return <div>Loading...</div>;

  // Handle the case where the book was not found after loading
  if (!data) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">Book Not Found</h2>
        <p className="text-gray-500">The requested book could not be found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Book Details"
        svg={Book}
        sub="View comprehensive book details and history"
        colorClass="bg-purple-700"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-w-6xl gap-4">
        <div className="lg:col-span-1 grid gap-y-4">
          <ProfileCard data={data} />
          <AccessionNumbersCard data={data} />
          <QuickActions
            actions={[
              { label: "Edit", svg: Book, onClick: () => navigate("edit") },
            ]}
          />
        </div>
        <div className="lg:col-span-2 grid gap-y-4">
          <BookInformation data={data} />
          <CurrentIssues data={data} />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
