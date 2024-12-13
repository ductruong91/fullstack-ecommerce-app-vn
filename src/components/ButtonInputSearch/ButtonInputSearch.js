import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import { CiSearch } from "react-icons/ci";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const { size, placeholder, textButton } = props;
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "rgb(243, 244, 247)",
        borderRadius: "10px",
      }}
    >
      <Input
        size={size}
        placeholder={placeholder}
        variant="outlined"
        style={{ backgroundColor: "rgb(243, 244, 247)" }}
      />

      <Button
        size={size}
        style={{ backgroundColor: "rgb(243, 244, 247)", border: "none" }}
        icon={<SearchOutlined />}
        textButton={textButton}
      >
        {textButton}
      </Button>
    </div>
  );
};

export default ButtonInputSearch;
