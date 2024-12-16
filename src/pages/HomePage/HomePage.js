import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import Item from "antd/es/list/Item";
import {
  WrapperNew,
  WrapperNewText,
  WrapperProduct,
  WrapperTypeProduct,
} from "./style";
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
import * as ProductService from "../../service/ProductService";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  //xu li get all product ra ngoai
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    console.log("res", res.data);
    return res.data;
  };

  // const { isLoading, data } = useQuery({
  //   queryKey: ["product"], // Tên query key
  //   queryFn: fetchProductAll, // Hàm fetch dữ liệu
  // });
  // console.log("data", data);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"], // Tên query key
    queryFn: fetchProductAll, // Hàm fetch API
    retry: 3,
    retryDelay: 1000,
  });

  console.log("data", products);

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

        <WrapperProduct>
          {products?.map((product) => {
            return (
              <CardComponent
                key={product._id}
                name={product.name}
                description={product.description}
                price={product.price}
                type={product.type}
                images={product.images}
                stock={product.stock}
                reviews={product.reviews}
                rating={product.rating}
                address={product.address}
                updatedAt={product.updatedAt}
              />
            );
          })}
        </WrapperProduct>
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
