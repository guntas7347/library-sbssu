import { Checkbox } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState } from "react";

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

  onSelect(tableName, selectedValue, isChecked);

  return (
    <Paper className="mb-5" sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <CheckBoxIcon className="mt-3" />
              </TableCell>
              {columns.map((column, index) => (
                <TableCell key={index}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow key={index} hover>
                  <TableCell>
                    <Checkbox
                      checked={selectedRowIndex === index}
                      onChange={(e) => {
                        handleRowClick(index, row);
                        setIsChecked(e.target.checked);
                      }}
                    />
                  </TableCell>
                  {row.map((element, index) => {
                    return <TableCell key={index}>{element}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default CustomTableSelect;
