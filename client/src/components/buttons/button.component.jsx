import React from "react";

const Button = (props) => {
  const { label } = props;
  return <button {...props}>{label}</button>;
};

export default Button;
