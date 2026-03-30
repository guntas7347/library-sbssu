"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  deleteApplicationById,
  getApplication,
  updateApplicationStatus,
} from "@/lib/firebase/applications";
import {
  CheckCircle,
  XCircle,
  User,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Building,
  Loader2,
  Trash,
} from "lucide-react";
import { submitPatronApplication } from "@/lib/koha/application";
import toast from "react-hot-toast";

export default function ApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [application, setApplication] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getApplication(id);
        setApplication(data);
      } catch (error) {
        console.error("Failed to fetch application:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchData();
  }, []);

  const handleDelete = async () => {
    const confirmAction = confirm(
      `Are you sure you want to DELETE this application?`,
    );
    if (!confirmAction) return;

    setIsProcessing(true);
    try {
      await deleteApplicationById(id);
      console.log(`Application ${id} deleted`);
      alert(`Application successfully deleted!`);
      router.push("/dashboard/applications");
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handlers for Approve/Reject buttons
  const handleAction = async (action: "approved" | "rejected") => {
    const confirmAction = confirm(
      `Are you sure you want to ${action.toUpperCase()} this application?`,
    );
    if (!confirmAction) return;

    setIsProcessing(true);
    try {
      if (action === "approved") {
        await submitPatronApplication(JSON.parse(JSON.stringify(application)));
        await updateApplicationStatus(id, action);
        toast.success(`Application successfully ${action}d!`);
      } else {
        await updateApplicationStatus(id, action);
        toast.success(`Application successfully ${action}d!`);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper to format Firestore Timestamp
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    // Check if it's a Firestore timestamp object
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    // Fallback if it's a standard string date
    return new Date(timestamp).toLocaleDateString();
  };

  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  if (!application) {
    return (
      <div className="text-center py-12 text-gray-500">
        Application not found.
      </div>
    );
  }

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 md:gap-6">
        {/* Profile Photo & Title Wrapper */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Profile Photo Container */}
          <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
            {application.image_id ? (
              <img
                src={`/api/uploads/${application.image_id}`}
                alt={`${application.firstname} ${application.surname}`}
                className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-md bg-white dark:bg-gray-800"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full border-4 border-white dark:border-gray-800 shadow-md text-gray-400 dark:text-gray-500">
                <User className="w-10 h-10" />
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex flex-wrap items-center gap-3">
              {application.firstname} {application.surname}
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full border uppercase tracking-wider ${statusColors[application.status as keyof typeof statusColors] || "bg-gray-100"}`}
              >
                {application.status}
              </span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
              Application ID: <span className="font-mono text-sm">{id}</span>
              <span className="text-gray-300">•</span>
              Applied: {formatDate(application.createdAt)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {/* {application.status === "pending" && ( */}
        <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
          <button
            onClick={handleDelete}
            disabled={isProcessing}
            className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <Trash className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleAction("rejected")}
            disabled={isProcessing}
            className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Reject
          </button>
          <button
            onClick={() => handleAction("approved")}
            disabled={isProcessing}
            className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Approve
          </button>
        </div>
        {/* )} */}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 border-b pb-3 dark:border-gray-700">
            <User className="w-5 h-5 text-blue-500" />
            Personal Details
          </h2>
          <div className="space-y-4">
            <InfoRow
              label="Full Name"
              value={`${application.firstname} ${application.surname}`}
            />
            <InfoRow label="Father's Name" value={application.fatherName} />
            <InfoRow
              label="Date of Birth"
              value={formatDate(application.date_of_birth)}
            />
            <InfoRow label="Gender" value={application.gender} />
            <InfoRow label="Category" value={application.category} />
          </div>
        </div>

        {/* Academic Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 border-b pb-3 dark:border-gray-700">
            <GraduationCap className="w-5 h-5 text-green-500" />
            Academic Info
          </h2>
          <div className="space-y-4">
            <InfoRow label="Member Type" value={application.memberType} />
            <InfoRow label="Course" value={application.course} />
            <InfoRow label="Branch" value={application.branch} />
            <InfoRow
              label="Batch"
              value={`${application.batch}-${application.expectedGraduationYear}`}
            />
            <InfoRow label="Roll Number" value={application.rollNumber} />
          </div>
        </div>

        {/* Contact Information Card (Spans full width on medium screens and up) */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 border-b pb-3 dark:border-gray-700">
            <MapPin className="w-5 h-5 text-purple-500" />
            Contact & Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <InfoRow
              icon={<Mail className="w-4 h-4 text-gray-400" />}
              label="Email"
              value={application.email}
            />
            <InfoRow
              icon={<Phone className="w-4 h-4 text-gray-400" />}
              label="Phone"
              value={application.phone}
            />
            <InfoRow
              icon={<Building className="w-4 h-4 text-gray-400" />}
              label="Address"
              value={application.address}
            />
            <InfoRow
              icon={<MapPin className="w-4 h-4 text-gray-400" />}
              label="Location"
              value={`${application.city}, ${application.state} - ${application.postal_code}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable component for data rows
function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
        {icon}
        {label}
      </div>
      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1 sm:mt-0 text-right">
        {value || "—"}
      </div>
    </div>
  );
}
