import { useSearchParams } from "react-router-dom";
import { createURLQuery } from "../../utils/functions";

const useQuery = () => {
  const [searchParams] = useSearchParams();

  const getAllQueryParams = () => {
    const params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const params = getAllQueryParams();

  const queryString = createURLQuery(params);

  // const setQuery = ({ key, value }) => {
  //   const timer = setTimeout(() => {
  //     if (key !== "" || value !== "") {
  //       const q = createURLQuery(
  //         {
  //           filter: key,
  //           filterValue: value,
  //         },
  //         queryString
  //       );
  //       navigate(`?${q}`);
  //     }
  //   }, 1000);
  // };

  return { params, queryString };
};

export default useQuery;
