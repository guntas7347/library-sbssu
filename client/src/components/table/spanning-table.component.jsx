import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const SpanningTable = ({ rows }) => {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow key={index}>
                  {row.map((cell, index) => {
                    return <TableCell key={index}>{cell}</TableCell>;
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

export default SpanningTable;
