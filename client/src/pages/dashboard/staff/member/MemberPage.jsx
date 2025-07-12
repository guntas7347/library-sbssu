import React, { useState } from "react";
import useSearchFilter from "../../../../hooks/useSearchFilter";
import useFeedback from "../../../../hooks/useFeedback";
import server from "../../../../services/server.api";
import PageHeader from "../../../../components/pages/dashboard/staff/pageHeader/PageHeader";
import SearchBarMenu from "../../../../components/forms/searchBar/SearchBarMenu";
import MemberTable from "../../../../components/pages/dashboard/staff/member/MemberTable";

const MemberPage = () => {
  const setFeedback = useFeedback();
  const [data, setData] = useState([]);
  const { getQuery } = useSearchFilter();

  const handleFetch = async (e) => {
    const query = getQuery(e);
    try {
      const res = await server.member.fetchAll(query);
      console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
      setFeedback(2, error);
      setData([]);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Member" subTitle="Search and manage library members" />
      <SearchBarMenu
        onSearch={(e) => {
          handleFetch(e);
        }}
        menuOptions={[
          { label: "Name", value: "fullName" },
          { label: "ID Number", value: "idNumber" },
        ]}
        showDefault={true}
      />
      <MemberTable data={data} />
    </div>
  );
};

export default MemberPage;
