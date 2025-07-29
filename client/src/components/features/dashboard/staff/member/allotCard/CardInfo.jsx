import React from "react";
import Input from "../../../../../forms/input/Input-2";
import { CreditCard } from "lucide-react";
import Select from "../../../../../forms/select/Select";

const CardInfo = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <CreditCard className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
        Card Information
      </h3>

      <div className="grid gap-y-4">
        <Input label="Card Number" />
        <div className="grid grid-cols-2 gap-5">
          <Input label="Expiry Date" type="month" />
          <Select label="Card Type" options={[{ label: "General" }]} />
        </div>
        <Input label="Notes" />
      </div>
    </div>
  );
};

export default CardInfo;
