import React, { useEffect, useState } from "react";
import { getNumberOfStudents } from "../../../hooks/http-requests.hooks.admin";

const TotalMembers = () => {
  const [totalStudents, setTotalStudents] = useState("Loading...");
  const [past30DaysAddedStudents, setPast30DaysAddedStudents] =
    useState("Loading...");

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const result1 = await getNumberOfStudents();
        const result2 = await getNumberOfStudents({
          createdAt: {
            $gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30),
          },
        });
        setTotalStudents(result1);
        setPast30DaysAddedStudents(result2);
      } catch (err) {
        console.log(err);
      }
    };

    asyncFunc();
  }, []);

  return (
    <div className="bg-purple-500 rounded-3xl p-10">
      <p>Total Members</p>
      <p>{totalStudents}</p>
      <p>{past30DaysAddedStudents} (Added last 30 days)</p>
    </div>
  );
};

export default TotalMembers;
