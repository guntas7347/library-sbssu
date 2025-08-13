import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookA, Save } from "lucide-react";

import PageHeader from "../../../../components/header/PageHeader";
import BasicInfoForm from "../../../../components/features/dashboard/staff/book/cards/BasicInfoForm";
import EditAccessionsField from "../../../../components/features/dashboard/staff/book/cards/EditAccessionsField";
import AccessionsField from "../../../../components/features/dashboard/staff/book/cards/AccessionsField"; // The "add" component
import TagsForm from "../../../../components/forms/tags/TagsForm";
import LocationPhysicalDetails from "../../../../components/features/dashboard/staff/book/cards/LocationPhysicalDetails";

import server from "../../../../services/server.api";
import useFeedback from "../../../../hooks/useFeedback";
import { useForm } from "../../../../hooks/useForm";
import EditConfirmation from "../../../../components/features/dashboard/staff/book/edit/EditConfirmation";
import useAlert from "../../../../hooks/useAlert";

const EditBook = () => {
  const { id } = useParams();
  const setFeedback = useFeedback();
  const [loading, setLoading] = useState(true);
  const { showAlert, closeAlert, openAlert } = useAlert();

  // The form state includes a separate array for new accessions
  const { formFields, handleChange, setFields, setFormFields } = useForm({
    newAccessions: [{ accessionNumber: "", category: "", condition: "" }],
  });

  const navigate = useNavigate();

  // --- DATA FETCHING ---
  useEffect(() => {
    if (!id) {
      setFeedback(2, "No book ID provided.");
      setLoading(false);
      return;
    }
    const fetchBook = async () => {
      try {
        const res = await server.book.fetch(id);
        setFormFields(res.data);
      } catch (error) {
        setFeedback(2, error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // --- LOGIC FOR MANAGING EXISTING ACCESSIONS ---
  const handleExistingAccessionsChange = (index, field, value) => {
    const updatedAccessions = [...(formFields.accessions || [])];
    updatedAccessions[index] = { ...updatedAccessions[index], [field]: value };
    setFields({ accessions: updatedAccessions });
  };

  // --- LOGIC FOR MANAGING NEW ACCESSIONS ---
  const handleNewAccessionsChange = (index, field, value) => {
    const updatedAccessions = [...(formFields.newAccessions || [])];
    updatedAccessions[index] = { ...updatedAccessions[index], [field]: value };
    setFields({ newAccessions: updatedAccessions });
  };

  const addNewAccession = () => {
    setFields({
      newAccessions: [
        ...(formFields.newAccessions || []),
        { accessionNumber: "", category: "", condition: "" },
      ],
    });
  };

  const removeNewAccession = (index) => {
    if (formFields.newAccessions && formFields.newAccessions.length > 1) {
      const updated = formFields.newAccessions.filter((_, i) => i !== index);
      setFields({ newAccessions: updated });
    }
  };

  // --- SUBMISSION LOGIC ---
  const handleUpdate = async () => {
    try {
      const res = await server.book.update({ id, ...formFields });
      setFeedback(1, res);
      navigate(`/staff/dashboard/books/${id}`);
    } catch (error) {
      setFeedback(2, error);
    }
  };

  if (loading) return <div>Loading book details...</div>;

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Edit book"
        sub={`Editing: ${formFields.title || "..."}`}
        svg={BookA}
        colorClass="bg-green-700"
      />
      <form
        className="grid lg:grid-cols-2 gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          openAlert();
        }}
      >
        {/* --- LEFT COLUMN --- */}
        <div className="space-y-4">
          <BasicInfoForm formFields={formFields} onChange={handleChange} />
          <TagsForm
            value={formFields.tags || []}
            onChange={(newTags) => setFields({ tags: newTags })}
          />
          <LocationPhysicalDetails
            formFields={formFields}
            onChange={handleChange}
          />
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="space-y-4">
          <button
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-semibold text-lg shadow-xl flex items-center justify-center space-x-3"
          >
            <Save className="w-5 h-5" />
            <span>Save All Changes</span>
          </button>

          {/* Component for EDITING existing accessions */}
          <EditAccessionsField
            accessions={formFields.accessions || []}
            onAccessionChange={handleExistingAccessionsChange}
          />

          {/* Component for ADDING new accessions */}
          <AccessionsField
            accessions={formFields.newAccessions || []}
            onAccessionChange={handleNewAccessionsChange}
            onAddAccession={addNewAccession}
            onRemoveAccession={removeNewAccession}
          />
        </div>
      </form>
      <EditConfirmation
        show={showAlert}
        data={formFields}
        onYes={handleUpdate}
        onClose={closeAlert}
      />
    </div>
  );
};

export default EditBook;
