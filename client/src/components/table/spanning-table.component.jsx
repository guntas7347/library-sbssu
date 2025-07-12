const SpanningTable = ({ rows, imageUrl = null }) => {
  return (
    <table className="bg-gray-100 ">
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
        {/* {imageUrl && (
          <img
            className="w-52 h-52"
            crossOrigin="anonymous"
            src={imageUrl}
            alt="image"
          />
        )} */}
      </tbody>
    </table>
  );
};

export default SpanningTable;
