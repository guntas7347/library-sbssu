import { useContext, useEffect, useState } from "react";
import SpanningTable from "../../../../components/table/spanning-table.component";
import { formatTime } from "../../../../utils/functions";
import { SnackBarContext } from "../../../../components/context/snackbar.context";
import { fetchProfile } from "../../hooks/http-requests.hooks.admin";

const ProfilePage = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [staffData, setStaffData] = useState({ fullName: "", idNumber: null });

  const { fullName, idNumber, email, level, active, createdAt } = staffData;

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchProfile()
        .then((res) => setStaffData(res))
        .catch((err) => {
          setFeedback([1, 2, err]);
        });
    };
    asyncFunc();
  }, []);

  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-5">Profile</h1>
      <div className="">
        <SpanningTable
          rows={[
            ["ID Number", idNumber],
            ["Staff Name", fullName],
            ["Email", email],
            ["Level", level],
            ["Status", active ? "Active" : "Inactive"],
            ["Created At", formatTime(createdAt)],
          ]}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
