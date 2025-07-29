import React, { useState } from "react";
import FiltersCard from "../../../../cards/FiltersCard";
import SearchBar from "../../../../forms/searchBar/SearchBar";

const SearchBarFilter = ({ onSearch = () => {} }) => {
  //   const [showFilter, setShowFilter] = useState(false);

  //   const filters = [
  //     {
  //       label: "Status",
  //       name: "status",
  //       options: [
  //         { label: "Active", value: "active" },
  //         { label: "Overdue", value: "overdue" },
  //         { label: "Due Soon", value: "duesoon" },
  //       ],
  //     },
  //     {
  //       label: "Program",
  //       name: "program",
  //       options: [
  //         { label: "B.Tech", value: "btech" },
  //         { label: "BCA", value: "bca" },
  //         { label: "B.Sc", value: "bsc" },
  //       ],
  //     },
  //     {
  //       label: "Date",
  //       name: "date",
  //       options: [
  //         { label: "Last 7 Days", value: "7days" },
  //         { label: "Current Month", value: "currentmonth" },
  //       ],
  //     },
  //   ];

  const [filterData, setFilterData] = useState(null);

  const handleSearch = (e) => onSearch({ ...e, filters: filterData });

  return (
    <div className="flex flex-col gap-3">
      <SearchBar
        // onFilter={(e) => setShowFilter(e)}
        // filterStatus={showFilter}
        // filterButtonColor="purple"
        enableFilter={false}
        onSearch={handleSearch}
        menuOptions={[
          { label: "Issue Ref Number", value: "irn" },
          { label: "Overdue", value: "due" },
          { label: "Accession Number", value: "acc" },
          { label: "Card Number", value: "card" },
        ]}
      />
      {/* <FiltersCard
        show={showFilter}
        filters={filters}
        onChange={(e) => setFilterData(e)}
      /> */}
    </div>
  );
};

export default SearchBarFilter;
