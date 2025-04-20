import React from "react";

const Button = (props) => {
  const { label } = props;

  return (
    <button className="c-btn-blue" {...props}>
      {label}
    </button>
  );
};

export default Button;
