import { useState } from "react";

const useSearchFilter = () => {
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);

  const getQuery = (e) => {
    const obj = { ...filter, ...e };
    setFilter(obj);
    return new URLSearchParams(obj).toString();
  };

  return { filter, page, setPage, getQuery };
};

export default useSearchFilter;
