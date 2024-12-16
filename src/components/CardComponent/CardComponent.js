import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { formatDistanceToNow } from "date-fns"; // Hàm dùng để tính thời gian

import React from "react";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperPriceText,
  WrapperTimePostText,
} from "./style";

const CardComponent = (props) => {
  const {
    name,
    description,
    price,
    rating,
    stock,
    type,
    images,
    address,
    updatedAt,
  } = props;

  // Sử dụng date-fns để tính thời gian từ khi bài đăng được cập nhật
  const timeAgo = updatedAt
    ? formatDistanceToNow(new Date(updatedAt))
    : "Đang cập nhật";

  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 200, padding: "12px" }}
      styles={{ body: { padding: "10px" } }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperPriceText>{price}</WrapperPriceText>
      <WrapperTimePostText>{address}</WrapperTimePostText>
      <WrapperTimePostText>{timeAgo} truoc</WrapperTimePostText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
