const SpanningTable = ({ rows }) => {
  return (
    <table className="bg-gray-50 ">
      <tbody>
        {rows.map((row, idx) => {
          return (
            <tr className="border border-gray-300" key={idx}>
              {row.map((td, idx) => {
                if (idx === 0)
                  return (
                    <td className="text-left w-96 font-semibold" key={idx}>
                      {td}
                    </td>
                  );
                return (
                  <td className="text-left w-96" key={idx}>
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
