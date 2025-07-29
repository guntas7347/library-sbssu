import { useState } from "react";
import useFeedback from "../../../../hooks/useFeedback";
import useSearchFilter from "../../../../hooks/useSearchFilter";
import server from "../../../../services/server.api";
import ApplicationTable from "../../../../components/features/dashboard/staff/applications/ApplicationTable";
import PageHeader from "../../../../components/header/PageHeader";
import { FileText } from "lucide-react";
import SearchBar2 from "../../../../components/forms/searchBar/SearchBar-2";
import useTable from "../../../../hooks/useTable";

const ApplicationsPage = () => {
  const setFeedback = useFeedback();
  const { tableData, loader, setTable, clearTable } = useTable();
  const { getQuery } = useSearchFilter();

  const handleFetch = async (e) => {
    const query = getQuery(e);
    try {
      const res = await server.application.fetchAll(query);
      setTable(res.data);
    } catch (error) {
      setFeedback(2, error);
      clearTable();
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Applications"
        svg={FileText}
        sub="Review membership applications"
        colorClass="bg-blue-700"
      />
      <SearchBar2
        page={tableData.page}
        onSearch={handleFetch}
        loader={loader}
        menuOptions={[
          { label: "Application ID", value: "applicationId" },
          { label: "Applied", value: "applied" },
          { label: "Rejected", value: "rejected" },
        ]}
      />
      <ApplicationTable data={tableData} />
    </div>
  );
};

export default ApplicationsPage;
