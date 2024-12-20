import React, { useEffect, useState } from "react";
import { Layout, List, Checkbox, Divider, Typography, Button } from "antd";
import { DeleteOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart } from "../../redux/slides/cartSlide";
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
        address: user.address, // Địa chỉ giao hàng
        name: user.name,
        phone: user.phone,
      },
      paymentMethod: "tra sau",
      shippingPrice: shipping,
      taxPrice: 0,
      totalPrice: product.price * product.quantity,
      isPaid: false,
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
        // await ProductService.deleteProduct(product._id);
      } else {
        const updatedProduct = {
          ...productGetFromServer.data,
          stock: productGetFromServer.data.stock - product.quantity,
        };
        // await ProductService.updateProduct(product._id, updatedProduct);
      }
    }

    alert("Thanh toán thành công!");

    navigate("/");
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
