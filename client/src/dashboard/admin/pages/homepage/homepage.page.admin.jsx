import { useContext } from "react";

import CurrentIssues from "./components/current-issues";
import TotalReturns from "./components/total-returns";
import TotalMembers from "./components/total-members";
import TotalBooks from "./components/total-books";
import { AuthContext } from "../../../../components/context/auth.content";

const Homepage = () => {
  const { userName } = useContext(AuthContext);

  return (
    <div>
      <div className="flex my-5 justify-between gap-3 flex-col md:flex-row">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome {userName.split(" ")[0]},
          </h1>
          <span>
            All systes are running smoothly! You have{" "}
            <a href="">0 unread alerts</a>
          </span>
        </div>

        <div className="bg-white px-2 flex justify-center items-center rounded dark:bg-gray-900 py-1 w-fit ">
          <span>{new Date().toDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-white">
        <CurrentIssues />
        <TotalReturns />
        <TotalMembers />
        <TotalBooks />
        <TotalBooks /> <TotalMembers /> <TotalReturns /> <CurrentIssues />
      </div>
    </div>
  );
};

export default Homepage;
