import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllStaff } from "../../../hooks/http-requests.hooks.admin";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import { useContext, useEffect, useState } from "react";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import useQueryParams from "../../../../../components/hooks/useQueryParams.hook";

const SearchStaffPage = () => {
  const navigate = useNavigate();

  const { queryString } = useQueryParams();

  const { setFeedback } = useContext(SnackBarContext);

  const [rowData, setRowData] = useState([]);

  const handleFetch = async () => {
    await fetchAllStaff()
      .then((res) => setRowData(rowsArray(res)))
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, ["_id", "idNumber", "fullName", "role"])
      );
    });
  };

  useEffect(() => {
    handleFetch();
  }, [queryString]);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold m-5">Search Staff</h1>
      <div>
        <div className="flex  justify-between my-5 bg-white p-5 rounded-3xl">
          <SearchQueriesComponent
            selectFields={[
              { name: "Search All Staff", value: "fetchAllStaff" },
            ]}
          />
        </div>

        <div className="">
          <CustomTable
            columns={["ID Number", "Name", "Role"]}
            rows={rowData}
            handleRowClick={(e) => navigate(`view-staff/${e}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchStaffPage;
