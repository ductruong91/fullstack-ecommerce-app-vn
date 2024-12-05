import { Button } from "antd";
import React from "react";

const ButtonComponent = (props) => {
  const { size, styleButton, styleTextButton, textButton, ...rests } = props;
  return (
      <Button size={size} style={styleButton} {...rests}>
        <span style={styleTextButton}>{textButton}</span>
      </Button>
  );
};

export default ButtonComponent;
