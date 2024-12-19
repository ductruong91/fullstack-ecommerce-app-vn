import React, { useState } from "react";
import { Layout, List, Typography, Dropdown, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("buyOrders"); // Tab đang hoạt động
  const navigate = useNavigate();

  // Dữ liệu mẫu
  const buyOrders = [
    {
      id: "1",
      productImage: "https://via.placeholder.com/100",
      productName: "Product A",
      productType: "Type A",
      quantity: 2,
      totalPrice: 200000,
      status: "Pending",
    },
  ];

  const sellOrders = [
    {
      id: "2",
      productImage: "https://via.placeholder.com/100",
      productName: "Product B",
      productType: "Type B",
      quantity: 1,
      totalPrice: 100000,
      status: "Completed",
    },
  ];

  // Dữ liệu hiển thị theo tab
  const orders = activeTab === "buyOrders" ? buyOrders : sellOrders;

  // Menu thay đổi trạng thái order
  const statusMenu = (
    <Menu>
      <Menu.Item key="pending">Pending</Menu.Item>
      <Menu.Item key="completed">Completed</Menu.Item>
      <Menu.Item key="cancelled">Cancelled</Menu.Item>
    </Menu>
  );

  // Component hiển thị một order
  const OrderItem = ({ order }) => (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        width: "100%",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        backgroundColor: "#fff",
      }}
    >
      {/* Phần trên */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.parentElement.style.transform = "scale(1.02)";
          e.currentTarget.parentElement.style.boxShadow =
            "0 4px 10px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.parentElement.style.transform = "scale(1)";
          e.currentTarget.parentElement.style.boxShadow =
            "0 2px 5px rgba(0, 0, 0, 0.1)";
        }}
        onClick={() => navigate(`/profile-user/my-orders/${order.id}`)}
      >
        {/* Ảnh sản phẩm */}
        <img
          src={order.productImage}
          alt={order.productName}
          style={{ width: "120px", height: "120px", borderRadius: "8px" }}
        />
        {/* Thông tin sản phẩm */}
        <div style={{ flex: 1, marginLeft: "16px" }}>
          <Title level={5}>{order.productName}</Title>
          <Text type="secondary">{order.productType}</Text>
          <br />
          <Text>Số lượng: {order.quantity}</Text>
        </div>
        {/* Tổng tiền */}
        <div style={{ textAlign: "right", minWidth: "200px" }}>
          <Title level={4} style={{ color: "red" }}>
            {order.totalPrice.toLocaleString()} VND
          </Title>
          <Text>{order.status}</Text>
        </div>
      </div>

      {/* Phần dưới */}
      {activeTab === "sellOrders" && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "8px",
          }}
        >
          <Dropdown overlay={statusMenu} trigger={["click"]}>
            <Button type="primary" size="small">
              Thay đổi trạng thái
            </Button>
          </Dropdown>
        </div>
      )}
    </div>
  );

  return (
    <Layout>
      <Content style={{ padding: "16px", maxWidth: "100%", margin: "auto" }}>
        {/* Tabs dạng dòng chữ */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <Text
            style={{
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: activeTab === "buyOrders" ? "bold" : "normal",
              textDecoration: activeTab === "buyOrders" ? "underline" : "none",
              textDecorationColor:
                activeTab === "buyOrders" ? "gold" : "transparent",
            }}
            onClick={() => setActiveTab("buyOrders")}
          >
            Order Mua
          </Text>
          <Text
            style={{
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: activeTab === "sellOrders" ? "bold" : "normal",
              textDecoration: activeTab === "sellOrders" ? "underline" : "none",
              textDecorationColor:
                activeTab === "sellOrders" ? "gold" : "transparent",
            }}
            onClick={() => setActiveTab("sellOrders")}
          >
            Order Bán
          </Text>
        </div>

        {/* Danh sách order */}
        <List
          dataSource={orders}
          renderItem={(order) => <OrderItem order={order} />}
        />
      </Content>
    </Layout>
  );
};

export default MyOrders;
