"use client";

import React, { useState } from "react";
import {
  Check,
  CircleUserRound,
  GraduationCap,
  ArrowLeft,
  School,
  User,
  FormInput,
  UploadCloud,
} from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { testKohaConnection } from "@/lib/koha/kohaFetch";
import { createApplication } from "@/lib/firebase/applications";
import ImageUploader from "@/components/ImageUploader";

// --- Sample Data ---
const SAMPLE_MEMBER_TYPES = ["Student", "Faculty", "Staff", "Alumni"];
const SAMPLE_COURSES = ["B.Tech", "M.Tech", "BCA", "MCA", "Ph.D", "Diploma"];
const SAMPLE_BRANCHES = [
  "Computer Science",
  "Mechanical",
  "Civil",
  "Electronics",
  "Information Technology",
];
const SAMPLE_BATCH_YEARS = ["2023", "2024", "2025", "2026", "2027", "2028"];
const SAMPLE_GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

const JoinPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const totalSteps = 3;

  const testConnection = async () => {
    console.log(await testKohaConnection());
  };

  // Initialize the improved hook
  const { formFields, handleChange, setFields } = useForm({
    fullName: "",
    fatherName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
    rollNumber: "",
    memberType: "",
    course: "",
    branch: "",
    batch: "",
    expectedGraduationYear: "",
    photo: null,
    subscribeToUpdates: false,
  });

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If not on the last step, just go to the next step
    if (currentStep !== totalSteps) {
      nextStep();
      return;
    }

    // Final Validation Example
    if (!formFields.photo) {
      alert("Please upload your profile photo before submitting.");
      setCurrentStep(1); // Jump back to step 1
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createApplication(formFields);
      alert(
        `Application submitted! Your temporary ID is ${result.applicationId}`,
      );
      //   resetFormFields();
      setCurrentStep(1);
    } catch (error) {
      alert(
        "There was an error submitting your application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-12">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-blue-600 rounded-full mb-4 shadow-lg">
            <FormInput className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            New Member Registration
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Join our library by filling out the form below
          </p>
        </div>

        <button className="btn-primary" onClick={testConnection}>
          Test Connection
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 sm:p-10 lg:p-12">
            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold text-blue-700 dark:text-blue-400">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {currentStep === 1
                    ? "Personal"
                    : currentStep === 2
                      ? "Academic"
                      : "Review"}
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* STEP 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <h3 className="section-header">
                    <CircleUserRound className="w-7 h-7 mr-3 text-blue-600 dark:text-blue-400" />
                    Personal Information
                  </h3>

                  {/* Smart File Uploader */}
                  <ImageUploader
                    onUpload={({ fileName, previewUrl }) => {
                      setFields({ ...formFields, photo: fileName });
                      setPreviewUrl(previewUrl);
                    }}
                    defaultImage={previewUrl}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        name="fullName"
                        required
                        onChange={handleChange}
                        value={formFields.fullName}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Father's Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        name="fatherName"
                        required
                        onChange={handleChange}
                        value={formFields.fatherName}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-input"
                        name="email"
                        required
                        onChange={handleChange}
                        value={formFields.email}
                      />
                    </div>

                    {/* Phone Number uses setFields directly to enforce numeric masking */}
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-input"
                        name="phoneNumber"
                        required
                        onChange={(e) =>
                          setFields({
                            phoneNumber: e.target.value
                              .replace(/[^0-9]/g, "")
                              .slice(0, 10),
                          })
                        }
                        value={formFields.phoneNumber}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Date of Birth *</label>
                      <input
                        type="date"
                        className="form-input"
                        name="dob"
                        required
                        onChange={handleChange}
                        value={formFields.dob}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Gender *</label>
                      <select
                        className="form-select"
                        name="gender"
                        required
                        onChange={handleChange}
                        value={formFields.gender}
                      >
                        <option value="">Select Gender</option>
                        {SAMPLE_GENDERS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group pt-4">
                    <label className="form-label">Street Address *</label>
                    <input
                      type="text"
                      className="form-input"
                      name="streetAddress"
                      required
                      onChange={handleChange}
                      value={formFields.streetAddress}
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        className="form-input"
                        name="city"
                        required
                        onChange={handleChange}
                        value={formFields.city}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State *</label>
                      <input
                        type="text"
                        className="form-input"
                        name="state"
                        required
                        onChange={handleChange}
                        value={formFields.state}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pin Code *</label>
                      <input
                        type="text"
                        className="form-input"
                        name="pinCode"
                        required
                        onChange={handleChange}
                        value={formFields.pinCode}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Academic Information */}
              {currentStep === 2 && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <h3 className="section-header">
                    <GraduationCap className="w-7 h-7 mr-3 text-green-600 dark:text-green-400" />
                    Academic Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="form-label">Roll Number</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Permanent only"
                        name="rollNumber"
                        onChange={handleChange}
                        value={formFields.rollNumber}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Academic Level *</label>
                      <select
                        className="form-select"
                        name="memberType"
                        required
                        onChange={handleChange}
                        value={formFields.memberType}
                      >
                        <option value="">Select Level</option>
                        {SAMPLE_MEMBER_TYPES.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Course *</label>
                      <select
                        className="form-select"
                        name="course"
                        required
                        onChange={handleChange}
                        value={formFields.course}
                      >
                        <option value="">Select Course</option>
                        {SAMPLE_COURSES.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Branch *</label>
                      <select
                        className="form-select"
                        name="branch"
                        required
                        onChange={handleChange}
                        value={formFields.branch}
                      >
                        <option value="">Select Branch</option>
                        {SAMPLE_BRANCHES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Batch *</label>
                      <select
                        className="form-select"
                        name="batch"
                        required
                        onChange={handleChange}
                        value={formFields.batch}
                      >
                        <option value="">Select Batch Year</option>
                        {SAMPLE_BATCH_YEARS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Expected Graduation Year *
                      </label>
                      <select
                        className="form-select"
                        name="expectedGraduationYear"
                        required
                        onChange={handleChange}
                        value={formFields.expectedGraduationYear}
                      >
                        <option value="">Select Graduation Year</option>
                        {[2026, 2027, 2028, 2029, 2030].map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="section-header border-none mb-0">
                    <Check className="w-7 h-7 mr-3 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <h3 className="text-xl font-bold">
                        Review Your Application
                      </h3>
                      <p className="text-sm font-normal text-gray-500 dark:text-gray-400 mt-1">
                        Please verify all details before final submission.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="review-card">
                      <h4 className="font-bold text-lg mb-4 flex items-center text-gray-800 dark:text-gray-200">
                        <User className="w-5 h-5 mr-2 text-blue-500" /> Personal
                      </h4>
                      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                          <span className="font-semibold">Name:</span>{" "}
                          <span>{formFields.fullName || "—"}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                          <span className="font-semibold">Email:</span>{" "}
                          <span>{formFields.email || "—"}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                          <span className="font-semibold">Phone:</span>{" "}
                          <span>{formFields.phoneNumber || "—"}</span>
                        </div>
                        <div className="flex justify-between pb-2">
                          <span className="font-semibold">Photo Attached:</span>{" "}
                          <span>{formFields.photo ? "Yes" : "No"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="review-card">
                      <h4 className="font-bold text-lg mb-4 flex items-center text-gray-800 dark:text-gray-200">
                        <School className="w-5 h-5 mr-2 text-green-500" />{" "}
                        Academic
                      </h4>
                      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                          <span className="font-semibold">Level:</span>{" "}
                          <span>{formFields.memberType || "—"}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                          <span className="font-semibold">Course:</span>{" "}
                          <span>{formFields.course || "—"}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                          <span className="font-semibold">Branch:</span>{" "}
                          <span>{formFields.branch || "—"}</span>
                        </div>
                        <div className="flex justify-between pb-2">
                          <span className="font-semibold">Batch:</span>{" "}
                          <span>{formFields.batch || "—"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Smart Checkbox Example */}
                  <div className="mt-6 flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <input
                      type="checkbox"
                      name="subscribeToUpdates"
                      id="subscribeToUpdates"
                      className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                      onChange={handleChange}
                      checked={formFields.subscribeToUpdates}
                    />
                    <label
                      htmlFor="subscribeToUpdates"
                      className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                      I agree to the library Terms of Service and wish to
                      receive updates.
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary"
                    >
                      <ArrowLeft className="mr-2 w-5 h-5" /> Back
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
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
