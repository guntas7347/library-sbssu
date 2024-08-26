import React from "react";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../hooks/useQueryParams.hook";
import { useForm } from "../forms/use-form-hook/use-form.hook.component";

const Pagination = ({ totalPages = 1 }) => {
  const navigate = useNavigate();
  const { params } = useQueryParams();
  const pageNumber = Number(params.page) || 1;
  const { formFields, handleChange } = useForm({ pageNumber });

  return (
    <div className="flex gap-10 justify-center items-center my-2">
      <button
        className="my-button"
        onClick={() => navigate(`?page=${pageNumber - 1}`)}
        disabled={pageNumber < 2}
      >
        Prev
      </button>
      <p className="bg-custom-dark-blue p-3 text-white rounded min-w-12 text-center disabled">
        {pageNumber}
      </p>
      <button
        className="my-button"
        onClick={() => navigate(`?page=${pageNumber + 1}`)}
        disabled={pageNumber >= totalPages}
      >
        Next
      </button>
      <div className="flex gap-5">
        <input
          className="bg-custom-dark-blue p-3 w-32 text-white"
          type="number"
          placeholder="Go To"
          min={1}
          max={totalPages}
          onChange={handleChange}
          name="pageNumber"
        />
        <button
          className="my-button"
          onClick={() => navigate(`?page=${formFields.pageNumber}`)}
        >
          Jump
        </button>
      </div>
    </div>
  );
};

export default Pagination;
