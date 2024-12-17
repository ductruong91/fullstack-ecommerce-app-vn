import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  ProductOutlined,
} from "@ant-design/icons";

const AdminSidebar = () => {
  return (
    <Layout.Sider width={256} theme="dark">
      <div
        style={{
          padding: "16px",
          color: "#fff",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Quản Lý Admin
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="user-management">Quản Lý Người Dùng</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ProductOutlined />}>
          <Link to="user-management">Quản Lý bài đăng/quản lí sản phẩm</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<ShoppingCartOutlined />}>
          <Link to="order-management">Quản Lý Đơn Hàng</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<UserAddOutlined />}>
          <Link to="add-admin">Thêm Admin</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default AdminSidebar;
