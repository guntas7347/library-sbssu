import { Link } from "react-router-dom";
import useSearchFilter from "../../../../hooks/useSearchFilter";
import useFeedback from "../../../../hooks/useFeedback";
import server from "../../../../services/server.api";
import MemberTable from "../../../../components/features/dashboard/staff/member/MemberTable";
import PageHeader from "../../../../components/header/PageHeader";
import { TicketPlus, Users } from "lucide-react";
import SearchBar2 from "../../../../components/forms/searchBar/SearchBar-2";
import useTable from "../../../../hooks/useTable";

const MemberPage = () => {
  const setFeedback = useFeedback();
  const { tableData, loader, setTable, clearTable } = useTable();
  const { getQuery } = useSearchFilter();

  const handleFetch = async (e) => {
    const query = getQuery(e);
    try {
      const res = await server.member.fetchAll(query);
      setTable(res.data);
    } catch (error) {
      setFeedback(2, error);
      clearTable();
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Member"
        svg={Users}
        sub="Search and manage library members"
        colorClass="bg-purple-700"
      />
      <SearchBar2
        page={tableData.page}
        onSearch={handleFetch}
        loader={loader}
        menuOptions={[
          { label: "Name", value: "fullName" },
          { label: "Membership ID", value: "membershipId" },
          { label: "Cleared", value: "cleared" },
        ]}
      />

      <MemberTable data={tableData} />
    </div>
  );
};

export default MemberPage;
