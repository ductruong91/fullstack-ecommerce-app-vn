import React from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  return (
    <div style={{ padding: "20px 360px", background: "#efefef" }}>
      <h4>trang chu - chi tiet san pham</h4>
      <div style={{ display: "flex", background: "#fff" }}>
        <ProductDetailComponent idProduct={id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
