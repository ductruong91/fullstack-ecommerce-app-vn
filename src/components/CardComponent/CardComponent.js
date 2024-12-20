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
import { useNavigate } from "react-router-dom";

const CardComponent = (props) => {
  const navigate = useNavigate();
  const handleDetailProduct = (id) => {
    navigate(`/product-detail/${id}`);
  };
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
    id,
    onClick,
  } = props;

  // Sử dụng date-fns để tính thời gian từ khi bài đăng được cập nhật
  const timeAgo = updatedAt
    ? formatDistanceToNow(new Date(updatedAt))
    : "Đang cập nhật";

  // Lấy ảnh đầu tiên từ mảng images
  const coverImage =
    Array.isArray(images) && images.length > 0
      ? images[0]
      : "default-image-url"; // Thay "default-image-url" bằng đường dẫn ảnh mặc định nếu cần

  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 200, padding: "12px" }}
      styles={{ body: { padding: "10px" } }}
      cover={<img alt="example" src={coverImage} />}
      onClick={() => (onClick ? onClick() : handleDetailProduct(id))}
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperTimePostText>còn lại: {stock}</WrapperTimePostText>
      <WrapperPriceText>
        {typeof price === "number"
          ? price.toLocaleString()
          : Number(price).toLocaleString()}
      </WrapperPriceText>
      <WrapperTimePostText>{address}</WrapperTimePostText>
      <WrapperTimePostText>{timeAgo} truoc</WrapperTimePostText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
