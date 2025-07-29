import PageHeader from "../../../../components/header/PageHeader";
import { BookMarked } from "lucide-react";
import SearchBar2 from "../../../../components/forms/searchBar/SearchBar-2";
import useFeedback from "../../../../hooks/useFeedback";
import useSearchFilter from "../../../../hooks/useSearchFilter";
import server from "../../../../services/server.api";
import ReturnTable from "../../../../components/features/dashboard/staff/searchReturn/ReturnTable";
import useTable from "../../../../hooks/useTable";

const SearchReturnPage = () => {
  const setFeedback = useFeedback();
  const { tableData, loader, setTable, clearTable } = useTable();
  const { getQuery } = useSearchFilter();

  const handleFetch = async (e) => {
    const query = getQuery(e);
    try {
      const res = await server.return.search(query);
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
          title="Return Search"
          svg={BookMarked}
          sub="Advanced search and filtering for book issues"
          colorClass="bg-green-700"
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

        <ReturnTable data={tableData} />
      </div>
    </>
  );
};

export default SearchReturnPage;
