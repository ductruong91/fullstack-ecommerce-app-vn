import React from "react";
import { Button } from "antd";
import {
  IoIosList,
  IoMdCar,
  IoMdConstruct,
  IoMdPaw,
  IoMdHome,
  IoMdShirt,
  IoMdOptions,
  LuMonitorSmartphone,
} from "react-icons/io";

const TypeButton = ({ type, icon, isSelected, onClick }) => {
  return (
    <Button
      onClick={onClick}
      type={isSelected ? "primary" : "default"}
      style={{
        width: 100,
        height: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        textAlign: "center",
        overflow: "hidden", // Đảm bảo chữ không vượt quá khung
        textOverflow: "ellipsis", // Cho chữ chạy trong ô nếu không vừa
        whiteSpace: "normal",
      }}
    >
      {icon}
      <span
        style={{
          marginTop: 8,
          fontWeight: "bold",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {type}
      </span>
    </Button>
  );
};

export default TypeButton;
