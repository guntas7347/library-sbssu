import { useState } from "react";

const useTable = (defaultState = null) => {
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const setTable = (e) => {
    setData(e);
    setLoading(false);
  };

  const clearTable = () => {
    setData(defaultState);
    setLoading(false);
  };

  const tableData = {
    data: data?.data || [],
    totalPages: data?.totalPages || 1,
    totalCount: data?.totalCount || 0,
    page: page,
    setPage: (e) => setPage(e),
  };

  const loader = {
    loading,
    setLoading,
  };

  return {
    tableData,
    setTable,
    clearTable,
    data,
    setData,
    loader,
    page,
    setPage,
  };
};

export default useTable;
