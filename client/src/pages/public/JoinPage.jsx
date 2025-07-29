import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  CircleUserRound,
  GraduationCap,
  Rocket,
  ArrowLeft,
  School,
  User,
  FormInput,
} from "lucide-react";

import { useForm } from "../../hooks/useForm";
import useFeedback from "../../hooks/useFeedback";
import usePrograms from "../../hooks/usePrograms";
import server from "../../services/server.api";
import { autofillTestData } from "../../utils/functions";

import Input from "../../components/forms/input/Input-2";
import Select from "../../components/forms/select/Select";
import ProfilePhotoUploader from "../../components/features/public/join/ProfilePhotoUploader";
import Header from "../../components/features/public/join/Header";
import TermsOfService from "../../components/features/public/join/TermsOfService";
import PageHeader from "../../components/header/PageHeader";

// Step 1: Personal Information Component
const PersonalInfoStep = ({ formFields, handleChange, setFields }) => (
  <div className="space-y-6">
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <CircleUserRound className="size-8 mr-2 text-blue-600 dark:text-blue-400" />
        Personal Information
      </h3>
    </div>
    <ProfilePhotoUploader
      onUpload={(path) => setFields({ photo: path })}
      currentImage={formFields.photo}
    />
    <div className="grid md:grid-cols-2 gap-5">
      <Input
        label="Full Name"
        name="fullName"
        required
        onChange={handleChange}
        value={formFields.fullName || ""}
      />
      <Input
        label="Father's Name"
        name="fatherName"
        required
        onChange={handleChange}
        value={formFields.fatherName || ""}
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        required
        onChange={handleChange}
        value={formFields.email || ""}
      />
      <Input
        label="Phone Number"
        type="tel"
        name="phoneNumber"
        required
        onChange={(e) =>
          setFields({
            phoneNumber: e.target.value.replace(/[^0-9]/g, "").slice(0, 10),
          })
        }
        value={formFields.phoneNumber || ""}
      />
      <Input
        label="Date of Birth"
        name="dob"
        type="date"
        required
        onChange={handleChange}
        value={formFields.dob || ""}
      />
      <Select
        label="Gender"
        options={["Male", "Female", "Other"]}
        name="gender"
        required
        onChange={handleChange}
        value={formFields.gender || ""}
      />
      <Select
        label="Caste"
        options={["General", "SC/ST", "Other"]}
        name="cast"
        required
        onChange={handleChange}
        value={formFields.cast || ""}
      />
    </div>
    <Input
      label="Street Address"
      name="streetAddress"
      required
      onChange={handleChange}
      value={formFields.streetAddress || ""}
    />
    <div className="grid md:grid-cols-3 gap-5">
      <Input
        label="City"
        name="city"
        required
        onChange={handleChange}
        value={formFields.city || ""}
      />
      <Input
        label="State"
        name="state"
        required
        onChange={handleChange}
        value={formFields.state || ""}
      />
      <Input
        label="Pin Code"
        name="pinCode"
        required
        onChange={handleChange}
        value={formFields.pinCode || ""}
      />
    </div>
  </div>
);

// Step 2: Academic Information Component
const AcademicInfoStep = ({
  formFields,
  handleChange,
  programs,
  specializations,
  batchYears,
  memberTypes,
}) => (
  <div className="space-y-6">
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <GraduationCap className="size-8 mr-2 text-green-600 dark:text-green-400" />
        Academic Information
      </h3>
    </div>
    <div className="grid md:grid-cols-2 gap-5">
      <Input
        label="Roll Number"
        placeholder="Permanent only"
        name="rollNumber"
        onChange={handleChange}
        value={formFields.rollNumber || ""}
      />
      <Select
        label="Academic Level"
        name="memberType"
        options={memberTypes}
        onChange={handleChange}
        snakeCase
        value={formFields.memberType || ""}
      />
      <Select
        label="Degree/Diploma"
        name="program"
        options={programs()}
        onChange={handleChange}
        snakeCase
        value={formFields.program || ""}
      />
      <Select
        label="Specialization"
        name="specialization"
        options={specializations()}
        onChange={handleChange}
        snakeCase
        value={formFields.specialization || ""}
      />
      <Select
        label="Batch"
        name="batch"
        options={batchYears}
        onChange={handleChange}
        value={formFields.batch || ""}
      />
    </div>
  </div>
);

// Step 3: Review Component
const ReviewStep = ({ formFields }) => (
  <div className="space-y-6">
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Check className="size-8 mr-2 text-emerald-600 dark:text-emerald-400" />
        Review Your Application
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Please review all the information carefully before submitting.
      </p>
    </div>
    {/* Personal Details */}
    <div className="p-4 border rounded-xl">
      <h4 className="font-semibold mb-2 flex items-center">
        <User className="w-4 h-4 mr-2" />
        Personal
      </h4>
      <div className="text-sm space-y-1">
        <p>
          <strong>Name:</strong> {formFields.fullName}
        </p>
        <p>
          <strong>Email:</strong> {formFields.email}
        </p>
        <p>
          <strong>Phone:</strong> {formFields.phoneNumber}
        </p>
      </div>
    </div>
    {/* Academic Details */}
    <div className="p-4 border rounded-xl">
      <h4 className="font-semibold mb-2 flex items-center">
        <School className="w-4 h-4 mr-2" />
        Academic
      </h4>
      <div className="text-sm space-y-1">
        <p>
          <strong>Level:</strong> {formFields.memberType}
        </p>
        <p>
          <strong>Program:</strong> {formFields.program}
        </p>
        <p>
          <strong>Specialization:</strong> {formFields.specialization}
        </p>
        <p>
          <strong>Batch:</strong> {formFields.batch}
        </p>
      </div>
    </div>
  </div>
);

const JoinPage = () => {
  const setFeedback = useFeedback();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { formFields, handleChange, setFields } = useForm({});

  const { programs, specializations, batchYears, memberTypes } = usePrograms({
    formFields,
    handleChange,
  });

  const totalSteps = 3;

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!formFields.photo) {
      setFeedback(2, "Please upload your profile photo.");
      setCurrentStep(1); // Go back to the first step
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await server.application.create(formFields);
      setFeedback(1, res);
      navigate("/join/applied");
    } catch (error) {
      setFeedback(2, error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="New Member Registration"
          sub="Join our library by filling out the form below"
          svg={FormInput}
          colorClass="bg-blue-700"
        />

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (currentStep === totalSteps) {
                  handleSubmit();
                } else {
                  nextStep();
                }
              }}
            >
              {currentStep === 1 && (
                <PersonalInfoStep
                  formFields={formFields}
                  handleChange={handleChange}
                  setFields={setFields}
                />
              )}
              {currentStep === 2 && (
                <AcademicInfoStep
                  formFields={formFields}
                  handleChange={handleChange}
                  programs={programs}
                  specializations={specializations}
                  batchYears={batchYears}
                  memberTypes={memberTypes}
                />
              )}
              {currentStep === 3 && <ReviewStep formFields={formFields} />}

              {currentStep === 3 && (
                <TermsOfService
                  onChange={(bool) => setFields({ subscribeToUpdates: bool })}
                />
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between items-center">
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition font-semibold flex items-center"
                    >
                      <ArrowLeft className="mr-2 size-5" />
                      Back
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === totalSteps
                    ? isSubmitting
                      ? "Submitting..."
                      : "Complete Registration"
                    : "Next Step"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JoinPage;
