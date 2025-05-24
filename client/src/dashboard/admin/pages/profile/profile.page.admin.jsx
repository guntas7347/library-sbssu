import { useEffect, useState } from "react";
import SpanningTable from "../../../../components/table/spanning-table.component";
import { formatTime } from "../../../../utils/functions";
import { useFeedback } from "../../../../components/context/snackbar.context";
import server from "../../hooks/http-requests.hooks.admin";
import Spinner from "../../../../components/feedback/spinner/spinner.component";

const ProfilePage = () => {
  const setFeedback = useFeedback();

  const [profileData, setProfileData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await server.staff.fetchProfile();
        setProfileData(res);
        console.log(res);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
      }
    })();
  }, []);

  if (loading)
    return (
      <div>
        <Spinner center={true} height="min-h-96" />
      </div>
    );

  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-5">Your Profile</h1>
      <div className="c-box">
        <SpanningTable
          rows={[
            ["ID Number", profileData.idNumber],
            ["Staff Name", profileData.fullName],
            ["Email", profileData.email],
            ["Rights", profileData.rights],
            ["Phone Number", profileData.phoneNumber || "N/A"],
            [
              "Date of Birth",
              profileData.dateOfBirth
                ? formatTime(profileData.dateOfBirth)
                : "N/A",
            ],
            ["Gender", profileData.gender || "N/A"],
            ["Address", profileData.address || "N/A"],
            ["Emergency Contact", profileData.emergencyContact || "N/A"],
            ["Employee ID", profileData.employeeId || "N/A"],
            ["Department", profileData.department || "N/A"],
            ["Designation", profileData.designation || "N/A"],
            [
              "Joining Date",
              profileData.joiningDate
                ? formatTime(profileData.joiningDate)
                : "N/A",
            ],
            ["Employment Status", profileData.employmentStatus || "N/A"],
            ["Level", profileData.level || "N/A"],
            ["Status", profileData.active ? "Active" : "Inactive"],
            [
              "Profile Picture",
              profileData.profilePictureURL ? (
                <img
                  src={profileData.profilePictureURL}
                  alt="Profile"
                  width="50"
                  height="50"
                />
              ) : (
                "N/A"
              ),
            ],
            ["Created At", formatTime(profileData.createdAt)],
          ]}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
