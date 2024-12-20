import React from "react";
import { Routes, Route } from "react-router-dom";

// Các component con
import Dashboard from "./Dashboard";
import UserManagement from "./UserManagement";
import OrderManagement from "./OrderManagement";
import AddAdmin from "./AddAdmin";
import ProductManagement from "./ProductManagement";
import DetailOrderForAdmin from "./DetailOrderAdmin/DetailOrderForAdmin";

const AdminContent = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/order-management" element={<OrderManagement />} />
        <Route
          path="/order-management/detail-order/:id"
          element={<DetailOrderForAdmin />}
        />
        <Route path="/add-admin" element={<AddAdmin />} />
      </Routes>
    </div>
  );
};

export default AdminContent;
