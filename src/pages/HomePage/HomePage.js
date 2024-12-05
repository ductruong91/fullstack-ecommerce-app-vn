import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import Item from "antd/es/list/Item";
import { WrapperNew, WrapperNewText, WrapperTypeProduct } from "./style";
import { IoIosList } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { BiBorderRadius } from "react-icons/bi";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { colors } from "@mui/material";
import { Margin } from "@mui/icons-material";

const HomePage = () => {
  return (
    <>
      <div
        id="container"
        style={{
          backgroundColor: "rgb(245,245,250)",
          padding: "0 120px",
        }}
      >
        <SliderComponent arrImages={[slider1, slider2, slider3]} />

        {/* <WrapperNew> */}
        <WrapperNewText>
          <span>Tin dang moi</span>
        </WrapperNewText>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div>
        <div
          style={{ display: "flex", margin: "10px", justifyContent: "center" }}
        >
          <div>
            <ButtonComponent
              textButton="xem them"
              type="outline"
              styleButton={{
                border: "1px solid rgb(11, 116, 229)",
                colors: "rgb(11, 116, 229)",
                width: "240px",
                height: "38px",
              }}
            />
          </div>
        </div>

        {/* </WrapperNew> */}
        <NavbarComponent />
      </div>
    </>
  );
};

export default HomePage;
