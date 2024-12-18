import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import * as AdminService from "../../service/AdminService";
import { useQuery } from "@tanstack/react-query";
import UserDetailForm from "./UserDetailFormComponent/UserDetailForm";
import { success } from "../Message/Message";
import DeleteUserForm from "../DeleteUserFormComponent/DeleteUserForm";
import Highlighter from "react-highlight-words";

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

  //các thành phần liên quan đến getSearchcolum

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    // handleSearch('', )
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      // Lấy giá trị của cột theo dataIndex
      const recordValue = record[dataIndex];

      // Kiểm tra nếu recordValue là hợp lệ và có thể chuyển thành chuỗi
      return (
        recordValue &&
        recordValue.toString().toLowerCase().includes(value.toLowerCase())
      );
    },
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    
  });

  // Các cột của bảng
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => {
        const nameA = a.name ?? ""; // tranh th cos may dua moi tao tk, chua co ten
        const nameB = b.name ?? "";
        return nameA.length - nameB.length;
      },
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
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
      sorter: (a, b) => {
        const roleA = a.role ?? ""; // tranh th cos may dua moi tao tk, chua co ten
        const roleB = b.role ?? "";
        return roleA.length - roleB.length;
      },
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
