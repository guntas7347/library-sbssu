import { useEffect, useState } from "react";
import "./table.styles.scss";

const CustomTableSelect = ({
  tableName,
  rows,
  columns,
  onSelect,
  indexToSelect,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [selectedValue, setSelectedValue] = useState([null]);

  const handleRowClick = (index, row) => {
    if (selectedRowIndex === index) {
      setSelectedRowIndex(null);
    } else {
      setSelectedRowIndex(index);
    }

    setSelectedValue(row[indexToSelect]);
  };

  useEffect(() => {
    onSelect(tableName, selectedValue, isChecked);
  }, [isChecked, selectedValue, selectedRowIndex]);

  console.log("tabel Rendered");

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Checked</th>
              {columns.map((column, index) => {
                return <th key={index}>{column}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              return (
                <tr
                  className={`${
                    selectedRowIndex === index && "table-active-row"
                  }`}
                  key={index}
                >
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        handleRowClick(index, row);
                        setIsChecked(e.target.checked);
                      }}
                      checked={selectedRowIndex === index}
                    />
                  </td>
                  {row.map((td, index) => {
                    return <td key={index}>{td}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default CustomTableSelect;
