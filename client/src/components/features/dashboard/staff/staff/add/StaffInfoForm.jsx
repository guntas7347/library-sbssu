import { User, Briefcase } from "lucide-react";
import Input from "../../../../../forms/input/Input-2";
import Select from "../../../../../forms/select/Select";

const StaffInfoForm = ({ handleChange, formFields }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border p-6">
      <div className="space-y-6">
        {/* Personal Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Personal & Auth Information
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              name="fullName"
              value={formFields.fullName}
              onChange={handleChange}
              required
            />
            <Input
              label="Username"
              name="username"
              value={formFields.username}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formFields.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={formFields.phoneNumber}
              onChange={handleChange}
            />
            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formFields.dateOfBirth}
              onChange={handleChange}
            />
            <Select
              label="Gender"
              name="gender"
              options={["male", "female", "other"]}
              value={formFields.gender}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Employment Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
            Employment Information
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="ID Number"
              name="idNumber"
              type="number"
              value={formFields.idNumber}
              onChange={handleChange}
              required
            />
            <Input
              label="Employee ID"
              name="employeeId"
              value={formFields.employeeId}
              onChange={handleChange}
            />
            <Input
              label="Department"
              name="department"
              value={formFields.department}
              onChange={handleChange}
            />
            <Input
              label="Designation"
              name="designation"
              value={formFields.designation}
              onChange={handleChange}
            />
            <Input
              label="Joining Date"
              name="joiningDate"
              type="date"
              value={formFields.joiningDate}
              onChange={handleChange}
            />
            <Select
              label="Status"
              name="employmentStatus"
              options={["Active", "Inactive", "On Leave"]}
              value={formFields.employmentStatus}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffInfoForm;
