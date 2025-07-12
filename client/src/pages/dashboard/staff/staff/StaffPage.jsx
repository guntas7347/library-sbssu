import React, { useState } from "react";
import PageHeader from "../../../../components/pages/dashboard/staff/pageHeader/PageHeader";
import SearchBarMenu from "../../../../components/forms/searchBar/SearchBarMenu";
import StaffTable from "../../../../components/pages/dashboard/staff/staff/StaffTable";
import server from "../../../../services/server.api";
import useFeedback from "../../../../hooks/useFeedback";
import useSearchFilter from "../../../../hooks/useSearchFilter";

const StaffPage = () => {
  const setFeedback = useFeedback();
  const [data, setData] = useState([]);
  const { getQuery } = useSearchFilter();

  const handleFetch = async (e) => {
    const query = getQuery(e);
    try {
      const res = await server.staff.fetchAll(query);
      console.log(res);
      setData(res.data);
    } catch (error) {
      console.log(error);
      setFeedback(2, error);
      setData([]);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Staff"
        subTitle="Manage staff accounts and permissions"
      />
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
      <StaffTable data={data} />
    </div>
  );
};

export default StaffPage;
