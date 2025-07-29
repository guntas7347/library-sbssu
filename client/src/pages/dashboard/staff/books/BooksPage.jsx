import useSearchFilter from "../../../../hooks/useSearchFilter";
import useFeedback from "../../../../hooks/useFeedback";
import server from "../../../../services/server.api";
import BookTable from "../../../../components/features/dashboard/staff/book/BookTable";
import PageHeader from "../../../../components/header/PageHeader";
import { Book, Plus } from "lucide-react";
import SearchBar2 from "../../../../components/forms/searchBar/SearchBar-2";
import { Link } from "react-router-dom";
import useTable from "../../../../hooks/useTable";

const BookPage = () => {
  const setFeedback = useFeedback();
  const { tableData, loader, setTable, clearTable } = useTable();
  const { getQuery } = useSearchFilter();

  const handleFetch = async (e) => {
    const query = getQuery(e);
    try {
      const res = await server.book.fetchAll(query);
      setTable(res.data);
    } catch (error) {
      setFeedback(2, error);
      clearTable();
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Book"
        svg={Book}
        colorClass="bg-green-700"
        sub="Search and manage book inventory"
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
          { label: "Accession Number", value: "accession" },
          { label: "Title", value: "title" },
        ]}
      />

      <BookTable data={tableData} />
    </div>
  );
};

export default BookPage;
