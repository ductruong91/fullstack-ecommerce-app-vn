import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Layout,
  Typography,
  Divider,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../../service/UserService";

import * as OrderService from "../../../service/OrderService";
import { updateOrder } from "../../../redux/slides/orderSlide";

const { Content } = Layout;
const { Title, Text } = Typography;
const statusMapping = {
  completed: "Đã xong",
  pending: "Đang chuẩn bị",
  cancelled: "Bị hủy",
};

const OrderDetail = () => {
  const buyOrSell = useParams();
  const dispatch = useDispatch();
  const { id } = useParams(); // Lấy ID order từ URL
  const navigate = useNavigate(); // Điều hướng trang
  const order = useSelector((state) => state.order);
  console.log("orders se render", order);
  const [buyer, setBuyer] = useState({});
  const [seller, setSeller] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(order.status); // Cập nhật trạng thái khi order thay đổi
    console.log("buyorsell", buyOrSell);
  }, [order.status]); // Chỉ chạy khi order.status thay đổi

  console.log("status ban dau", statusMapping[status]);

  const handleSetStatus = (newStatus) => {
    console.log("Trạng thái mới:", newStatus);
    setStatus(newStatus); // Cập nhật trạng thái
    dispatch(updateOrder({ ...order, status: newStatus })); // Cập nhật trạng thái order
  };

  // Menu thay đổi trạng thái order
  const statusMenu = {
    items: [
      { key: "pending", label: "đang chuẩn bị" },
      { key: "completed", label: "hoàn thành đơn hàng" },
      { key: "cancelled", label: "hủy đơn hàng" },
    ],
    onClick: ({ key }) => handleSetStatus(key), // Gọi hàm setStatus với trạng thái được chọn
  };

  const fetchOrder = async () => {
    setIsLoading(true);
    try {
      const responseBuy = await UserService.getDetailUser(
        order.buyerId._id ? order.buyerId._id : order.buyerId
      );
      const responseSell = await UserService.getDetailUser(
        order.sellerId._id ? order.sellerId._id : order.sellerId
      );
      const dataBuy = responseBuy.data;
      const dataSell = responseSell.data;
      console.log("data nguoi mua", dataBuy);
      console.log("data nguoi ban", dataSell);
      setBuyer(dataBuy);
      setSeller(dataSell);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  let product;
  if (Array.isArray(order.products)) {
    product = order.products[0];
  } else {
    product = order.products; // Gán bằng đối tượng order.products bình thường }
  }

  console.log("product san pham trong order cần detail", product);

  const handleCloseOrder = async () => {
    const updatedOrder = {
      ...order,
      status: status,
      buyerId: order.buyerId._id ? order.buyerId._id : order.buyerId,
      sellerId: order.sellerId._id ? order.sellerId._id : order.sellerId,
    };
    await OrderService.updateOrder(updatedOrder);
    navigate("/profile-user/my-order");
  };

  return (
    <Layout>
      <Content
        style={{
          padding: "16px",
          maxWidth: "800px",
          margin: "auto",
          backgroundColor: "#fff",
          borderRadius: "8px",
          position: "relative", // Để căn chỉnh nút "Đóng"
        }}
      >
        {/* Nút đóng */}
        <Button
          type="primary"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
          }}
          onClick={() => handleCloseOrder()} // Chuyển hướng đến trang khác
        >
          Đóng
        </Button>

        {buyOrSell.id !== "buyOrders" && (
          <Dropdown menu={statusMenu} trigger={["click"]}>
            <Button type="primary" size="small">
              Thay đổi trạng thái
            </Button>
          </Dropdown>
        )}

        {/* Tiêu đề */}
        <Title level={3} style={{ textAlign: "center", marginBottom: "16px" }}>
          Chi tiết Order
        </Title>

        {/* Thông tin người mua và người bán */}
        <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
          <Col span={12}>
            <Card bordered>
              <Title level={5}>Người Mua</Title>
              <Text>
                <strong>Tên:</strong> {buyer.name}
              </Text>
              <br />
              <Text>
                <strong>Email:</strong> {buyer.email}
              </Text>
              <br />
              <Text>
                <strong>Số điện thoại:</strong> {buyer.phone}
              </Text>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered>
              <Title level={5}>Người Bán</Title>
              <Text>
                <strong>Tên:</strong> {seller.name}
              </Text>
              <br />
              <Text>
                <strong>Email:</strong> {seller.email}
              </Text>
              <br />
              <Text>
                <strong>Số điện thoại:</strong> {seller.phone}
              </Text>
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* Thông tin sản phẩm */}
        <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
          <Col span={8}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Col>
          <Col span={16}>
            <Title level={5}>{product.name}</Title>
            <Text>
              <strong>Số lượng:</strong> {product.quantity}
            </Text>
            <br />
            <Text>
              <strong>Giá:</strong> {product.price.toLocaleString()} VND
            </Text>
            <br />
            <Text>
              <strong>Tổng tiền sản phẩm:</strong>{" "}
              {order.totalPrice.toLocaleString()} VND
            </Text>
          </Col>
        </Row>

        <Divider />

        {/* Thông tin thanh toán và vận chuyển */}
        <Card bordered>
          <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
            <Col span={12}>
              <Text>
                <strong>Địa chỉ giao hàng:</strong>{" "}
                {order.shippingAddress.address}
              </Text>
              <br />
              <Text>
                <strong>Người nhận:</strong> {order.shippingAddress.name}
              </Text>
              <br />
              <Text>
                <strong>Số điện thoại:</strong> {order.shippingAddress.phone}
              </Text>
            </Col>
            <Col span={12}>
              <Text>
                <strong>Phương thức thanh toán:</strong> {order.paymentMethod}
              </Text>
              <br />
              <Text>
                <strong>Trạng thái thanh toán:</strong>{" "}
                {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
              </Text>
              <br />
              <Text>
                <strong>Trạng thái đơn hàng:</strong> {statusMapping[status]}
              </Text>
            </Col>
          </Row>

          <Divider />

          {/* Tổng tiền */}
          <Text>
            <strong>Phí giao hàng:</strong>{" "}
            {order.shippingPrice.toLocaleString()} VND
          </Text>
          <br />
          <Text>
            <strong>Thuế:</strong> {order.taxPrice.toLocaleString()} VND
          </Text>
          <br />
          <Title level={4} style={{ color: "red", marginTop: "16px" }}>
            Tổng cộng: {order.totalAmount.toLocaleString()} VND
          </Title>
        </Card>
      </Content>
    </Layout>
  );
};

export default OrderDetail;
