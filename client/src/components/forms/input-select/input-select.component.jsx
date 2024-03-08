import "./input-select.styles.css";

const InputSelect = (props) => {
  const { fields, onChange, label } = props;
  return (
    <div>
      <div className="inputSelect-container">
        <select onChange={onChange} defaultValue={fields[0].value} {...props}>
          <option defaultValue>--select an option--</option>
          {fields.map((menuItem, index) => (
            <option key={index} value={menuItem.value}>
              {menuItem.name}
            </option>
          ))}
        </select>
        <label htmlFor="">{label}</label>
      </div>
    </div>
  );
};

export const InputSelectB = (props) => {
  const { fields, onChange, label } = props;

  return (
    <div className="flex flex-row justify-between">
      <label htmlFor="">{label}</label>
      <select
        className="border border-black px-1 w-48"
        onChange={onChange}
        defaultValue={fields[0].value}
        {...props}
      >
        <option defaultValue>--select an option--</option>
        {fields.map((menuItem, index) => (
          <option key={index} value={menuItem.value}>
            {menuItem.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
