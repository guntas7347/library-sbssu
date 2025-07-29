import React, { useState } from "react";
import PageHeader from "../../../../components/header/PageHeader";
import { Search } from "lucide-react";
import Table from "../../../../components/features/dashboard/staff/issueSearch/Table";
import useFeedback from "../../../../hooks/useFeedback";
import useSearchFilter from "../../../../hooks/useSearchFilter";
import server from "../../../../services/server.api";
import SearchBar2 from "../../../../components/forms/searchBar/SearchBar-2";
import useTable from "../../../../hooks/useTable";

const SearchIssuesPage = () => {
  const setFeedback = useFeedback();
  const { tableData, loader, setTable, clearTable } = useTable();
  const { getQuery } = useSearchFilter();

  const handleFetch = async (e) => {
    const query = getQuery(e);
    try {
      const res = await server.issue.search(query);
      setTable(res.data);
    } catch (error) {
      setFeedback(2, error);
      clearTable();
    }
  };

  return (
    <>
      <div className="min-h-screen space-y-5">
        <PageHeader
          title="Issue Search"
          svg={Search}
          sub="Advanced search and filtering for book issues"
        />
        <SearchBar2
          page={tableData.page}
          onSearch={handleFetch}
          loader={loader}
          menuOptions={[
            { label: "Issue Ref Number", value: "irn" },
            { label: "Overdue", value: "due" },
            { label: "Accession Number", value: "acc" },
            { label: "Card Number", value: "card" },
          ]}
        />
        <Table data={tableData} />
      </div>
    </>
  );
};

export default SearchIssuesPage;
