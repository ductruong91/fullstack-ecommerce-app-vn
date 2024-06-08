import { Col } from "antd";
import React from "react";
import { WrappeHeader, WrapperTextHeader } from "./style";




const HeaderComponent = () => {
  return (
    <div>
      <WrappeHeader>
        <Col span={6}>
            <WrapperTextHeader>
            bkE
            </WrapperTextHeader>
        </Col>
        <Col span={12}>col-2</Col>
        <Col span={6}>
          col-3
        </Col>
      </WrappeHeader>
    </div>
  );
};

export default HeaderComponent;
