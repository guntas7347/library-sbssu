import { useContext } from "react";

import WeatherBox from "./components/weather";
import CurrentIssues from "./components/current-issues";
import TotalReturns from "./components/total-returns";
import TotalMembers from "./components/total-members";
import TotalBooks from "./components/total-books";
import { AuthContext } from "../../../../components/context/auth.content";

const Homepage = () => {
  const { userName } = useContext(AuthContext);

  return (
    <div>
      <div className="flex flex-row my-5 relative ">
        <div className="flex-start">
          <h1 className="text-4xl font-bold mb-2">
            Welcome {userName.split(" ")[0]},
          </h1>
          <span>
            All systes are running smoothly! You have{" "}
            <a href="">0 unread alerts</a>
          </span>
        </div>
        <div className="ml-auto flex flex-col bg-white relative h-10 px-3 rounded-md justify-center dark:bg-gray-700">
          <span>{new Date().toDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <WeatherBox />
        <div className="grid grid-cols-2 gap-4 text-white">
          <CurrentIssues />
          <TotalReturns />
          <TotalMembers />
          <TotalBooks />
        </div>
        {/* <Graph />
        <Graph /> */}
      </div>
    </div>
  );
};

export default Homepage;
