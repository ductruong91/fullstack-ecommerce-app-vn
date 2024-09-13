import { Col } from "antd";
import React from "react";
import {
  WrappeHeader,
  WrapperIconAccount,
  WrapperIconCart,
  WrapperTextHeader,
} from "./style";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

import { UserOutlined } from "@ant-design/icons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { WidthFull } from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import Navigation from "./Navigation/Navigation";

// const { Search } = Input;
// const suffix = (
//   <AudioOutlined
//     style={{
//       fontSize: 16,
//       color: "#1677ff",
//     }}
//   />
// );
const onSearch = (value, _e, info) => console.log(info?.source, value);

const HeaderComponent = () => {
  return (
    <div>
      <WrappeHeader gutter={100}>
        <Col span={6}>
          <WrapperTextHeader>bkE</WrapperTextHeader>
          {/* <div className="container">
            <div>

            </div>
          </div> */}
        </Col>

        <Col span={12}>
          <ButtonInputSearch
            size="large"
            placeholder="input"
            bordered="false"
            textButton="timkiem"
          />
        </Col>

        <Col
          span={6}
          style={{ display: "flex", gap: "10px", alignItems: "center" }}
        >
          <WrapperIconAccount>
            <AccountCircleIcon style={{ fontSize: "40px" }} />
          </WrapperIconAccount>

          <div>
            <WrapperIconCart>
              <LocalMallIcon style={{ fontSize: "40px" }} />
            </WrapperIconCart>
          </div>
          <div>
            <ButtonComponent
              size="large"
              styleButton={{
                backgroundColor: "rgb(255,136,0)",
                border: "none",
              }}
              bordered="false"
              icon=<BsFileEarmarkPostFill />
              textButton="đăng bán"
            />
          </div>
        </Col>
      </WrappeHeader>
      <Navigation/>
    </div>
  );
};

export default HeaderComponent;
