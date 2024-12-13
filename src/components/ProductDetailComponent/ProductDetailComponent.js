import { Col, Image, InputNumber, Row } from "antd";
import React from "react";

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

const ProductDetailComponent = () => {
  const onChange = () => {};
  return (
    <Row style={{ padding: "16px" }}>
      <Col span={10}>
        <Image
          src={imageProduct}
          alt="anh cho"
          preview="false"
          style={{ borderRadius: "5px" }}
        />
        <Row
          style={{ paddingTop: "10px", gap: "10px", justifyContent: "center" }}
        >
          <WrapperStyleCol span={4}>
            <WrapperStyleImageSmall
              src={imageSmallProduct}
              alt="anh nho"
              preview="false"
            />
          </WrapperStyleCol>
          <WrapperStyleCol span={4}>
            <WrapperStyleImageSmall
              src={imageSmallProduct}
              alt="anh nho"
              preview="false"
            />
          </WrapperStyleCol>
          <WrapperStyleCol span={4}>
            <WrapperStyleImageSmall
              src={imageSmallProduct}
              alt="anh nho"
              preview="false"
            />
          </WrapperStyleCol>
          <WrapperStyleCol span={4}>
            <WrapperStyleImageSmall
              src={imageSmallProduct}
              alt="anh nho"
              preview="false"
            />
          </WrapperStyleCol>
          <WrapperStyleCol span={4}>
            <WrapperStyleImageSmall
              src={imageSmallProduct}
              alt="anh nho"
              preview="false"
            />
          </WrapperStyleCol>
        </Row>
      </Col>
      <Col span={14} style={{ padding: "30px", gap: "10px" }}>
        <WrapperStyleNameProduct>cho con long ngan</WrapperStyleNameProduct>

        <WrapperStyleStock>so luong con lai </WrapperStyleStock>

        <WrapperPrice>3000.000 đ</WrapperPrice>

        <WrapperLocation>
          <IoLocationOutline style={{ fontSize: "20px" }} />
          <WrapperTextLocation>đia chi</WrapperTextLocation>
        </WrapperLocation>

        <WrapperTimePost>
          <IoTimeOutline style={{ fontSize: "20px" }} />
          <WrapperTextTimePost>5 tieng truoc</WrapperTextTimePost>
        </WrapperTimePost>

        <WrapperUser>
          <WrapperUserImage
            src={imageSmallProduct}
            alt="anh nho"
            preview="false"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
          <WrapperUserName>ten nguoi ban</WrapperUserName>
          <div
            style={{
              width: "3px",
              height: "100%",
              backgroundColor: "#e8e8e8",
            }}
          ></div>

          <WrapperUserNumberProduct>
            so luong hang dang ban
          </WrapperUserNumberProduct>
        </WrapperUser>

        <WrapperQualityNumber>so luong</WrapperQualityNumber>

        <WrapperInputNumber
          size="large"
          min={1}
          max={100000}
          defaultValue={3}
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
