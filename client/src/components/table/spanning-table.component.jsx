const SpanningTable = ({ rows, imageUrl = null }) => {
  return (
    <table>
      <tbody>
        {rows.map((row, idx) => {
          return (
            <tr key={idx}>
              {row.map((td, idx) => {
                return (
                  <td className="text-left w-96" key={idx}>
                    {td}
                  </td>
                );
              })}
            </tr>
          );
        })}
        {imageUrl && (
          <tr>
            <td className="text-left w-96">Image</td>
            <td>
              <img
                className="w-52 h-52"
                crossOrigin="anonymous"
                src={imageUrl}
                alt="image"
              />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SpanningTable;
