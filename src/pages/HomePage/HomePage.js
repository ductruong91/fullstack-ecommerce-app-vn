import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { Button } from "antd";
const limit = 30;

const HomePage = () => {
  const filters = useSelector((state) => state.filter.filters); // Lấy filters từ Redux
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(0); // Trang hiện tại
  const [hasMore, setHasMore] = useState(true);
  //xu li get all product ra ngoai
  // const fetchProductAll = async () => {
  //   const res = await ProductService.getAllProduct();
  //   console.log("res", res.data);
  //   return res.data;
  // };

  const fetchFilteredProducts = async () => {
    setIsLoading(true);
    try {
      const response = await ProductService.getAllFilteredProduct(
        { filter: filters },
        limit,
        page
      );
      const data = response.data;

      if (data?.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...data]); // Gộp sản phẩm mới vào danh sách hiện tại
        setHasMore(data.length === limit); // Nếu nhận đủ 10 sản phẩm, vẫn còn sản phẩm để tải
      } else {
        setHasMore(false); // Hết sản phẩm để tải
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    console.log("data sau khi get", products);
    setIsLoading(false);
  };

  // Theo dõi khi `page` thay đổi       // Chỉ gọi khi `page` không phải lần đầu
  useEffect(() => {
    console.log("page", page);
    if (page > 0) {
      fetchFilteredProducts(page);
    }
  }, [page]);

  // Theo dõi khi `filters` thay đổi
  useEffect(() => {
    setProducts([]);
    setPage(0);
    fetchFilteredProducts();
  }, [filters]);

  // Hàm xử lý khi nhấn nút "Xem thêm"
  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // Tăng trang để tải thêm
    }
    console.log("page", page);
  };

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
                id={product._id}
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
              // type="outline"
              onClick={handleLoadMore}
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
