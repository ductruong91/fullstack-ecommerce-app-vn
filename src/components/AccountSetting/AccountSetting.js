import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfileAccount from "./ProfileAccount/ProfileAccount";
import MyOrders from "./MyOrders/MyOrders";
import MyProducts from "./MyProducts/MyProducts";
import ChangePassword from "./ChangePassword/ChangePassword";
import styled from "styled-components";

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  background: #fff;
`;

const AccountSetting = () => {
  return (
    <ContentWrapper>
      <Routes>
        <Route path="profile-account" element={<ProfileAccount />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="my-products" element={<MyProducts />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Routes>
    </ContentWrapper>
  );
};

export default AccountSetting;
