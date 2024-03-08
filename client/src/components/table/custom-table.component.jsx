const CustomTable = ({
  rows = [],
  columns = [],
  handleRowClick = () => {},
  indexToSelect = 0,
}) => {
  return (
    <>
      <div className="container-customTable">
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => {
                return <th key={index}>{column}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => handleRowClick(row[indexToSelect])}
                >
                  {row.map((element, index) => {
                    if (index === 0) return;
                    return <td key={index}>{element}</td>;
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
export default CustomTable;
