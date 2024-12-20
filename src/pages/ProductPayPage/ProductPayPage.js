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
} from "antd";
import { DeleteOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeLastProduct } from "../../redux/slides/cartSlide";
import * as OrderService from "../../service/OrderService";
import * as ProductService from "../../service/ProductService";
import { useNavigate } from "react-router-dom";

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

const ProductPayPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const currentProduct = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);

  const [products, setProducts] = useState([]); // chỉ có tác dụng để in

  console.log("cart hien tai", cart);

  useEffect(() => {
    const quantity = cart.products[cart.products.length - 1].quantity;
    const updatedProduct = {
      ...currentProduct,
      quantity: quantity,
      checked: true,
    };
    setProducts((prevProducts) => [updatedProduct, ...prevProducts]);
    dispatch(removeLastProduct());
  }, []);

  console.log("currentProduct", currentProduct);

  const [checkAll, setCheckAll] = useState(false);

  // Toggle checkbox của từng sản phẩm
  const toggleProduct = (_id) => {
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
    const currentOrder = {
      buyerId: user.id, // Người mua
      sellerId: currentProduct.userId, // Người bán
      products: [
        {
          productId: currentProduct.id,
          name: currentProduct.name,
          quantity: 1,
          price: currentProduct.price,
          image: currentProduct.images?.[0] || "",
          type: currentProduct.type || "",
        },
      ],
      totalAmount: total + shipping,
      status: "pending",
      shippingAddress: {
        address: address, //làm lại cần kiểm tra phần địa chỉ giao hàng là user address hay đã thay đổi
        name: user.name,
        phone: user.phone,
      },
      paymentMethod: "tra sau",
      shippingPrice: shipping,
      taxPrice: 0,
      totalPrice: total,
      isPaid: false,
      paidAt: "",
      isDelivered: false,
      deliveredAt: "",
    };

    console.log("currentOrder", currentOrder);
    // Gửi dữ liệu đơn hàng lên server
    const order = await OrderService.createOrder(currentOrder);
    const quantity = currentOrder.products[0].quantity;

    if (quantity === currentProduct.stock) {
      // ProductService.deleteProduct(currentProduct.id);
      console.log("het hang");
    } else {
      ProductService.updateProduct({
        ...currentProduct,
        stock: currentProduct.stock, //( -quantity mới đúng nhé)
        _id: currentProduct.id, //vi trong current khong co _id ma la id huhu :(((((())))))
      });
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
          <Title level={4}>Thanh Toán</Title>
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
              <Text>{address}</Text>
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

export default ProductPayPage;
