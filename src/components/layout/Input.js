import React from "react";

const Input = (props) => {
  const {
    type = "text",
    placeholder = "placeholder text",
    name = "name",
    value = "value",
    onChange,
  } = props;
  return (
    <input
      type={type}
      className="form-control"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
