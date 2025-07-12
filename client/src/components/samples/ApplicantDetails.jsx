import React from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import AcademicInformation from "../pages/dashboard/staff/applications/cards/AcademicInformation";

export default function ApplicantDetails() {
  // Sample applicant data
  const applicant = {
    id: "APP001",
    name: "Sarah Johnson",
    email: "sarah.johnson@student.sbssu.edu",
    phone: "+1 (555) 234-5678",
    dateOfBirth: "1999-03-15",
    gender: "Female",
    address: "456 Oak Street",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    studentId: "STU2024002",
    department: "Computer Science",
    academicLevel: "Undergraduate",
    expectedGraduation: "2026-05",
    status: "Pending Review",
    submittedDate: "2024-01-20",
    lastUpdated: "2024-01-21",
    profilePhoto:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    documents: [
      {
        name: "Student ID Card",
        type: "ID",
        status: "Verified",
        uploadDate: "2024-01-20",
      },
      {
        name: "Enrollment Letter",
        type: "Enrollment",
        status: "Pending",
        uploadDate: "2024-01-20",
      },
      {
        name: "Transcript",
        type: "Academic",
        status: "Verified",
        uploadDate: "2024-01-20",
      },
    ],
    notes: "Application looks complete. Waiting for department verification.",
    reviewer: "Dr. Smith",
    priority: "Normal",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                    Applicant Details
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    ID: {applicant.id}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-xl bg-green-100 dark:bg-green-900/50 hover:bg-green-200 dark:hover:bg-green-900/70 transition-all duration-200">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </button>
              <button className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all duration-200">
                <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </button>
              <button className="p-2 rounded-xl bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-900/70 transition-all duration-200">
                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Banner */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-700 rounded-2xl p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 dark:from-yellow-400 dark:to-amber-500 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">
                  {applicant.status}
                </h2>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Submitted on {applicant.submittedDate} • Last updated{" "}
                  {applicant.lastUpdated}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-8 text-center">
                <div className="relative inline-block mb-6">
                  <img
                    src={applicant.profilePhoto}
                    alt={applicant.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {applicant.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
                  {applicant.department}
                </p>

                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {applicant.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {applicant.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {applicant.dateOfBirth}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {applicant.address}, {applicant.city}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Priority
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {applicant.priority}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-500 dark:text-gray-400">
                      Reviewer
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {applicant.reviewer}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Academic Information */}
            <AcademicInformation data={applicant} />

            {/* Documents */}

            {/* Notes & Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Review Notes
                </h4>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
                  <p className="text-gray-700 dark:text-gray-300">
                    {applicant.notes}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Approve Application</span>
                  </button>
                  <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 flex items-center justify-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Reject Application</span>
                  </button>
                  <button className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center space-x-2">
                    <Edit className="w-5 h-5" />
                    <span>Request Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
