import React, { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  User,
  Search,
  Calendar,
  CheckCircle,
  AlertCircle,
  Save,
  Eye,
  Download,
  Printer,
  Hash,
  Shield,
  Clock,
} from "lucide-react";

export default function AllotLibraryCardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    issueDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
    cardType: "Student",
    status: "Active",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Sample members without active library cards
  const membersWithoutCards = [
    {
      id: "LIB003",
      name: "Mike Johnson",
      email: "mike.johnson@student.sbssu.edu",
      phone: "+1 (555) 345-6789",
      dateOfBirth: "1997-12-10",
      studentId: "STU2024003",
      department: "Mathematics",
      academicLevel: "Graduate",
      expectedGraduation: "2025-05",
      status: "Active",
      joinDate: "2024-01-15",
      profilePhoto:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      membershipType: "Student",
      hasActiveCard: false,
      previousCards: [
        {
          cardNumber: "2023003456789012",
          issueDate: "2023-01-15",
          expiryDate: "2024-01-15",
          status: "Expired",
        },
      ],
    },
    {
      id: "LIB004",
      name: "Sarah Wilson",
      email: "sarah.wilson@student.sbssu.edu",
      phone: "+1 (555) 456-7890",
      dateOfBirth: "2000-04-22",
      studentId: "STU2024004",
      department: "Business",
      academicLevel: "Undergraduate",
      expectedGraduation: "2026-12",
      status: "Active",
      joinDate: "2024-01-20",
      profilePhoto:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      membershipType: "Student",
      hasActiveCard: false,
      previousCards: [],
    },
  ];

  const cardTypes = ["Student", "Faculty", "Staff", "Alumni", "Community"];
  const cardStatuses = ["Active", "Inactive", "Suspended"];

  const filteredMembers = membersWithoutCards.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMemberSelect = (member) => {
    setSelectedMember(member);

    // Generate card number based on year and member info
    const year = new Date().getFullYear();
    const memberNumber = member.id.replace("LIB", "").padStart(3, "0");
    const randomSuffix = Math.random().toString().substr(2, 6);
    const generatedCardNumber = `${year}${memberNumber}${randomSuffix}`;

    // Calculate expiry date (1 year from issue date for students, 2 years for faculty/staff)
    const issueDate = new Date();
    const expiryDate = new Date(issueDate);
    const yearsToAdd = member.membershipType === "Student" ? 1 : 2;
    expiryDate.setFullYear(expiryDate.getFullYear() + yearsToAdd);

    setCardData({
      cardNumber: generatedCardNumber,
      issueDate: issueDate.toISOString().split("T")[0],
      expiryDate: expiryDate.toISOString().split("T")[0],
      cardType: member.membershipType,
      status: "Active",
      notes: `Library card issued for ${member.name} - ${member.department}`,
    });

    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedMember) newErrors.member = "Please select a member";
    if (!cardData.cardNumber.trim())
      newErrors.cardNumber = "Card number is required";
    if (!cardData.issueDate) newErrors.issueDate = "Issue date is required";
    if (!cardData.expiryDate) newErrors.expiryDate = "Expiry date is required";

    // Check if expiry date is after issue date
    if (
      cardData.issueDate &&
      cardData.expiryDate &&
      cardData.expiryDate <= cardData.issueDate
    ) {
      newErrors.expiryDate = "Expiry date must be after issue date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const cardPayload = {
        memberId: selectedMember.id,
        memberName: selectedMember.name,
        ...cardData,
        issuedBy: "Current Staff Member", // This would come from auth context
        issuedDate: new Date().toISOString(),
      };

      console.log("Library card data to submit:", cardPayload);
      alert(
        `Library card ${cardData.cardNumber} has been successfully allotted to ${selectedMember.name}!`
      );

      // Reset form
      setSelectedMember(null);
      setCardData({
        cardNumber: "",
        issueDate: new Date().toISOString().split("T")[0],
        expiryDate: "",
        cardType: "Student",
        status: "Active",
        notes: "",
      });
      setSearchQuery("");
    } catch (error) {
      alert("Error allotting library card. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateNewCardNumber = () => {
    if (selectedMember) {
      const year = new Date().getFullYear();
      const memberNumber = selectedMember.id
        .replace("LIB", "")
        .padStart(3, "0");
      const randomSuffix = Math.random().toString().substr(2, 6);
      const newCardNumber = `${year}${memberNumber}${randomSuffix}`;
      handleInputChange("cardNumber", newCardNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                    Allot Library Card
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Issue new library cards to members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Member Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Select Member
              </h3>

              {errors.member && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {errors.member}
                    </p>
                  </div>
                </div>
              )}

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search members without cards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => handleMemberSelect(member)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedMember?.id === member.id
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.profilePhoto}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {member.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {member.id}
                        </p>
                        <p className="text-xs text-purple-600 dark:text-purple-400">
                          {member.department}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 px-2 py-1 rounded-full">
                            No Active Card
                          </span>
                          {member.previousCards.length > 0 && (
                            <span className="text-xs bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200 px-2 py-1 rounded-full">
                              {member.previousCards.length} Previous
                            </span>
                          )}
                        </div>
                      </div>
                      {selectedMember?.id === member.id && (
                        <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card Details Form */}
          <div className="lg:col-span-2">
            {selectedMember ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Selected Member Info */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Selected Member
                  </h3>
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedMember.profilePhoto}
                      alt={selectedMember.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                    />
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedMember.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedMember.email}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className="text-purple-600 dark:text-purple-400">
                          {selectedMember.department}
                        </span>
                        <span className="text-gray-500 dark:text-gray-500">
                          •
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {selectedMember.academicLevel}
                        </span>
                        <span className="text-gray-500 dark:text-gray-500">
                          •
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {selectedMember.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Information */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                    Card Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Number *
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={cardData.cardNumber}
                          onChange={(e) =>
                            handleInputChange("cardNumber", e.target.value)
                          }
                          className={`flex-1 px-4 py-3 rounded-xl border ${
                            errors.cardNumber
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-200`}
                          placeholder="Enter card number"
                        />
                        <button
                          type="button"
                          onClick={generateNewCardNumber}
                          className="px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 flex items-center space-x-2"
                        >
                          <Hash className="w-4 h-4" />
                          <span>Generate</span>
                        </button>
                      </div>
                      {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Issue Date *
                      </label>
                      <input
                        type="date"
                        value={cardData.issueDate}
                        onChange={(e) =>
                          handleInputChange("issueDate", e.target.value)
                        }
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.issueDate
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-200`}
                      />
                      {errors.issueDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.issueDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="date"
                        value={cardData.expiryDate}
                        onChange={(e) =>
                          handleInputChange("expiryDate", e.target.value)
                        }
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.expiryDate
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-200`}
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Type
                      </label>
                      <select
                        value={cardData.cardType}
                        onChange={(e) =>
                          handleInputChange("cardType", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                      >
                        {cardTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={cardData.status}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                      >
                        {cardStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Notes
                      </label>
                      <textarea
                        value={cardData.notes}
                        onChange={(e) =>
                          handleInputChange("notes", e.target.value)
                        }
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Add any notes about the card issuance..."
                      />
                    </div>
                  </div>
                </div>

                {/* Card Preview */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Card Preview
                  </h3>

                  {/* Card Visual */}
                  <div className="max-w-md mx-auto">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-white/80 text-sm font-medium">
                          SBSSU LIBRARY CARD
                        </div>
                        <CreditCard className="w-8 h-8 text-white/60" />
                      </div>

                      <div className="mb-4">
                        <div className="text-white font-mono text-lg tracking-wider">
                          {cardData.cardNumber || "•••• •••• •••• ••••"}
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-white/60 text-xs">
                            CARDHOLDER
                          </div>
                          <div className="text-white font-semibold">
                            {selectedMember.name.toUpperCase()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white/60 text-xs">
                            VALID THRU
                          </div>
                          <div className="text-white font-semibold">
                            {cardData.expiryDate
                              ? new Date(
                                  cardData.expiryDate
                                ).toLocaleDateString("en-US", {
                                  month: "2-digit",
                                  year: "2-digit",
                                })
                              : "MM/YY"}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="flex justify-between text-xs text-white/80">
                          <span>{cardData.cardType}</span>
                          <span>{selectedMember.department}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Previous Cards */}
                {selectedMember.previousCards.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
                      Previous Cards
                    </h3>

                    <div className="space-y-3">
                      {selectedMember.previousCards.map((card, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                        >
                          <div>
                            <p className="font-mono text-sm text-gray-900 dark:text-white">
                              {card.cardNumber}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {card.issueDate} - {card.expiryDate}
                            </p>
                          </div>
                          <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 rounded-full text-xs font-medium">
                            {card.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white rounded-2xl hover:from-purple-700 hover:to-purple-800 dark:hover:from-purple-600 dark:hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Allotting Card...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Allot Library Card</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="px-6 py-4 border-2 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 font-semibold flex items-center space-x-2"
                  >
                    <Printer className="w-5 h-5" />
                    <span>Print Preview</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Select a Member
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a member from the list to allot a new library card
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
