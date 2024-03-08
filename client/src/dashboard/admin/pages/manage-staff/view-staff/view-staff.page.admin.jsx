import { useContext, useEffect, useState } from "react";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import { useParams } from "react-router-dom";
import { fetchStaffById } from "../../../hooks/http-requests.hooks.admin";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const ViewStaffPage = () => {
  const { _id } = useParams();

  const { setFeedback } = useContext(SnackBarContext);

  const [staffData, setStaffData] = useState({ fullName: "", idNumber: null });

  const { fullName, idNumber } = staffData;

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
      <div className="text-center mb-1">
        <h1>Staff Details</h1>
      </div>
      <div>
        <SpanningTable
          rows={[
            ["ID Number", idNumber],
            ["Staff Name", fullName],
          ]}
        />
      </div>
    </div>
  );
};

export default ViewStaffPage;
