import React, { Fragment } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperProduct } from "./style";

const TypeProductPage = () => {
  return (
    <div style={{ padding: "0 120px", background: "#efefef" }}>
      <Row
        style={{
          // padding: "0 120px",
          // background: "#efefef",
          paddingTop: "20px",
        }}
      >
        <Col span={4} offset={4}>
          {" "}
          <NavbarComponent />
        </Col>

        <Col span={12} offset={1}>
          <WrapperProduct>
            {" "}
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </WrapperProduct>
          <Pagination
            align="center"
            defaultCurrent={1}
            total={50}
            style={{ textAlign: "center", marginTop: "20px" }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TypeProductPage;
