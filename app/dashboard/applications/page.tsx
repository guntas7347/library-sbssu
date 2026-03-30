"use client";
import PageHeader from "@/components/pageHeader";
import { FileText } from "lucide-react";
import ApplicationTable from "./ApplicationTable";
import useTable from "@/hooks/useTable";
import { useEffect } from "react";
import { getApplications } from "@/lib/firebase/applications";
import SearchBar2 from "@/components/SearchBar";

const ApplicationsPage = () => {
  const { tableData, loader, setTable, clearTable } = useTable();

  const fetchApplications = async (filter: any) => {
    const data = await getApplications(filter);
    setTable(data);
  };

  return (
    <div>
      <PageHeader
        title="Applications"
        svg={FileText}
        sub="Review membership applications"
        colorClass="bg-blue-700"
      />
      <SearchBar2
        page={tableData.page}
        onSearch={fetchApplications}
        showDefault={false}
        loader={loader}
        placeholder="Search by Application ID..."
        menuOptions={[
          { label: "Pending", value: "pending" },
          { label: "Name", value: "fullName" },
          { label: "Approved", value: "approved" },
          { label: "Rejected", value: "rejected" },
        ]}
      />
      <ApplicationTable data={tableData} />
    </div>
  );
};

export default ApplicationsPage;
