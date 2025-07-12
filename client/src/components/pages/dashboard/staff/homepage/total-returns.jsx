import React, { useEffect, useState } from "react";
import Spinner from "../../../../feedback/spinner/Spinner";
import server from "../../../../../services/server.api";

const TotalReturns = () => {
  const [past7dayReturns, setPast7dayReturns] = useState("Loading...");
  const [totalReturns, setTotalReturns] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const result1 = await server();
        const result2 = await server({
          returnDate: {
            $gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
          },
        });
        setPast7dayReturns(result2.p);
        setTotalReturns(result1.p);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunc();
  }, []);

  if (loading)
    return (
      <div className="bg-violet-500 rounded-3xl p-10 flex justify-center">
        <Spinner center={true} />
      </div>
    );

  return (
    <div className="bg-violet-500 rounded-3xl p-10">
      <p>Total Returns</p>
      <p>{totalReturns} Books</p>
      <p>{past7dayReturns} (last 7 days)</p>
    </div>
  );
};

export default TotalReturns;
