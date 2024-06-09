import React from "react";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import { IoIosList } from "react-icons/io";
import { WrapperTypeProduct } from "../../../pages/HomePage/style";
import TypeProduct from "../../TypeProduct/TypeProduct";

const Navigation = () => {
  const arr = ["xe", "do dien lanh", "laptop"];
  return (
    <div style={{ padding: "0 120px" }}>
      <WrapperTypeProduct>
        <ButtonComponent
          size="large"
          icon=<IoIosList />
          styleButton={{
            backgroundColor: "#2bbef9",
            border: "none",
          }}
          bordered="false"
          textButton="danh mục sản phẩm"
        />
        {arr.map((item) => {
          return <TypeProduct name={item} key={item} />;
        })}
      </WrapperTypeProduct>
    </div>
  );
};

export default Navigation;
