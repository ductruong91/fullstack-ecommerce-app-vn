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

        <WrapperNew>
          <WrapperNewText>
            <span>Tin dang moi</span>
          </WrapperNewText>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <CardComponent />
          </div>
        </WrapperNew>
        <NavbarComponent/>
      </div>
    </>
  );
};

export default HomePage;
