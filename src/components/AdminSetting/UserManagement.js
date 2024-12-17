import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import * as AdminService from "../../service/AdminService";
import { useQuery } from "@tanstack/react-query";
import UserDetailForm from "./UserDetailFormComponent/UserDetailForm";
import { success } from "../Message/Message";
import DeleteUserForm from "../DeleteUserFormComponent/DeleteUserForm";

const UserManagement = () => {
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux store
  console.log("acesstoken:", user.access_token);
  const [selectedUser, setSelectedUser] = useState(""); // Lưu trữ người dùng được chọn để xem chi tiết
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Quản lý modal xác nhận xóa
  const [userToDelete, setUserToDelete] = useState(null); // Lưu thông tin người dùng cần xóa
  const [data, setData] = useState([]); // Dữ liệu người dùng lưu trữ trong state

  //xu li get all User ra ngoai
  const fetchUserAll = async () => {
    const res = await AdminService.getAllUser(user.access_token);
    console.log("res", res.data);
    setData(res.data);
    return res.data;
  };

  const { data: AllUsers, isLoading } = useQuery({
    queryKey: ["users"], // Tên query key
    queryFn: fetchUserAll, // Hàm fetch API
    retry: 3,
    retryDelay: 1000,
  });

  console.log("data sau khi lay", AllUsers);

  // Các cột của bảng
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => handleView(record)} // Xem thông tin người dùng
            style={{ color: "blue" }}
          >
            View
          </a>
          <a onClick={() => handleDelete(record)} style={{ color: "red" }}>
            <DeleteOutlined /> Delete
          </a>
        </Space>
      ),
    },
  ];

  // Dữ liệu để in ra tất cả người
  // setData(AllUsers);
  //  const data = AllUsers;

  // Hàm xử lý xóa người dùng
  const handleDelete = (user) => {
    console.log("id nguoi can xoa", user._id);
    setUserToDelete(user);
    setIsDeleteModalVisible(true); // Hiển thị modal xác nhận
  };

  // Xử lý xác nhận xóa trong component DeleteUserForm
  const confirmDelete = async () => {
    setIsDeleteModalVisible(false); // Ẩn modal
    // Logic xóa người dùng (thực hiện API xóa ở đây)

    try {
      await AdminService.deleteUser(userToDelete._id, user.access_token);
      // Giả sử xóa thành công
      // Cập nhật lại state dữ liệu người dùng, loại bỏ người dùng vừa xóa
      setData((prevData) => prevData.filter((item) => item._id !== user._id));

      success(); // Hiển thị thông báo thành công
    } catch (error) {
      error(); // Hiển thị thông báo lỗi
    }
  };

  // Xử lý hủy bỏ xóa
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false); // Đóng modal khi người dùng hủy
  };

  // Hàm xử lý xem thông tin người dùng
  const handleView = (user) => {
    console.log("user", user);

    setSelectedUser(user); // Lưu trữ thông tin người dùng được chọn để hiển thị
    console.log("selecteduser:", selectedUser);
  };

  // useEffect để theo dõi sự thay đổi của selectedUser
  useEffect(() => {
    if (selectedUser) {
      console.log("Selected user has been updated:", selectedUser);
    }
  }, [selectedUser]); // Theo dõi khi selectedUser thay đổi

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="key" // Đảm bảo mỗi dòng có khóa duy nhất
        pagination={true} // Tắt phân trang nếu bạn muốn hiển thị tất cả
      />
      {/* Hiển thị modal xác nhận xóa người dùng */}
      <DeleteUserForm
        visible={isDeleteModalVisible}
        user={userToDelete}
        onConfirmDelete={confirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Hiển thị modal hoặc form chi tiết khi chọn một người dùng */}
      {selectedUser && (
        <UserDetailForm user={selectedUser} setSelectedUser={setSelectedUser} />
      )}
    </div>
  );
};

export default UserManagement;
