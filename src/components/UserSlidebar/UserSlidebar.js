import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Sidebar = styled.div`
  ${"" /* width: 20%; */}
  background: #f0f0f0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled(NavLink)`
  padding: 10px 15px;
  text-decoration: none;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
  text-align: center;
  transition: 0.3s;

  &.active {
    background: #ddd;
    color: #000;
  }

  &:hover {
    background: #eee;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ddd;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const UserSidebar = () => {
  const user = useSelector((state) => state.user);
  return (
    <Sidebar>
      {/* Avatar hiển thị tên viết tắt nếu không có hình ảnh */}
      {/* Avatar */}
      <AvatarWrapper>
        {user?.avatar ? (
          <AvatarImage src={user.avatar} alt="User Avatar" />
        ) : (
          <div style={{ color: "#555", fontSize: "24px" }}>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
      </AvatarWrapper>
      {/* Hiển thị tên người dùng */}
      <UserName>{user?.name || "Guest"}</UserName>

      <Button to="profile-account">Profile Account</Button>
      <Button to="my-orders">My Orders</Button>
      <Button to="my-products">My Products</Button>
      <Button to="change-password">Change Password</Button>
    </Sidebar>
  );
};

export default UserSidebar;
