import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Save } from "lucide-react";

import { useForm } from "../../../../hooks/useForm";
import useFeedback from "../../../../hooks/useFeedback";
import server from "../../../../services/server.api";

import PageHeader from "../../../../components/header/PageHeader";
import StaffInfoForm from "../../../../components/features/dashboard/staff/staff/add/StaffInfoForm";
import PermissionsCard from "../../../../components/features/dashboard/staff/staff/add/PermissionsCard";

const AddStaffPage = () => {
  const navigate = useNavigate();
  const setFeedback = useFeedback();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form state, including an empty array for rights
  const { formFields, handleChange, setFields } = useForm({
    rights: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await server.staff.create(formFields);
      setFeedback(1, "New staff member created successfully!");
      navigate("/staff/dashboard/staff");
    } catch (error) {
      setFeedback(2, error.message || "Failed to create staff member.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PageHeader
        title="Add New Staff"
        svg={UserPlus}
        sub="Create a new staff profile with specific system permissions"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <StaffInfoForm formFields={formFields} handleChange={handleChange} />
        </div>
        <div className="lg:col-span-1">
          <PermissionsCard formFields={formFields} setFields={setFields} />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          <span>{isSubmitting ? "Saving..." : "Save New Staff"}</span>
        </button>
      </div>
    </form>
  );
};

export default AddStaffPage;
