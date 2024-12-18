import React, { useState } from "react";
import { Layout, List, Checkbox, Divider, Typography, Button } from "antd";
import { DeleteOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

// Component hiển thị từng sản phẩm
const CartProduct = ({ product, onToggle, onDelete, checked }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      marginBottom: "10px",
    }}
  >
    <Checkbox
      checked={checked}
      onChange={() => onToggle(product.id)}
      style={{ marginRight: 10 }}
    />
    <img
      src={product.image}
      alt={product.name}
      style={{
        width: 50,
        height: 50,
        objectFit: "cover",
        marginRight: 10,
      }}
    />
    <div style={{ flex: 1 }}>
      <Title level={5}>{product.name}</Title>
      <Text>Số lượng: {product.quantity}</Text>
    </div>
    <div style={{ textAlign: "right" }}>
      <Text strong>{product.price} VND</Text>
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={() => onDelete(product.id)}
        style={{ marginLeft: 10 }}
      />
    </div>
  </div>
);

const ShoppingCart = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Sản phẩm A",
      quantity: 1,
      price: 200000,
      image: "https://via.placeholder.com/50",
      checked: false,
    },
    {
      id: 2,
      name: "Sản phẩm B",
      quantity: 2,
      price: 300000,
      image: "https://via.placeholder.com/50",
      checked: false,
    },
  ]);

  const [checkAll, setCheckAll] = useState(false);

  // Toggle checkbox của từng sản phẩm
  const toggleProduct = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, checked: !product.checked } : product
      )
    );
  };

  // Xử lý xóa sản phẩm
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Xử lý checkbox "Tất cả sản phẩm"
  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    setCheckAll(checked);
    setProducts((prev) => prev.map((product) => ({ ...product, checked })));
  };

  // Tính toán tổng tiền
  const total = products
    .filter((product) => product.checked)
    .reduce((acc, product) => acc + product.price * product.quantity, 0);
  const shipping = 30000;

  const handleCheckout = () => {
    alert("Thanh toán thành công!");
  };

  return (
    <Layout style={{ padding: "20px", height: "100vh" }}>
      <Content
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          display: "flex",
          gap: "30px",
        }}
      >
        {/* Khung bên trái */}
        <div
          style={{
            flex: 2,
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            backgroundColor: "#fff",
          }}
        >
          <Title level={4}>Giỏ hàng của bạn</Title>
          <Text>Bạn có {products.length} sản phẩm trong giỏ hàng</Text>
          <Divider />
          <Checkbox checked={checkAll} onChange={handleCheckAll}>
            Tất cả sản phẩm
          </Checkbox>
          <Divider />
          <List
            dataSource={products}
            renderItem={(product) => (
              <CartProduct
                product={product}
                onToggle={toggleProduct}
                onDelete={handleDelete}
                checked={product.checked}
              />
            )}
          />
        </div>

        {/* Khung bên phải */}
        <div
          style={{
            flex: 1,
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            backgroundColor: "#fff",
          }}
        >
          {/* Địa chỉ giao hàng */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EnvironmentOutlined
              style={{ fontSize: "20px", marginRight: "10px" }}
            />
            <div style={{ flex: 1 }}>
              <Text>Địa chỉ giao hàng: 123 ABC, Hà Nội</Text>
            </div>
            <Button type="link">Thay đổi</Button>
          </div>
          <Divider />

          {/* Thông tin thanh toán */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Tạm tính:</Text>
            <Text>{total} VND</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Phí giao hàng:</Text>
            <Text>{total > 0 ? shipping : 0} VND</Text>
          </div>
          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={4}>Tổng cộng:</Title>
            <Title level={4}>{total > 0 ? total + shipping : 0} VND</Title>
          </div>

          {/* Nút mua hàng */}
          <Button
            type="primary"
            block
            style={{ marginTop: "10px" }}
            onClick={handleCheckout}
            disabled={total === 0}
          >
            Mua hàng
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default ShoppingCart;
