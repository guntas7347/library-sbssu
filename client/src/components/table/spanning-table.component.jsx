const SpanningTable = ({ rows }) => {
  return (
    <div style={{ overflow: "auto" }}>
      <table>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((td, index) => {
                  return (
                    <td className="text-left" key={index}>
                      {td}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SpanningTable;
