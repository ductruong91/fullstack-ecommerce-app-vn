import React from "react";
import { Card } from "antd";

const TypeFilterComponent = ({ type, isSelected, onClick }) => {
  return (
    <Card
      onClick={onClick}
      style={{
        width: 120,
        margin: 10,
        cursor: "pointer",
        border: isSelected ? "2px solid #1890ff" : "1px solid #f0f0f0",
        textAlign: "center",
      }}
      cover={
        <img
          alt={type}
          src={`path/to/your/image/${type}.jpg`} // Đường dẫn đến hình ảnh
          style={{ height: 80, objectFit: "cover" }}
        />
      }
    >
      <Card.Meta title={type} />
    </Card>
  );
};

export default TypeFilterComponent;
