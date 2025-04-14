const SpanningTable = ({ rows, imageUrl = null }) => {
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
        {imageUrl && (
          <tr>
            <td className="text-left w-96">Image</td>
            <td>
              <img className="w-52 h-52" src={imageUrl} alt="image" />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SpanningTable;
