import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperPriceText,
  WrapperTimePostText,
} from "./style";

const CardComponent = () => {
  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 200, padding: "12px" }}
      bodyStyle={{ padding: "10px" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <StyleNameProduct>iphone</StyleNameProduct>
      <WrapperPriceText>250.000 đ</WrapperPriceText>
      <WrapperTimePostText>1p truoc</WrapperTimePostText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
