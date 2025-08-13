import React, { useState, useEffect } from "react";
import { TicketPlus } from "lucide-react";
import server from "../../../../services/server.api";
import useFeedback from "../../../../hooks/useFeedback";
import { useForm } from "../../../../hooks/useForm";
import { useParams } from "react-router-dom";
import PageHeader from "../../../../components/header/PageHeader";
import NoData from "../../../../components/features/dashboard/staff/member/allotCard/NoData";
import CardInfo from "../../../../components/features/dashboard/staff/member/allotCard/CardInfo";
import CardPreview from "../../../../components/features/dashboard/staff/member/allotCard/CardPreview";
import PreviousCards from "../../../../components/features/dashboard/staff/member/allotCard/PreviousCards";
import Spinner from "../../../../components/feedback/spinner/Spinner";
import SelectedMemberInfo from "../../../../components/features/dashboard/staff/member/allotCard/SelectedMemberInfo";

const AllotCard = () => {
  const setFeedback = useFeedback();

  const { formFields, setFields, setFormFields } = useForm({});

  const { id } = useParams();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await server.member.fetchForAllot(id);
        setData(res.data);
        setFormFields(res.data);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
      }
    })();
  }, [loading]);

  const handleAllotSuccess = () => {
    setLoading(true);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Allot Library Card"
        sub="Issue new library cards to members"
        svg={TicketPlus}
        colorClass="bg-purple-700"
      />
      <div className="">
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <Spinner message="Fetching member details..." />
          ) : data ? (
            <>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-5">
                  <SelectedMemberInfo data={data} />
                  <CardInfo
                    data={data}
                    formFields={formFields}
                    setFields={setFields}
                  />
                </div>
                <div className="space-y-5">
                  <PreviousCards data={data} />
                  <CardPreview
                    data={data}
                    cardDetails={formFields}
                    onSuccess={handleAllotSuccess}
                  />
                </div>
              </div>
            </>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllotCard;
