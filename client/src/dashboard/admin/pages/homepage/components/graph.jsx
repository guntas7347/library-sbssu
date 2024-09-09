import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

const Graph = () => {
  const lineGraphData = {
    labels: [
      "Dec 31",
      "Jan 7",
      "Jan 14",
      "Jan 21",
      "Jan 28",
      "Feb 4",
      "Feb 11",
      "Feb 18",
      "Feb 25",
    ],
    datasets: [
      {
        label: "Books Issued",
        data: [63, 58, 61, 20, 63, 49, 60, 67, 24],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="rounded-3xl bg-white px-10 py-4 flex flex-col gap-3">
      <strong className="text-2xl">Usage Statistics</strong>
      <p>
        Unveiling the Library&apos;s Pulse: Dive into data on visits, searches,
        borrowing, and digital resource usage to enhance services.{" "}
      </p>
      <div>
        <Line data={lineGraphData} />
      </div>
    </div>
  );
};

export default Graph;
