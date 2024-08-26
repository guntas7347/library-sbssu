import { useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

import {
  fetchWeather,
  getNumberOfBookAccessions,
  getNumberOfIssuedBooks,
  getNumberOfReturnedBooks,
  getNumberOfStudents,
} from "../../hooks/http-requests.hooks.staff";

const Homepage = () => {
  const [showDropdown, setShowDropdown] = useState(true);

  const [temperature, setTemperature] = useState("Loading...");
  const [totalIssues, setTotalIssues] = useState("Loading...");
  const [past7dayIssues, setPast7dayIssues] = useState("Loading...");
  const [past7dayReturns, setPast7dayReturns] = useState("Loading...");
  const [totalReturns, setTotalReturns] = useState("Loading...");
  const [totalStudents, setTotalStudents] = useState("Loading...");
  const [past30DaysAddedStudents, setPast30DaysAddedStudents] =
    useState("Loading...");
  const [totalBooks, setTotalBooks] = useState("Loading...");

  const fetchData = async () => {
    try {
      setTemperature(await fetchWeather());
      setTotalIssues(await getNumberOfIssuedBooks());
      setPast7dayIssues(
        await getNumberOfIssuedBooks({
          issueDate: {
            $gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
          },
        })
      );
      setTotalReturns(await getNumberOfReturnedBooks());
      setPast7dayReturns(
        await getNumberOfReturnedBooks({
          returnDate: {
            $gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
          },
        })
      );
      setTotalBooks(await getNumberOfBookAccessions());
      setTotalStudents(await getNumberOfStudents());
      setPast30DaysAddedStudents(
        await getNumberOfStudents({
          createdAt: {
            $gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30),
          },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  });

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
    <div className="">
      <div className="flex flex-row my-5 relative">
        <div className="flex-start">
          <h1 className="text-4xl font-bold mb-2">Welcome User,</h1>
          <span>
            All systes are running smoothly! You have{" "}
            <a href="">0 unread alerts</a>
          </span>
        </div>
        <div className="ml-auto flex flex-col bg-white relative h-10 px-3 justify-center">
          <span>{new Date().toDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="h-96 bg-violet-300 rounded-3xl p-10">
          <span>
            {temperature} C<p>Ferozepur</p>
            <p>India</p>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-white">
          <div className="bg-indigo-500 rounded-3xl p-10">
            <p>Current Issues</p>
            <p>{totalIssues} Books</p>
            <p>{past7dayIssues} (last 7 days)</p>
          </div>{" "}
          <div className="bg-violet-500 rounded-3xl p-10">
            <p>Total Returns</p>
            <p>{totalReturns} Books</p>
            <p>{past7dayReturns} (last 7 days)</p>
          </div>{" "}
          <div className="bg-purple-500 rounded-3xl p-10">
            <p>Total Students</p>
            <p>{totalStudents}</p>
            <p>{past30DaysAddedStudents} (Added last 30 days)</p>
          </div>{" "}
          <div className="bg-pink-400 rounded-3xl p-10">
            <p>Total Books</p>
            <p>{totalBooks}</p>
            <p>Books :)</p>
          </div>
        </div>
        <div className="rounded-3xl bg-white px-10 py-4 flex flex-col gap-3">
          <strong className="text-2xl">Usage Statistics</strong>
          <p>
            Unveiling the Library&apos;s Pulse: Dive into data on visits,
            searches, borrowing, and digital resource usage to enhance services.{" "}
          </p>
          <div>
            <Line data={lineGraphData} />
          </div>
        </div>
        <div className="rounded-3xl bg-white px-10 py-4 flex flex-col gap-3">
          <strong className="text-2xl">Digital Resource Usage</strong>
          <p className="">
            Digital Deluge: Navigate through insights on e-resource access,
            popular databases, and online engagement to optimize digital
            offerings.
          </p>
          <div>
            <Line data={lineGraphData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
