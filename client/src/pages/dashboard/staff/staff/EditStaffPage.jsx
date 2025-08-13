import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, Save } from "lucide-react";

import { useForm } from "../../../../hooks/useForm";
import useFeedback from "../../../../hooks/useFeedback";
import server from "../../../../services/server.api";

import PageHeader from "../../../../components/header/PageHeader";
import Spinner from "../../../../components/feedback/spinner/Spinner";
import StaffInfoForm from "../../../../components/features/dashboard/staff/staff/add/StaffInfoForm";
import PermissionsCard from "../../../../components/features/dashboard/staff/staff/add/PermissionsCard";

const EditStaffPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const setFeedback = useFeedback();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formFields, handleChange, setFields } = useForm({});

  // Fetch existing staff data when the component mounts
  useEffect(() => {
    if (!id) {
      navigate("/staff/dashboard/staff");
      return;
    }

    const fetchStaffData = async () => {
      try {
        const res = await server.staff.fetchForEdit(id);
        setFields(res.data);
      } catch (error) {
        setFeedback(2, error);
        navigate("/staff/dashboard/staff");
      } finally {
        setLoading(false);
      }
    };
    fetchStaffData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await server.staff.update({ id, ...formFields });
      setFeedback(1, res);
      navigate(`/staff/dashboard/staff/${id}`);
    } catch (error) {
      setFeedback(2, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Spinner solo message="Loading staff data..." />;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PageHeader
        title="Edit Staff"
        svg={User}
        sub={`Updating profile for ${formFields?.fullName || "staff member"}`}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* The form is pre-populated via the `formFields` prop */}
          <StaffInfoForm
            formFields={formFields}
            handleChange={handleChange}
            isEditMode={true}
          />
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
          <span>{isSubmitting ? "Saving Changes..." : "Save Changes"}</span>
        </button>
      </div>
    </form>
  );
};

export default EditStaffPage;
