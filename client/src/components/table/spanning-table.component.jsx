const SpanningTable = ({ rows }) => {
  return (
    <table>
      <tbody>
        {rows.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((td, index) => {
                return (
                  <td className="text-left w-96" key={index}>
                    {td}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SpanningTable;
