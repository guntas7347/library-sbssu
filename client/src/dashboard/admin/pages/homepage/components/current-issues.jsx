import React, { useEffect, useState } from "react";
import { getNumberOfIssuedBooks } from "../../../hooks/http-requests.hooks.admin";
import Spinner from "../../../../../components/feedback/spinner/spinner.component";

const CurrentIssues = () => {
  const [totalIssues, setTotalIssues] = useState("Loading...");
  const [past7dayIssues, setPast7dayIssues] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const result1 = await getNumberOfIssuedBooks();
        const result2 = await getNumberOfIssuedBooks({
          issueDate: {
            $gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
          },
        });
        setTotalIssues(result1);
        setPast7dayIssues(result2);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunc();
  }, []);

  if (loading)
    return (
      <div className="bg-indigo-500 rounded-3xl p-10 flex justify-center">
        <Spinner center={true} />
      </div>
    );

  return (
    <div className="bg-indigo-500 rounded-3xl p-10">
      <p>Current Issues</p>
      <p>{totalIssues} Books</p>
      <p>{past7dayIssues} (last 7 days)</p>
    </div>
  );
};

export default CurrentIssues;
