import React, { useEffect, useState } from "react";
import { getNumberOfStudents } from "../../../hooks/http-requests.hooks.admin";
import Spinner from "../../../../../components/feedback/spinner/spinner.component";

const TotalMembers = () => {
  const [totalStudents, setTotalStudents] = useState("Loading...");
  const [past30DaysAddedStudents, setPast30DaysAddedStudents] =
    useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const result1 = await getNumberOfStudents();
        const result2 = await getNumberOfStudents({
          createdAt: {
            $gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30),
          },
        });
        setTotalStudents(result1.p);
        setPast30DaysAddedStudents(result2.p);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    asyncFunc();
  }, []);

  if (loading)
    return (
      <div className="bg-purple-500 rounded-3xl p-10 flex justify-center">
        <Spinner center={true} />
      </div>
    );

  return (
    <div className="bg-purple-500 rounded-3xl p-10">
      <p>Total Members</p>
      <p>{totalStudents}</p>
      <p>{past30DaysAddedStudents} (Added last 30 days)</p>
    </div>
  );
};

export default TotalMembers;
