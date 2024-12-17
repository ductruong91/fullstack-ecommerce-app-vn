import React from "react";
import { Form, Modal, Button } from "antd";
// import { success, error } from "../../components/Message"; // Thông báo thành công, thất bại

const DeleteUserForm = ({ visible, user, onConfirmDelete, onCancel }) => {
  return (
    <Modal
      title="Confirm Deletion"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          danger
          onClick={() => {
            onConfirmDelete(user); // Xác nhận xóa người dùng
          }}
        >
          Delete
        </Button>,
      ]}
    >
      <p>
        Are you sure you want to delete the user <strong>{user?.name}</strong>?
      </p>
    </Modal>
  );
};

export default DeleteUserForm;
