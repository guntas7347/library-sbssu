import React, { useEffect, useState } from "react";
import { getNumberOfIssuedBooks } from "../../../hooks/http-requests.hooks.admin";

const CurrentIssues = () => {
  const [totalIssues, setTotalIssues] = useState("Loading...");
  const [past7dayIssues, setPast7dayIssues] = useState("Loading...");

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
      } catch (err) {
        console.log(err);
      }
    };
    asyncFunc();
  }, []);

  return (
    <div className="bg-indigo-500 rounded-3xl p-10">
      <p>Current Issues</p>
      <p>{totalIssues} Books</p>
      <p>{past7dayIssues} (last 7 days)</p>
    </div>
  );
};

export default CurrentIssues;
