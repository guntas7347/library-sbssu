import { useNavigate } from "react-router-dom";
import Header from "../../components/features/public/applied/Header";
import StatusBanner from "../../components/features/public/applied/StatusBanner";
import Instructions from "../../components/features/public/applied/Instructions";
import PrintButton from "../../components/features/public/applied/PrintButton";
import HelpSection from "../../components/features/public/footer/HelpSection";
import { CircleUserRound, GraduationCap, Star } from "lucide-react";
import { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";
import server from "../../services/server.api";
import { fromSnakeCase, getCookieValue } from "../../utils/functions";
import InfoField from "../../components/forms/infoField/InfoField ";

const AppliedPage = () => {
  const navigate = useNavigate();
  const gh = getCookieValue("gh");

  const { params } = useQuery();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (Object.keys(params).length === 0) {
          if (!gh) throw Error("No application trace");
          const res = await server.application.publicFetch({
            id: gh,
            type: "cookie",
          });
          if (!res.data) throw new Error("No application");
          setData(res.data);
          setLoading(false);
        } else {
          if (!params.gh) throw new Error("No GH");
          const res = await server.application.publicFetch({
            id: params.gh,
            type: "url",
          });
          if (!res.data) throw new Error("No application");
          setData(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        navigate("/join/applied/404");
      }
    })();
  }, []);

  if (loading) return <div className="h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-all duration-300">
      <Header id={data?.id || ""} gh={gh} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatusBanner />
        <Instructions />
        <PrintButton data={data} />

        {/* Application Details */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden print:shadow-none print:border-2 print:border-black">
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Application ID and Status */}
            <div className="mb-8 print:hidden">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Application Details
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    ID: {data?.applicationId ?? "N/A"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700">
                    <Star className="size-4 mr-2 fill-current" />
                    Pending Approval
                  </span>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center print:text-black">
                <CircleUserRound className="size-6 mr-2 text-blue-600 dark:text-blue-400" />
                Personal Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoField label="Full Name" value={data?.fullName ?? ""} />
                <InfoField
                  label="Father's Name"
                  value={data?.fatherName ?? ""}
                />
                <InfoField label="Email Address" value={data?.email ?? ""} />
                <InfoField
                  label="Phone Number"
                  value={data?.phoneNumber ?? ""}
                />
                <InfoField
                  label="Date of Birth"
                  value={data?.dob ? new Date(data.dob).toDateString() : "N/A"}
                />
                <InfoField
                  label="Gender"
                  value={fromSnakeCase(data?.gender) ?? ""}
                />
                <InfoField
                  label="Caste"
                  value={fromSnakeCase(data?.cast) ?? ""}
                />
              </div>

              <div className="mt-6">
                <InfoField
                  label="Address"
                  value={`${data?.streetAddress ?? ""}, ${data?.city ?? ""}, ${
                    data?.state ?? ""
                  } ${data?.pinCode ?? ""}`}
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                Academic Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoField label="Roll Number" value={data?.rollNumber ?? ""} />
                <InfoField
                  label="Academic Level"
                  value={fromSnakeCase(data?.memberType) ?? ""}
                />
                <InfoField
                  label="Degree/Diploma"
                  value={fromSnakeCase(data?.program) ?? ""}
                />
                <InfoField
                  label="Specialization"
                  value={fromSnakeCase(data?.specialization) ?? ""}
                />
                <InfoField label="Batch" value={data?.batch ?? ""} />
              </div>
            </div>
          </div>
        </div>
        <HelpSection />
      </main>
    </div>
  );
};

export default AppliedPage;
