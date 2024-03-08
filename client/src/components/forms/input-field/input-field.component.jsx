import "./input-field.styles.scss";

const InputField = (props) => {
  const hasValue = () => {
    if (props.value === "") return false;
    else return true;
  };

  return (
    <div className="inputField-container">
      <input required {...props} />
      <label
        className={`${hasValue() && "active-input"}`}
        htmlFor={props.htmlFor}
      >
        {props.label}
      </label>
    </div>
  );
};

export const InputFieldB = (props) => {
  return (
    <div className="flex flex-row gap-5 justify-between">
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <input className="border border-black px-1 w-48" required {...props} />
    </div>
  );
};

export default InputField;
