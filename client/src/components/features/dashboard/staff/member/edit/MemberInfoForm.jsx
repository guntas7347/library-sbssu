import { User, GraduationCap, Home } from "lucide-react";
import Input from "../../../../../forms/input/Input-2";
import Select from "../../../../../forms/select/Select";
import TextArea from "../../../../../forms/input/TextArea";
import usePrograms from "../../../../../../hooks/usePrograms"; // Import the custom hook
import { formatDateForInput } from "../../../../../../utils/functions";

const MemberInfoForm = ({ formFields = {}, handleChange = () => {} }) => {
  // Call the hook to get dynamic options for the select inputs
  const { programs, specializations, batchYears, memberTypes } = usePrograms({
    formFields,
    handleChange,
  });

  // Helper to format date for the input field

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 space-y-8">
      {/* Personal Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
          Personal Information
        </h3>
        <div className="grid md:grid-cols-3 gap-5">
          <Input
            label="Full Name"
            name="fullName"
            value={formFields.fullName || ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Father's Name"
            name="fatherName"
            value={formFields.fatherName || ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formFields.email || ""}
            onChange={handleChange}
            required
          />
          <Input
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formFields.phoneNumber || ""}
            onChange={handleChange}
          />
          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            value={formatDateForInput(formFields.dob)}
            onChange={handleChange}
          />
          <Select
            label="Cast"
            name="cast"
            options={["general", "sc", "st", "obc"]}
            value={formFields.cast || "general"}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Academic Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
          Academic Information
        </h3>
        <div className="grid md:grid-cols-3 gap-5">
          <Input
            label="Roll Number"
            name="rollNumber"
            value={formFields.rollNumber || ""}
            onChange={handleChange}
          />
          <Select
            label="Academic Level"
            name="memberType"
            options={memberTypes} // Use dynamic options from the hook
            value={formFields.memberType || ""}
            onChange={handleChange}
          />
          <Select
            label="Degree/Diploma"
            name="program"
            options={programs()} // Use dynamic options from the hook
            value={formFields.program || ""}
            onChange={handleChange}
          />
          <Select
            label="Specialization"
            name="specialization"
            options={specializations()} // Use dynamic options from the hook
            value={formFields.specialization || ""}
            onChange={handleChange}
          />
          <Select
            label="Batch (Year)"
            name="batch"
            options={batchYears} // Use dynamic options from the hook
            value={formFields.batch || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Address Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Home className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
          Address Information
        </h3>
        <div className="grid md:grid-cols-3 gap-5">
          <Input
            label="Street Address"
            name="streetAddress"
            required
            onChange={handleChange}
            value={formFields.streetAddress || ""}
          />
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
    </div>
  );
};

export default MemberInfoForm;
