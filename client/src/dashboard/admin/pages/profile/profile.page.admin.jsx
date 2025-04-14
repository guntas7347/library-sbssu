import { useContext, useEffect, useState } from "react";
import SpanningTable from "../../../../components/table/spanning-table.component";
import { formatTime } from "../../../../utils/functions";
import { SnackBarContext } from "../../../../components/context/snackbar.context";
import { fetchProfile } from "../../hooks/http-requests.hooks.admin";

const ProfilePage = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [staffData, setStaffData] = useState({ fullName: "", idNumber: null });

  const {
    idNumber,
    fullName,
    role,
    email,
    authId,
    phoneNumber,
    dateOfBirth,
    gender,
    address,
    emergencyContact,
    employeeId,
    department,
    designation,
    joiningDate,
    employmentStatus,
    profilePictureURL,
    createdAt,
    level,
    active,
  } = staffData;

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
      <h1 className="text-center font-bold text-4xl my-5">Your Profile</h1>
      <div className="c-box">
        <SpanningTable
          rows={[
            ["ID Number", idNumber],
            ["Staff Name", fullName],
            ["Email", email],
            ["Role", role],
            ["Phone Number", phoneNumber || "N/A"],
            ["Date of Birth", dateOfBirth ? formatTime(dateOfBirth) : "N/A"],
            ["Gender", gender || "N/A"],
            ["Address", address || "N/A"],
            ["Emergency Contact", emergencyContact || "N/A"],
            ["Employee ID", employeeId || "N/A"],
            ["Department", department || "N/A"],
            ["Designation", designation || "N/A"],
            ["Joining Date", joiningDate ? formatTime(joiningDate) : "N/A"],
            ["Employment Status", employmentStatus || "N/A"],
            ["Level", level || "N/A"],
            ["Status", active ? "Active" : "Inactive"],
            [
              "Profile Picture",
              profilePictureURL ? (
                <img
                  src={profilePictureURL}
                  alt="Profile"
                  width="50"
                  height="50"
                />
              ) : (
                "N/A"
              ),
            ],
            ["Created At", formatTime(createdAt)],
          ]}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
