import { useState } from "react";
import StaffTable from "../../../../components/features/dashboard/staff/staff/StaffTable";
import server from "../../../../services/server.api";
import useFeedback from "../../../../hooks/useFeedback";
import useSearchFilter from "../../../../hooks/useSearchFilter";
import PageHeader from "../../../../components/header/PageHeader";
import { Shield } from "lucide-react";
import SearchBar2 from "../../../../components/forms/searchBar/SearchBar-2";
import useTable from "../../../../hooks/useTable";

const StaffPage = () => {
  const setFeedback = useFeedback();
  const { tableData, loader, setTable, clearTable } = useTable();
  const { getQuery } = useSearchFilter();

  const handleFetch = async (e) => {
    const query = getQuery(e);
    try {
      const res = await server.staff.fetchAll(query);
      setTable(res.data);
    } catch (error) {
      setFeedback(2, error);
      clearTable();
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Staff"
        svg={Shield}
        sub="Manage staff accounts and permissions"
        colorClass="bg-amber-700"
      />
      <SearchBar2
        page={tableData.page}
        onSearch={handleFetch}
        loader={loader}
        menuOptions={[
          { label: "Name", value: "fullName" },
          { label: "ID Number", value: "idNumber" },
        ]}
      />
      <StaffTable data={tableData} />
    </div>
  );
};

export default StaffPage;
