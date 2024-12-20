import React, { useEffect, useState } from "react";
import { Button, Space, Table, Image, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as AdminService from "../../service/AdminService";
import * as OrderService from "../../service/OrderService";
import { useQuery } from "@tanstack/react-query";
import { success, error } from "../Message/Message";
import { useSelector } from "react-redux";

const OrderManagement = () => {
  const [data, setData] = useState([]); // Dữ liệu đơn hàng
  const [orderToDelete, setOrderToDelete] = useState(null); // Đơn hàng cần xóa
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Hiển thị modal xác nhận xóa

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Hàm lấy danh sách đơn hàng
  const fetchOrders = async () => {
    const res = await OrderService.getAllOrder(); // Thay bằng API thực tế
    setData(res.data);
    return res.data;
  };

  useQuery({
    queryKey: ["orders"], // Tên query key
    queryFn: fetchOrders, // Hàm fetch API
    retry: 3,
    retryDelay: 1000,
  });

  // Hàm xử lý xóa đơn hàng
  const handleDelete = (order) => {
    setOrderToDelete(order);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await OrderService.deleteOrder(orderToDelete._id, user.access_token); // Thay bằng API xóa thực tế
      setData((prevData) =>
        prevData.filter((item) => item._id !== orderToDelete._id)
      );
      success("Xóa đơn hàng thành công!");
    } catch (err) {
      error("Xóa đơn hàng thất bại!");
    } finally {
      setIsDeleteModalVisible(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  // Cấu hình cột của bảng
  const columns = [
    {
      title: "Người Bán",
      dataIndex: ["sellerId", "name"],
      key: "seller",
      render: (text) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Người Mua",
      dataIndex: ["buyerId", "name"],
      key: "buyer",
      render: (text) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: ["products", 0, "name"], // Lấy tên sản phẩm đầu tiên
      key: "productName",
      render: (text) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Hình Ảnh",
      dataIndex: ["products", 0, "image"], // Lấy ảnh sản phẩm đầu tiên
      key: "productImage",
      render: (url) =>
        url ? (
          <Image
            src={url}
            alt="product"
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: "4px" }}
          />
        ) : (
          "N/A"
        ),
    },
    {
      title: "Số Lượng",
      dataIndex: ["products", 0, "quantity"], // Lấy số lượng sản phẩm đầu tiên
      key: "quantity",
      render: (text) => <span>{text || "0"}</span>,
    },
    {
      title: "Địa Chỉ Giao",
      dataIndex: ["shippingAddress", "address"],
      key: "shippingAddress",
      render: (text) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "geekblue";
        if (status === "completed") color = "green";
        else if (status === "cancelled") color = "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => navigate(`/order-detail/${record._id}`)} // Điều hướng đến trang chi tiết
            style={{ color: "blue" }}
          >
            <EyeOutlined /> Xem Chi Tiết
          </a>
          <a
            onClick={() => handleEditStatus(record)} // Hàm chỉnh sửa trạng thái
            style={{ color: "orange" }}
          >
            <EditOutlined /> Chỉnh Sửa
          </a>
          <a
            onClick={() => handleDelete(record)} // Hàm xóa
            style={{ color: "red" }}
          >
            <DeleteOutlined /> Xóa
          </a>
        </Space>
      ),
    },
  ];

  const handleEditStatus = (order) => {
    console.log("Edit trạng thái order:", order); // Thay bằng logic thực tế
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quản Lý Đơn Hàng</h2>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        pagination={true}
      />
    </div>
  );
};

export default OrderManagement;
