import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllStaff } from "../../../hooks/http-requests.hooks.admin";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import { useContext, useState } from "react";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const SearchStaffPage = () => {
  const navigate = useNavigate();

  const { setFeedback } = useContext(SnackBarContext);

  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    sortSelect: "fetchAllStaff",
    sortValue: "",
  });

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

  const handleRowClick = (e) => {
    navigate(`/dashboard/admin/manage-staff/search-staff/view-staff/${e}`);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold m-5">Search Staff</h1>
      <div>
        <div className="bg-white p-7 grid grid-cols-2 gap-5 my-5 rounded-3xl">
          <InputSelect
            fields={[{ name: "Search All Staff", value: "fetchAllStaff" }]}
            value={formFields.sortSelect}
            onChange={handleChange}
            name="sortSelect"
          />

          <button className="my-button" onClick={handleFetch}>
            Search
          </button>
        </div>
        <div className="">
          <CustomTable
            columns={["ID Number", "Name", "Role"]}
            rows={rowData}
            handleRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchStaffPage;
