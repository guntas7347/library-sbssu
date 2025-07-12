import React, { useState } from "react";
import PageHeader from "../../../../components/pages/dashboard/staff/pageHeader/PageHeader";
import useFeedback from "../../../../hooks/useFeedback";
import useSearchFilter from "../../../../hooks/useSearchFilter";
import server from "../../../../services/server.api";
import SearchBarMenu from "../../../../components/forms/searchBar/SearchBarMenu";
import ApplicationTable from "../../../../components/pages/dashboard/staff/applications/ApplicationTable";

const ApplicationsPage = () => {
  const setFeedback = useFeedback();
  const [data, setData] = useState([]);
  const { getQuery } = useSearchFilter();

  const handleFetch = async (e) => {
    const query = getQuery(e);
    try {
      const res = await server.application.fetchAll(query);
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
        title="Applications"
        subTitle="Review membership applications"
      />
      <SearchBarMenu
        onSearch={(e) => {
          handleFetch(e);
        }}
        menuOptions={[{ label: "Application ID", value: "applicationId" }]}
        showDefault={true}
      />
      <ApplicationTable data={data} />
    </div>
  );
};

export default ApplicationsPage;
