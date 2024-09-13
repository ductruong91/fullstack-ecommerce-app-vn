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

const NavbarComponent = () => {
  const renderContent = (type, option) => {
    switch (type) {
      case "text":
        return option.map((option) => {
          return (
            <div>
              <WrapperButtonNavbar>
                <img
                  src={iconXeCo}
                  style={{
                    width: "auto",
                    height: "32px",
                    objectfit: "contain",
                  }}
                />
                <WrapperTextButtonNavbar>{option}</WrapperTextButtonNavbar>
              </WrapperButtonNavbar>
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
    </WrapperNavbar>
  );
};

export default NavbarComponent;
