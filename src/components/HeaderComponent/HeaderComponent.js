import { Badge, Col, Popover } from "antd";
import React, { useEffect, useState } from "react";
import {
  WrappeHeader,
  WrapperContent,
  WrapperHeaderAccount,
  WrapperIconAccount,
  WrapperIconCart,
  WrapperListPostsIcon,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import { AudioOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

import { UserOutlined } from "@ant-design/icons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { WidthFull } from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import Navigation from "./Navigation/Navigation";
import { FaListAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../service/UserService";
import { resetUser } from "../../redux/slides/userSilde";

const onSearch = (value, _e, info) => console.log(info?.source, value);

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log("user", user);

  const handleNavigateLogin = () => {
    navigate("/signin");
  };
  const handleLogout = async () => {
    await UserService.logoutUser();
    dispatch(resetUser());
    console.log("user sau logout", user);
  };

  const content = (
    <div>
      <WrapperContent>thông tin người dùng</WrapperContent>
      <WrapperContent onClick={handleLogout}>đăng xuất</WrapperContent>
    </div>
  );
  return (
    <div>
      <WrappeHeader gutter={10}>
        <Col span={5}>
          <WrapperTextHeader>bkE</WrapperTextHeader>
        </Col>

        <Col span={11}>
          <ButtonInputSearch
            size="large"
            placeholder="input"
            bordered="false"
            textButton="timkiem"
          />
        </Col>

        <Col
          span={6}
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <div>
            <WrapperIconCart>
              <Badge count={4}>
                <LocalMallIcon style={{ fontSize: "40px" }} />
              </Badge>

              <div>
                <span style={{ whiteSpace: "nowrap" }}> gio hang</span>
              </div>
            </WrapperIconCart>
          </div>

          <WrapperHeaderAccount>
            <div>
              <WrapperIconAccount>
                <AccountCircleIcon style={{ fontSize: "40px" }} />
              </WrapperIconAccount>
            </div>

            {user?.name ? (
              <>
                <Popover
                  placement="bottomLeft"
                  // title="tittle"
                  content={content}
                  trigger="click"
                >
                  <div
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {user.name}
                    <CaretDownOutlined />
                  </div>
                </Popover>
              </>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                <WrapperTextHeaderSmall> đăng nhập</WrapperTextHeaderSmall>
                <div>
                  {/* <WrapperTextHeaderSmall> tài khoan</WrapperTextHeaderSmall> */}
                </div>{" "}
              </div>
            )}
          </WrapperHeaderAccount>

          <WrapperListPostsIcon>
            <div>
              <FaListAlt size="40px" />
            </div>
            <div>
              <span style={{ whiteSpace: "nowrap" }}>quan li bai dang</span>
            </div>
          </WrapperListPostsIcon>

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
      <Navigation />
    </div>
  );
};

export default HeaderComponent;

// import React from "react";
// import { Link } from "react-router-dom";

// const Header = () => {
//   return (
//     <header>
//       <div className="logo">
//         <h1>My Ecommerce</h1>
//       </div>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//           <li>
//             <Link to="/cart">Cart</Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;
