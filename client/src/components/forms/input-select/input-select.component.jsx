import "./input-select.styles.css";

const InputSelect = (props) => {
  const { fields, onChange, label } = props;
  return (
    <div className="flex flex-row gap-5 justify-between items-center">
      <label className="text-xl" htmlFor="">
        {label}
      </label>
      <select
        required
        className="border border-black px-1 w-60 text-xl truncate"
        onChange={onChange}
        value={fields[0].value}
        {...props}
      >
        <option value="" disabled>
          --select an option--
        </option>
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
