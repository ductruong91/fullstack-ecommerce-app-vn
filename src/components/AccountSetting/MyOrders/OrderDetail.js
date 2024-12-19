import React from "react";
import { useParams } from "react-router-dom";
import { Layout, Typography, Divider, Row, Col, Card } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

const OrderDetail = () => {
  const { id } = useParams(); // Lấy ID order từ URL

  // Dữ liệu mẫu
  const order = {
    id,
    buyerId: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0123456789",
    },
    sellerId: {
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0987654321",
    },
    products: [
      {
        productId: "1",
        name: "Product A",
        quantity: 2,
        price: 200000,
        image: "https://via.placeholder.com/150",
      },
    ],
    totalAmount: 400000,
    status: "Pending",
    shippingAddress: {
      name: "Nguyễn Văn A",
      phone: "0123456789",
      address: "123 ABC Street, Hà Nội",
    },
    paymentMethod: "Tra sau",
    shippingPrice: 30000,
    taxPrice: 20000,
    totalPrice: 450000,
    isPaid: false,
    paidAt: null,
    isDelivered: false,
    deliveredAt: null,
  };

  const product = order.products[0]; // Order chỉ có 1 sản phẩm

  return (
    <Layout>
      <Content
        style={{
          padding: "16px",
          maxWidth: "800px",
          margin: "auto",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
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
                <strong>Tên:</strong> {order.buyerId.name}
              </Text>
              <br />
              <Text>
                <strong>Email:</strong> {order.buyerId.email}
              </Text>
              <br />
              <Text>
                <strong>Số điện thoại:</strong> {order.buyerId.phone}
              </Text>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered>
              <Title level={5}>Người Bán</Title>
              <Text>
                <strong>Tên:</strong> {order.sellerId.name}
              </Text>
              <br />
              <Text>
                <strong>Email:</strong> {order.sellerId.email}
              </Text>
              <br />
              <Text>
                <strong>Số điện thoại:</strong> {order.sellerId.phone}
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
              {(product.quantity * product.price).toLocaleString()} VND
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
                <strong>Trạng thái giao hàng:</strong>{" "}
                {order.isDelivered ? "Đã giao" : "Chưa giao"}
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
            Tổng cộng: {order.totalPrice.toLocaleString()} VND
          </Title>
        </Card>
      </Content>
    </Layout>
  );
};

export default OrderDetail;
