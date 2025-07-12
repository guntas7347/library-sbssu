import { useSearchParams } from "react-router-dom";
import { createURLQuery } from "../../utils/functions";

const useQueryParams = () => {
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

  return { params, queryString };
};

export default useQueryParams;
