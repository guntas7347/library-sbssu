import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, Save } from "lucide-react";

import { useForm } from "../../../../hooks/useForm";
import useFeedback from "../../../../hooks/useFeedback";
import server from "../../../../services/server.api";

import PageHeader from "../../../../components/header/PageHeader";
import Spinner from "../../../../components/feedback/spinner/Spinner";
import MemberInfoForm from "../../../../components/features/dashboard/staff/member/edit/MemberInfoForm";

const EditMemberPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const setFeedback = useFeedback();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formFields, handleChange, setFields } = useForm({});

  // Fetch existing member data when the component mounts
  useEffect(() => {
    if (!id) {
      navigate("/staff/dashboard/members"); // Redirect if no ID
      return;
    }

    const fetchMemberData = async () => {
      try {
        // Assuming an API endpoint like this exists
        const res = await server.member.fetchForEdit(id);
        setFields(res.data);
      } catch (error) {
        setFeedback(2, error);
        navigate("/staff/dashboard/members");
      } finally {
        setLoading(false);
      }
    };
    fetchMemberData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await server.member.update({ id, ...formFields });
      setFeedback(1, res);
      // navigate(`/staff/dashboard/members/${id}`); // Redirect to member profile on success
    } catch (error) {
      setFeedback(2, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Spinner solo message="Loading member data..." />;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PageHeader
        title="Edit Member"
        svg={User}
        sub={`Updating profile for ${formFields?.fullName || "member"}`}
      />

      <MemberInfoForm formFields={formFields} handleChange={handleChange} />

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
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

export default EditMemberPage;
