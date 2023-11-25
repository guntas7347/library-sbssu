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

const CustomTableSelect = ({ rows, columns, onSelect }) => {
  const [isChecked, setIsChecked] = useState(false);

  const [selectedValue, setSelectedValue] = useState(null);

  const handleRowClick = (row) => {
    setIsChecked(!isChecked);
    setSelectedValue(row[0]);
  };

  if (!isChecked) {
    onSelect(null);
  } else {
    onSelect(selectedValue);
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <CheckBoxIcon className="mt-3" />
              {columns.map((column, index) => (
                <TableCell key={index}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow key={index} hover onClick={() => handleRowClick(row)}>
                  <Checkbox checked={isChecked} />
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
