import { Phone, Mail, MapPin, Shield, User } from "lucide-react";
import InfoField from "../../../../forms/infoField/InfoField ";

const ContactInformation = ({ data }) => {
  if (!data) return null;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border p-8">
      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <User className="w-6 h-6 mr-3 text-green-600" />
        Contact & Personal Info
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InfoField label="Email Address" value={data?.email} icon={Mail} />
        <InfoField
          label="Phone Number"
          value={data?.phoneNumber}
          icon={Phone}
        />
        <InfoField label="Address" value={data?.address} icon={MapPin} />
        <InfoField
          label="Emergency Contact"
          value={data?.emergencyContact}
          icon={Shield}
        />
        <InfoField
          label="Date of Birth"
          value={
            data?.dateOfBirth
              ? new Date(data.dateOfBirth).toLocaleDateString()
              : "N/A"
          }
        />
        <InfoField label="Gender" value={data?.gender} isCapitalized />
      </div>
    </div>
  );
};

export default ContactInformation;
