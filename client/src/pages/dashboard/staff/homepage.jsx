import CurrentIssues from "../../../components/pages/dashboard/staff/homepage/current-issues";
import TotalReturns from "../../../components/pages/dashboard/staff/homepage/total-returns";
import TotalMembers from "../../../components/pages/dashboard/staff/homepage/total-members";
import TotalBooks from "../../../components/pages/dashboard/staff/homepage/total-books";
import useAuth from "../../../hooks/useAuth.hook";

const Homepage = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="flex my-5 justify-between gap-3 flex-col md:flex-row">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome {user.fullName},</h1>
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
