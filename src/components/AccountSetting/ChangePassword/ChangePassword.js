import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useSelector } from "react-redux";
// const bcrypt = require("bcrypt");

const ChangePassword = ({}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useSelector((state) => state.user);

  //ở đây cần so sánh bằng bcrypt cơ vì mk backend được mã hóa rồi
  const handleSubmit = async () => {
    if (currentPassword !== user.password) {
      message.error("Mật khẩu hiện tại không chính xác!");

      return;
    }

    if (newPassword !== confirmPassword) {
      message.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    if (newPassword.length < 6) {
      message.error("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    try {
      // Gửi API lên server cập nhật mật khẩu
      // await onUpdatePassword(newPassword);
      message.success("Cập nhật mật khẩu thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Đổi mật khẩu</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Mật khẩu hiện tại">
          <Input.Password
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Nhập mật khẩu hiện tại"
            required
          />
        </Form.Item>
        <Form.Item label="Mật khẩu mới">
          <Input.Password
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới"
            required
          />
        </Form.Item>
        <Form.Item label="Xác nhận mật khẩu mới">
          <Input.Password
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Xác nhận mật khẩu mới"
            required
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
