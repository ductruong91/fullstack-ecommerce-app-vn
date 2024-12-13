import React from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";

const ProductDetailPage = () => {
  return (
    <div style={{ padding: "20px 360px", background: "#efefef" }}>
      <h4>trang chu</h4>
      <div style={{display:'flex', background:'#fff'}}>
        <ProductDetailComponent />
      </div>
    </div>
  );
};

export default ProductDetailPage;
