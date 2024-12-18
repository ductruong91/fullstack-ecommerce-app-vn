import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Spin, Alert } from "antd";
import CardComponent from "../../CardComponent/CardComponent";
import * as ProductService from "../../../service/ProductService";
import { useSelector } from "react-redux";
import EditProductForm from "./EditProductForm";

const { Title } = Typography;

const MyProduct = () => {
  const user = useSelector((state) => state.user);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("user accesstoken", user.id);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  // Xử lý khi lưu dữ liệu chỉnh sửa
  const handleSave = (updatedProduct) => {
    console.log("Dữ liệu chỉnh sửa:", updatedProduct);
    setSelectedProduct(null); // Đóng modal sau khi lưu
    
  };

  // Xử lý khi hủy chỉnh sửa
  const handleCancel = () => {
    setSelectedProduct(null);
  };

  const fetchFilteredProducts = async () => {
    setIsLoading(true);
    try {
      const response = await ProductService.getUserProduct(user.id);
      const data = response.data;
      console.log("data sau khi get", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Dòng chữ trên cùng */}
      <Title level={4} style={{ marginBottom: "20px" }}>
        Các sản phẩm bạn đã đăng bán
      </Title>

      {/* Grid hiển thị các sản phẩm */}
      <Row
        gutter={[24, 24]} // Khoảng cách giữa các thẻ (dọc và ngang)
        justify="center" // Căn giữa các cột
      >
        {products?.map((product) => (
          <Col
            key={product._id}
            xs={24} // 1 cột trên màn hình nhỏ
            sm={12} // 2 cột trên màn hình trung bình
            md={8} // 3 cột trên màn hình lớn
            onClick={() => handleCardClick(product)}
          >
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
              onClick={() => handleCardClick(product)}
            />
          </Col>
        ))}
      </Row>

      {/* Hiển thị Form chỉnh sửa */}
      <EditProductForm
        visible={!!selectedProduct} // Hiển thị form nếu selectedProduct không null
        product={selectedProduct} // Sản phẩm đang chỉnh sửa
        onSave={handleSave} // Lưu chỉnh sửa
        onCancel={handleCancel} // Hủy chỉnh sửa
      />
    </div>
  );
};

export default MyProduct;
