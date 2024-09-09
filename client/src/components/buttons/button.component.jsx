import React from "react";
import "./button.styles.css";

const Button = (props) => {
  const { label } = props;

  return (
    <button className="my-button" {...props}>
      {label}
    </button>
  );
};

export default Button;
