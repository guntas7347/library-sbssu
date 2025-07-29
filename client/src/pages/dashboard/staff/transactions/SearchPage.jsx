import React from "react";
import PageHeader from "../../../../components/header/PageHeader";
import { CreditCard, Plus } from "lucide-react";
import SearchBar2 from "../../../../components/forms/searchBar/SearchBar-2";
import useFeedback from "../../../../hooks/useFeedback";
import useTable from "../../../../hooks/useTable";
import useSearchFilter from "../../../../hooks/useSearchFilter";
import server from "../../../../services/server.api";
import TransactionsTable from "../../../../components/features/dashboard/staff/transaction/Table";
import { Link } from "react-router-dom";

const TransactionSearchPage = () => {
  const setFeedback = useFeedback();
  const { tableData, loader, setTable, clearTable } = useTable();
  const { getQuery } = useSearchFilter();

  const handleFetch = async (e) => {
    const query = getQuery(e);
    try {
      const res = await server.transaction.search(query);
      setTable(res.data);
    } catch (error) {
      setFeedback(2, error);
      clearTable();
    }
  };

  return (
    <div className="min-h-screen space-y-5">
      <PageHeader
        title="Transactions Search"
        svg={CreditCard}
        sub="transactions"
        colorClass="bg-purple-700"
      >
        <Link
          className="p-2 rounded-xl bg-green-100 dark:bg-green-900/50 hover:bg-green-200 dark:hover:bg-green-900/70 transition-all duration-200"
          to="add"
        >
          <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
        </Link>
      </PageHeader>
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
      <TransactionsTable data={tableData} />
    </div>
  );
};

export default TransactionSearchPage;
