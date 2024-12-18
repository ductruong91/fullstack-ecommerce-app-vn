import { Col, Image, InputNumber, Row } from "antd";
import React, { useEffect, useState } from "react";

import imageProduct from "../../assets/images/cho.webp";
import imageSmallProduct from "../../assets/images/cho.webp";
import imageUser from "../../assets/images/cho.webp";
import {
  WrapperBuyButton,
  WrapperInputNumber,
  WrapperLocation,
  WrapperPrice,
  WrapperQualityNumber,
  WrapperStyleCol,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleStock,
  WrapperTextLocation,
  WrapperTextTimePost,
  WrapperTimePost,
  WrapperUser,
  WrapperUserImage,
  WrapperUserName,
  WrapperUserNumberProduct,
} from "./style";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../service/ProductService";
import { formatDistanceToNow } from "date-fns";

const ProductDetailComponent = (idProduct) => {
  const onChange = () => {};
  // console.log("productId", idProduct);
  const [bigImage, setBigImage] = useState();

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hàm gọi API lấy thông tin sản phẩm
  const fetchProductDetail = async (id) => {
    try {
      // console.log("id", id);

      const response = await ProductService.getDetailProduct(id);
      const data = response.data;
      // console.log("data", data);

      setProductData(data); // Gán dữ liệu sản phẩm vào state
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    } finally {
      setLoading(false); // Kết thúc tải dữ liệu
    }
  };

  useEffect(() => {
    if (idProduct) {
      fetchProductDetail(idProduct.idProduct); // vì bên productpage truyền vào là object nên phải thêm 1 bước như này
    }
  }, [idProduct]);

  if (loading) {
    return <p>Đang tải thông tin sản phẩm...</p>; // Hiển thị trạng thái tải
  }

  if (!productData) {
    return <p>Không tìm thấy sản phẩm!</p>; // Hiển thị thông báo khi không có dữ liệu
  }

  const {
    name,
    price,
    stock,
    description,
    rating,
    type,
    images,
    address,
    updatedAt,
    owner,
  } = productData; // Giải nén dữ liệu sản phẩm từ API

  console.log("product:", productData);

  const timeAgo = updatedAt
    ? formatDistanceToNow(new Date(updatedAt))
    : "Đang cập nhật";

  return (
    <Row style={{ padding: "16px" }}>
      <Col span={10}>
        <Image
          src={images[0]}
          alt="anh product"
          preview="false"
          style={{ borderRadius: "5px" }}
        />
        <Row
          style={{ paddingTop: "10px", gap: "10px", justifyContent: "center" }}
        >
          {images.map((img, index) => (
            <WrapperStyleCol span={4} key={index}>
              <WrapperStyleImageSmall
                src={img}
                alt={`Ảnh nhỏ ${index + 1}`}
                preview="false"
                style={{
                  width: "100%", // Đảm bảo ảnh vừa khung
                  borderRadius: "5px",
                  height: "80px", // Đặt kích thước cố định cho ảnh
                  objectFit: "cover",
                }}
              />
            </WrapperStyleCol>
          ))}
        </Row>
      </Col>
      <Col span={14} style={{ padding: "30px", gap: "10px" }}>
        <WrapperStyleNameProduct>{name}</WrapperStyleNameProduct>

        <WrapperStyleStock>số lượng còn lại: {stock}</WrapperStyleStock>

        <WrapperPrice>
          {" "}
          {typeof price === "number"
            ? price.toLocaleString()
            : Number(price).toLocaleString()}
          đ
        </WrapperPrice>

        <WrapperLocation>
          <IoLocationOutline style={{ fontSize: "20px" }} />
          <WrapperTextLocation>{address || owner?.address}</WrapperTextLocation>
        </WrapperLocation>

        <WrapperTimePost>
          <IoTimeOutline style={{ fontSize: "20px" }} />
          <WrapperTextTimePost>{timeAgo}truoc</WrapperTextTimePost>
        </WrapperTimePost>

        <WrapperUser>
          <WrapperUserImage
            src={owner?.avatar || "https://via.placeholder.com/50"}
            alt="anh nho"
            preview="false"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
          <WrapperUserName>{owner?.name}</WrapperUserName>
          <div
            style={{
              width: "3px",
              height: "100%",
              backgroundColor: "#e8e8e8",
            }}
          ></div>

          <WrapperUserNumberProduct>
            {owner?.sold > 0 && `${owner.sold} sản phẩm đã bán`}
          </WrapperUserNumberProduct>
        </WrapperUser>

        <WrapperQualityNumber>so luong</WrapperQualityNumber>

        <WrapperInputNumber
          size="large"
          min={1}
          max={stock}
          defaultValue={1}
          onChange={onChange}
        />
        <WrapperBuyButton>
          <ButtonComponent
            size={40}
            styleButton={{
              background: "rgb(255,57,69)",
              height: "48px",
              width: "220px",
              borderRadius: "4px",
            }}
            textButton={"chon mua"}
            styleTextButton={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: "500",
            }}
          ></ButtonComponent>

          <ButtonComponent
            size={40}
            styleButton={{
              background: "#fff",
              height: "48px",
              width: "220px",
              borderRadius: "4px",
            }}
            textButton={"Them vao gio hang"}
            styleTextButton={{
              color: "rgb(13,92,182)",
              fontSize: "20px",
              fontWeight: "500",
            }}
          ></ButtonComponent>
        </WrapperBuyButton>
      </Col>
    </Row>
  );
};

export default ProductDetailComponent;
