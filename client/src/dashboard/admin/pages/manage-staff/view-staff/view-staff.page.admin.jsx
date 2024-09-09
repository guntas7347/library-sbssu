import { useContext, useEffect, useState } from "react";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import { useParams } from "react-router-dom";
import { fetchStaffById } from "../../../hooks/http-requests.hooks.admin";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";
import { formatTime } from "../../../../../utils/functions";
import LinkButton from "../../../../../components/forms/link-button/link-button.component";

const ViewStaffPage = () => {
  const { _id } = useParams();

  const { setFeedback } = useContext(SnackBarContext);

  const [staffData, setStaffData] = useState({ fullName: "", idNumber: null });

  const { fullName, idNumber, email, level, active, createdAt } = staffData;
  console.log(staffData);
  useEffect(() => {
    const asyncFunc = async () => {
      await fetchStaffById(_id)
        .then((res) => setStaffData(res))
        .catch((err) => {
          setFeedback([1, 2, err]);
        });
    };
    asyncFunc();
  }, []);

  return (
    <div className="m-5">
      <div className="text-center font-bold text-3xl my-2">
        <h1>Staff Details</h1>
      </div>
      <div>
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
      <div className="my-5">
        <LinkButton to={`edit-staff`} label="Edit Staff Details" />
      </div>
    </div>
  );
};

export default ViewStaffPage;
