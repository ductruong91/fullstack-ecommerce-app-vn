import React from "react";
import Box from "@mui/material/Box";
import {
  WrapperButtonNavbar,
  WrapperLabelText,
  WrapperNavbar,
  WrapperTextButtonNavbar,
} from "./style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { SearchOutlined } from "@ant-design/icons";
import iconXeCo from "../../assets/images/icon-xeco.png";
import { Checkbox } from "antd";
import { Label } from "@mui/icons-material";

const NavbarComponent = () => {
  const renderContent = (type, option) => {
    switch (type) {
      case "text":
        return option.map((option) => {
          return (
            <div key={option.id}>
              <WrapperButtonNavbar key={option.id}>
                <WrapperTextButtonNavbar>{option}</WrapperTextButtonNavbar>
              </WrapperButtonNavbar>
            </div>
          );
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            {option.map((option, index) => {
              return (
                <Checkbox key={index} value={option.value}>
                  {option.Label}
                </Checkbox>
              );
            })}

            {/* <Checkbox value="B">B</Checkbox> */}
          </Checkbox.Group>
        );
      case "price":
        return option.map((option) => {
          return (
            <div
              key={option.id}
              style={{
                borderRadius: "10px",
                backgroundColor: "#ccc",
                width: "fit-content",
              }}
            >
              {option}
            </div>
          );
        });
      default:
        return;
    }
  };

  return (
    <WrapperNavbar>
      <WrapperLabelText>label</WrapperLabelText>

      {renderContent("text", [
        "xe",
        "do dien lanh",
        "laptop",
        "đồ dùng học tập",
        "thú cưng",
        "thời trang",
        "đồ nội thất",
      ])}

      {renderContent("checkbox", [
        { value: "a", Label: "A" },
        { value: "b", Label: "B" },
      ])}

      {renderContent("price", ["duoi 400.000", "tu 400.000 - 500.000"])}
    </WrapperNavbar>
  );
};

export default NavbarComponent;
