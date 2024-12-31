import React, { useEffect, useState } from "react";
import {
  Layout,
  List,
  Checkbox,
  Divider,
  Typography,
  Button,
  Modal,
  Input,
  Radio,
} from "antd";
import { DeleteOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart } from "../../redux/slides/cartSlide";
import * as OrderService from "../../service/OrderService";
import * as ProductService from "../../service/ProductService";
import { useNavigate } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

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
      onChange={() => onToggle(product._id)}
      style={{ marginRight: 10 }}
    />
    <img
      src={product.images[0]}
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
        onClick={() => onDelete(product._id)}
        style={{ marginLeft: 10 }}
      />
    </div>
  </div>
);

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState(null); //trang thái chọn loại thanh toán

  console.log("cart", cart);

  useEffect(() => {
    if (cart.products) {
      const updatedProducts = cart.products.map((product) => ({
        ...product,
        checked: false, // Thêm trạng thái checked mặc định
      }));
      setProducts(updatedProducts);
    }
  }, [cart.products]);

  // useEffect(() => {
  //   setProducts((prevProducts) => [updatedProduct, ...prevProducts]);
  // }, []);

  // console.log("currentProduct", currentProduct);

  const [checkAll, setCheckAll] = useState(false);

  // Toggle checkbox của từng sản phẩm
  const toggleProduct = (_id) => {
    console.log("id duoc chon", _id);

    setProducts((prev) =>
      prev.map((product) =>
        product._id === _id
          ? { ...product, checked: !product.checked }
          : product
      )
    );
  };

  // Xử lý xóa sản phẩm
  const handleDelete = (_id) => {
    setProducts(products.filter((product) => product._id !== _id));
    dispatch(removeProductFromCart(_id));
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

  const handleCheckout = async () => {
    if (!user?.id) {
      navigate("/sign-in");
    }
    // Lọc sản phẩm được chọn
    const selectedProducts = products.filter((product) => product.checked);
    console.log("selectedProducts", selectedProducts);
    // Tạo danh sách order cho từng sản phẩm được chọn
    const orders = selectedProducts.map((product) => ({
      buyerId: user.id, // Người mua
      sellerId: product.userId, // Người bán
      products: [
        {
          productId: product._id,
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          image: product.images?.[0] || "",
          type: product.type || "",
        },
      ],
      totalAmount: total + shipping,
      status: "pending",
      shippingAddress: {
        address: address, // Địa chỉ giao hàng
        name: user.name,
        phone: user.phone,
      },
      paymentMethod: paymentMethod,
      shippingPrice: shipping,
      taxPrice: 0,
      totalPrice: product.price * product.quantity,
      isPaid: paymentMethod === "COD" ? false : true,
      paidAt: "",
      isDelivered: false,
      deliveredAt: "",
    }));



    // Gửi từng order lên server
    const createdOrders = await Promise.all(
      orders.map((order) => OrderService.createOrder(order))
    );

    for (const product of selectedProducts) {
      dispatch(removeProductFromCart(product._id));
      const productGetFromServer = await ProductService.getDetailProduct(
        product._id
      );
      console.log(
        "stock of productGetFromServer",
        productGetFromServer.data.stock
      );

      if (product.quantity === productGetFromServer.data.stock) {
        await ProductService.deleteProduct(product._id);
      } else {
        const updatedProduct = {
          ...productGetFromServer.data,
          stock: productGetFromServer.data.stock - product.quantity,
        };
        await ProductService.updateProduct(product._id, updatedProduct);
      }
    }

    alert("Thanh toán thành công!");

    navigate("/");
  };

  const [address, setAddress] = useState(user.address);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState(user.address); // Ban đầu lấy từ user.address

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setAddress(newAddress); // Cập nhật địa chỉ
    setIsModalVisible(false); // Đóng form
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Đóng form mà không cập nhật
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      // Xử lý thông tin giao dịch sau khi thanh toán thành công
      console.log("Thanh toán thành công!", details);

      // Ví dụ: bạn có thể hiển thị thông báo hoặc lưu thông tin giao dịch vào cơ sở dữ liệu
      alert(
        `Thanh toán thành công! Chào mừng, ${details.payer.name.given_name}`
      );
      handleCheckout();

      // Gọi API để lưu thông tin giao dịch vào cơ sở dữ liệu (nếu cần)
      // ví dụ: savePaymentDetails(details);
    });
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
              <Text>{user.address}</Text>
            </div>
            <Button type="link" onClick={showModal}>
              Thay đổi
            </Button>

            <Modal
              title="Thay đổi địa chỉ"
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Cập nhật"
              cancelText="Hủy"
            >
              <Input
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Nhập địa chỉ mới"
              />
            </Modal>
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
          {/* Chọn lựa chọn thanh toán */}
          <div style={{ marginBottom: "20px" }}>
            <Radio.Group
              onChange={(e) => setPaymentMethod(e.target.value)} // Cập nhật lựa chọn thanh toán
              value={paymentMethod}
              style={{ justifyContent: "flex-start" }}
            >
              <Radio value="COD">Thanh toán khi nhận hàng</Radio>{" "}
              {/* Thanh toán khi nhận hàng */}
              <Radio value="PayPal" style={{ marginLeft: "10px" }}>
                Thanh toán qua PayPal
              </Radio>{" "}
              {/* Thanh toán qua PayPal */}
            </Radio.Group>
          </div>

          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={4}>Tổng cộng:</Title>
            <Title level={4}>{total > 0 ? total + shipping : 0} VND</Title>
          </div>

          {/* Nút mua hàng */}
          {/* <Button
            type="primary"
            block
            style={{ marginTop: "10px" }}
            onClick={handleCheckout}
            disabled={total === 0}
          >
            Mua hàng
          </Button> */}

          {paymentMethod === "COD" ? (
            <Button
              type="primary"
              block
              style={{ marginTop: "10px" }}
              onClick={handleCheckout}
              disabled={total === 0}
            >
              Mua hàng (Thanh toán khi nhận hàng)
            </Button>
          ) : paymentMethod === "PayPal" ? (
            <PayPalScriptProvider options={{ clientId: "test" }}>
              <PayPalButtons
                style={{ layout: "horizontal" }}
                onApprove={handleApprove} // Thêm hàm handleApprove vào đây
                onError={(err) => {
                  // Xử lý lỗi nếu có
                  console.error(
                    "Có lỗi xảy ra trong quá trình thanh toán",
                    err
                  );
                  alert("Thanh toán không thành công! Vui lòng thử lại.");
                }}
              />
            </PayPalScriptProvider>
          ) : null}
        </div>
      </Content>
    </Layout>
  );
};

export default ShoppingCart;
