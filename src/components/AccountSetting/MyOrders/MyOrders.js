import React, { useEffect, useState } from "react";
import { Layout, List, Typography, Dropdown, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as OrderService from "../../../service/OrderService";
import { updateOrder } from "../../../redux/slides/orderSlide";

const { Content } = Layout;
const { Title, Text } = Typography;

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("buyOrders"); // Tab đang hoạt động
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [buyOrder, setBuyOrder] = useState([]);
  const [sellOrder, setSellOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const order = useSelector((state) => state.order);

  useEffect(() => {
    setStatus(order.status); // Cập nhật trạng thái khi order thay đổi
  }, [order.status]); // Chỉ chạy khi order.status thay đổi

  console.log("order trong bo nho bd", order);

  const fetchBuyOrder = async () => {
    setIsLoading(true);
    try {
      const responseBuy = await OrderService.getBuyUserOrders(user.id);
      const responseSell = await OrderService.getSellUserOrders(user.id);
      const dataBuy = responseBuy.data;
      const dataSell = responseSell.data;
      console.log("data buy sau khi get", dataBuy);
      console.log("data sell sau khi get", dataSell);
      setBuyOrder(dataBuy);
      setSellOrder(dataSell);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBuyOrder();
  }, []);

  const navigate = useNavigate();

  // Dữ liệu mẫu

  // Dữ liệu hiển thị theo tab
  const orders = activeTab === "buyOrders" ? buyOrder : sellOrder;

  const [visibleCount, setVisibleCount] = useState(10); // Số lượng order hiển thị ban đầu

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10); // Hiển thị thêm 10 order
  };

  const visibleOrders = [...orders].reverse().slice(0, visibleCount); // Đảo ngược và lấy số lượng hiển thị

  const handleDetailOrder = (currentOrder, BuyOrSell) => {
    dispatch(updateOrder(currentOrder));
    console.log("currentOrder", currentOrder);

    navigate(`/profile-user/my-orders/${BuyOrSell}`);
  };
  const handleSetStatus = (newStatus) => {
    console.log("Trạng thái mới:", newStatus);
    setStatus(newStatus); // Cập nhật trạng thái
  };

  // Menu thay đổi trạng thái order
  const statusMenu = {
    items: [
      { key: "Pending", label: "Pending" },
      { key: "Completed", label: "Completed" },
      { key: "Cancelled", label: "Cancelled" },
    ],
    onClick: ({ key }) => handleSetStatus(key), // Gọi hàm setStatus với trạng thái được chọn
  };

  // Component hiển thị một order
  const OrderItem = ({ order, buyOrSell }) => (
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
        onClick={() => handleDetailOrder(order, buyOrSell)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flex: 1,
          }}
        >
          {/* Ảnh sản phẩm */}
          <img
            src={order.products[0].image}
            alt={order.products[0].name}
            style={{ width: "120px", height: "120px", borderRadius: "8px" }}
          />
          {/* Thông tin sản phẩm */}
          <div style={{ flex: 1, marginLeft: "16px" }}>
            <Title level={5}>{order.products[0].name}</Title>
            <Text type="secondary">{order.products[0].type}</Text>
            <br />
            <Text>Số lượng: {order.products[0].quantity}</Text>
          </div>
        </div>

        {/* Tổng tiền */}
        <div style={{ textAlign: "right", minWidth: "200px" }}>
          <Title level={4} style={{ color: "red" }}>
            {order.totalAmount.toLocaleString()} VND
          </Title>
          <Text>{order.status}</Text>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <Content style={{ padding: "16px", maxWidth: "100%", margin: "50px" }}>
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
          dataSource={visibleOrders}
          renderItem={(order) => (
            <OrderItem order={order} buyOrSell={activeTab} />
          )}
        />

        {/* Nút "Xem thêm" */}
        {visibleCount < orders.length && (
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <Button type="primary" onClick={handleLoadMore}>
              Xem thêm
            </Button>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default MyOrders;
