import React from "react";
import { WrapperTextFieldStyle } from "./style";

const InputForm = (props) => {
  const { label = "text", ...rests } = props;
  const handleOnChangeInput = (e) => {
    console.log("value:", e.target.value);
  };
  return (
    <WrapperTextFieldStyle
      label={label}
      value={props.value}
      {...rests}
    //   onChange={props.handleOnChange}
    />
  );
};

export default InputForm;
