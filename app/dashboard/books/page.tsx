"use client";

import PageHeader from "@/components/pageHeader";
import { Book } from "lucide-react";
import BookTable from "./booksTable";
import useTable from "@/hooks/useTable";
import { getBooks } from "@/lib/koha/books";
import { useEffect } from "react";

const BooksPage = () => {
  const { tableData, data, loader, setTable, clearTable } = useTable();

  const fetchBooks = async () => {
    const data = await getBooks();
    setTable(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Book"
        svg={Book}
        colorClass="bg-green-700"
        sub="Search and manage book inventory"
      >
        {/* <Link
          className="p-2 rounded-xl bg-green-100 dark:bg-green-900/50 hover:bg-green-200 dark:hover:bg-green-900/70 transition-all duration-200"
          to="add"
        >
          <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
        </Link> */}
      </PageHeader>

      {/* <SearchBar2
        page={tableData.page}
        onSearch={handleFetch}
        loader={loader}
        menuOptions={[
          { label: "Accession Number", value: "accession" },
          { label: "Title", value: "title" },
          { label: "Category", value: "category" },
        ]}
      /> */}

      <BookTable data={tableData} />
    </div>
  );
};

export default BooksPage;
