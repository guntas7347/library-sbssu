import React, { useEffect, useState } from "react";
import PageHeader from "../../../../components/header/PageHeader";
import { Currency } from "lucide-react";
import FormCard from "../../../../components/features/dashboard/staff/transaction/add/FormCard";
import SearchMembers from "../../../../components/features/dashboard/staff/member/cards/SearchMembers";

const AddTransaction = () => {
  const [member, setMember] = useState(null);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Add Transaction"
        sub="add transaction manually"
        svg={Currency}
        colorClass="bg-purple-700"
      />
      <div className="grid grid-cols-3 gap-2">
        <SearchMembers onSelect={(member) => setMember(member)} />
        <div className="col-span-2">
          <FormCard member={member} />
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
