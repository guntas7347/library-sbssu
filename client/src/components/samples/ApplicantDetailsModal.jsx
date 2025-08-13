import {
  X,
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

export default function ApplicantDetailsModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-b border-yellow-200 dark:border-yellow-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 dark:from-yellow-400 dark:to-amber-500 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">
                  Applicant Details
                </h2>
                <p className="text-yellow-700 dark:text-yellow-300">
                  ID: {applicant.id} • {applicant.status}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 rounded-xl transition-all duration-200"
            >
              <X className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6 text-center">
                  <div className="relative inline-block mb-6">
                    <img
                      src={applicant.profilePhoto}
                      alt={applicant.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {applicant.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
                    {applicant.department}
                  </p>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {applicant.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {applicant.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {applicant.dateOfBirth}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
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
            <div className="lg:col-span-2 space-y-6">
              {/* Academic Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Academic Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Student ID
                      </label>
                      <p className="text-gray-900 dark:text-white font-semibold">
                        {applicant.studentId}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Department
                      </label>
                      <p className="text-gray-900 dark:text-white font-semibold">
                        {applicant.department}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Academic Level
                      </label>
                      <p className="text-gray-900 dark:text-white font-semibold">
                        {applicant.academicLevel}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Expected Graduation
                      </label>
                      <p className="text-gray-900 dark:text-white font-semibold">
                        {applicant.expectedGraduation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                    Submitted Documents
                  </h4>

                  <div className="space-y-3">
                    {applicant.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              doc.status === "Verified"
                                ? "bg-green-100 dark:bg-green-900/50"
                                : "bg-yellow-100 dark:bg-yellow-900/50"
                            }`}
                          >
                            {doc.status === "Verified" ? (
                              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                              {doc.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {doc.type} • Uploaded {doc.uploadDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              doc.status === "Verified"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                            }`}
                          >
                            {doc.status}
                          </span>
                          <button className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes & Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Review Notes
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {applicant.notes}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 flex items-center justify-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 flex items-center justify-center space-x-2 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                    <button className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center space-x-2 text-sm">
                      <Edit className="w-4 h-4" />
                      <span>Request Changes</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
