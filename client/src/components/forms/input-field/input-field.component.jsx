import "./input-field.styles.scss";

const InputField = (props) => {
  return (
    <div className="flex flex-row gap-5 justify-between items-center">
      <label className="text-xl" htmlFor={props.htmlFor}>
        {props.label}
      </label>
      <input
        className={`border border-black px-1 w-60 text-xl ${
          props.inputclassname && props.inputclassname
        }`}
        required
        {...props}
      />
    </div>
  );
};

export default InputField;
