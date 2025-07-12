import { useNavigate } from "react-router-dom";
import Input from "../../components/forms/input/Input-2";
import Select from "../../components/forms/select/Select";
import ProfilePhotoUploader from "../../components/pages/public/join/ProfilePhotoUploader";
import HeroSection from "../../components/pages/public/join/HeroSection";
import DocumentUpload from "../../components/pages/public/join/DocumentUpload";
import HelpSection from "../../components/pages/public/footer/HelpSection";
import { Check, CircleUserRound, GraduationCap, Rocket } from "lucide-react";
import Header from "../../components/pages/public/join/Header";
import TermsOfService from "../../components/pages/public/join/TermsOfService";
import { useForm } from "../../hooks/useForm";
import useFeedback from "../../hooks/useFeedback";
import usePrograms from "../../hooks/usePrograms";
import { useState } from "react";
import server from "../../services/server.api";
import { autofillTestData, memberTypeOptions } from "../../utils/functions";

const JoinPage = () => {
  const setFeedback = useFeedback();
  const navigate = useNavigate();
  const [btn, setBtn] = useState(true);
  const { formFields, handleChange, setFields } = useForm();

  const { programs, specializations, batchYears } = usePrograms({
    formFields,
    handleChange,
  });

  const handleSubmit = async () => {
    if (
      formFields.imageUrl === null ||
      !formFields.imageUrl ||
      formFields.imageUrl === ""
    ) {
      alert("Please upload your image.");
      return;
    }
    console.log("it", btn);
    setBtn(false);
    if (!btn) return;

    try {
      const res = await server.application.create(formFields);
      setFeedback(1, res);
      navigate("/join/applied");
    } catch (error) {
      setFeedback(2, error);
      setBtn(true);
    }
    console.log(formFields);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-all duration-300">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            {" "}
            <button
              className="flex gap-5 text-blue-400 border p-3 rounded hover:bg-blue-300 hover:text-white"
              onClick={() => {
                autofillTestData(setFields, programs, specializations);
                handleSubmit();
              }}
            >
              Autofill
              <Rocket />
            </button>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <ProfilePhotoUploader
                onUpload={(e) => setFields({ imageUrl: e })}
              />

              {/* Personal Information */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <CircleUserRound className="size-8 mr-2 text-blue-600 dark:text-blue-400" />
                    Personal Information
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    name="fullName"
                    required={false}
                    onChange={handleChange}
                  />
                  <Input
                    label="Father's Name"
                    placeholder="Enter your father's name"
                    name="fatherName"
                    required={false}
                    onChange={handleChange}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    required={false}
                    onChange={handleChange}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phoneNumber"
                    placeholder="9876543210"
                    required={false}
                    onChange={handleChange}
                  />
                  <Input
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    required={false}
                    onChange={handleChange}
                  />
                  <Select
                    label="Gender"
                    options={["Male", "Female", "Other"]}
                    name="gender"
                    required={false}
                    onChange={handleChange}
                  />
                  <Select
                    label="Category"
                    options={["General", "SC/ST", "Other"]}
                    name="category"
                    required={false}
                    onChange={handleChange}
                  />
                </div>
                <Input
                  label="Street Address"
                  placeholder="123 Main Street"
                  required={false}
                  name="streetAddress"
                  onChange={handleChange}
                />
                <div className="grid md:grid-cols-3 gap-5">
                  <Input
                    label="City"
                    placeholder="City"
                    required={false}
                    name="city"
                    onChange={handleChange}
                  />
                  <Input
                    label="State"
                    placeholder="State"
                    required={false}
                    name="state"
                    onChange={handleChange}
                  />
                  <Input
                    label="Pin Code"
                    placeholder="12345"
                    required={false}
                    name="pinCode"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Academic Information */}
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
                    placeholder="Permenent only"
                    name="rollNumber"
                    onChange={handleChange}
                  />
                  <Select
                    label="Academic Level"
                    name="memberType"
                    options={memberTypeOptions}
                    onChange={handleChange}
                  />
                  <Select
                    label="Degree/Diploma"
                    name="program"
                    options={programs()}
                    onChange={handleChange}
                  />
                  <Select
                    label="Specialization"
                    name="specialization"
                    options={specializations()}
                    onChange={handleChange}
                  />
                  <Select
                    label="Batch"
                    name="batch"
                    options={batchYears}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* <DocumentUpload /> */}

              <TermsOfService
                onChange={(e) => setFields({ subscribeToUpdates: e })}
              />
              <button
                type="submit"
                // disabled={btn}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                <Check className="mr-3 size-5" />
                Complete Registration
              </button>
            </form>
          </div>
        </div>

        <HelpSection />
      </main>
    </div>
  );
};

export default JoinPage;
