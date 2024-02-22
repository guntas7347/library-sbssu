import { useEffect, useState } from "react";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import { useParams } from "react-router-dom";
import { formatTime } from "../../../../../utils/functions";
import { fetchStaffById } from "../../../hooks/http-requests.hooks.admin";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";

const ViewStaffPage = () => {
  const { _id } = useParams();

  const [staffData, setStaffData] = useState({ fullName: "", idNumber: null });

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { fullName, idNumber } = staffData;

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchStaffById(_id)
        .then((res) => setStaffData(res))
        .catch((err) => {
          setSnackbarFeedback([1, 2, err]);
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
      <div>
        <SnackbarFeedbackCustom
          feedback={showSnackbarFeedback}
          handleClose={setSnackbarFeedback}
        />
      </div>
    </div>
  );
};

export default ViewStaffPage;
