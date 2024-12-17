import React from "react";
import { Modal, Form, Input, Button, Avatar } from "antd";

const UserDetailForm = ({ user, setSelectedUser }) => {
  const { name, email, address, role, avatar, phone } = user;
  console.log("user trong detail form", name, email, address, role, avatar);

  const handleCancel = () => {
    setSelectedUser(null); // Đóng form khi nhấn hủy
  };

  return (
    <Modal
      title="User Information"
      visible={true}
      onCancel={handleCancel}
      footer={null} // Không có footer để thêm nút hủy và lưu
      width={500}
    >
      <Form layout="vertical">
        {/* Avatar and Name */}
        <div style={{ textAlign: "center" }}>
          <Avatar size={64} src={avatar} />
          <h2 style={{ fontWeight: "bold", marginTop: "10px" }}>{name}</h2>
        </div>
        <div>
          <strong>Email:</strong> <p>{email}</p>
        </div>
        <div>
          <strong>Address:</strong> <p>{address}</p>
        </div>
        <div>
          <strong>phone:</strong> <p>{phone}</p>
        </div>
        <div>
          <strong>Role:</strong> <p>{role}</p>
        </div>
        {/* Close button */}
        <div style={{ textAlign: "center" }}>
          <Button onClick={handleCancel} type="primary">
            Close
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserDetailForm;
