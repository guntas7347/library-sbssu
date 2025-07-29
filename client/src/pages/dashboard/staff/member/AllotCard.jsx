import React, { useState } from "react";

import SearchMembers from "../../../../components/features/dashboard/staff/member/cards/SearchMembers";
import SelectedMemberInfo from "../../../../components/features/dashboard/staff/member/allotCard/SelectedMemberInfo";
import NoData from "../../../../components/features/dashboard/staff/member/allotCard/NoData";
import CardInfo from "../../../../components/features/dashboard/staff/member/allotCard/CardInfo";
import CardPreview from "../../../../components/features/dashboard/staff/member/allotCard/CardPreview";
import PreviousCards from "../../../../components/features/dashboard/staff/member/allotCard/PreviousCards";
import PageHeader from "../../../../components/header/PageHeader";
import { TicketPlus } from "lucide-react";

const AllotCard = () => {
  const [data, setData] = useState({});

  return (
    <>
      <div className="flex flex-col gap-5">
        <PageHeader
          title="Allot Library Card"
          sub="Issue new library cards to members"
          svg={TicketPlus}
          colorClass="bg-purple-700"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:min-w-6xl min-h-96">
          <div>
            <SearchMembers onSelect={(m) => setData(m)} />
          </div>
          <div className=" lg:col-span-2 space-y-4">
            {data.id ? (
              <>
                <SelectedMemberInfo data={data} />
                <PreviousCards data={data} />
                <CardInfo />
                <CardPreview data={data} />
              </>
            ) : (
              <NoData />
            )}
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default AllotCard;
