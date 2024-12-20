import { Badge, Button, Col, Popover } from "antd";
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
import {
  AudioOutlined,
  CaretDownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
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
import { resetUser } from "../../redux/slides/userSlide";
import {
  clearFilters,
  removeFilter,
  setFilter,
} from "../../redux/slides/filterSlide";

const onSearch = (value, _e, info) => console.log(info?.source, value);

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("useid trong header", user.id);

  const filters = useSelector((state) => state.filter.filters); // Lấy filter từ Redux
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText) {
      dispatch(setFilter({ key: "name", value: searchText })); // Thêm filter name
    } else {
      dispatch(clearFilters()); // Xóa filter nếu ô input rỗng
    }
    console.log("filter:", filters);
  };

  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate("/signin");
  };
  const handleLogout = async () => {
    await UserService.logoutUser();
    dispatch(resetUser());
    console.log("user sau logout", user);
  };

  const handleNavigateProfileUser = () => {
    navigate("/profile-user/profile-account");
  };
  const handleNavigateAdmin = () => {
    navigate("/system/admin");
  };

  const handlePostProduct = () => {
    if (!user?.id) {
      navigate("/signin");
    } else {
      navigate("/dang-tin");
    }
  };

  const handleHomePage = () => {
    navigate("/");
  };
  const handleCart = () => {
    if (!user?.id) {
      navigate("/signin");
    }
    navigate("/cart");
  };

  const content = (
    <div>
      <WrapperContent onClick={handleNavigateProfileUser}>
        thông tin người dùng
      </WrapperContent>
      {user?.role === "admin" && (
        <WrapperContent onClick={handleNavigateAdmin}>
          system admin
        </WrapperContent>
      )}
      <WrapperContent onClick={handleLogout}>đăng xuất</WrapperContent>
    </div>
  );
  return (
    <div>
      <WrappeHeader gutter={10}>
        <Col span={5}>
          <WrapperTextHeader onClick={handleHomePage}>bkE</WrapperTextHeader>
        </Col>

        <Col span={11}>
          <div
            style={{
              display: "flex",
              backgroundColor: "rgb(243, 244, 247)",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <Input
              size="large"
              placeholder="input"
              variant="outlined"
              textButton="timkiem"
              style={{
                backgroundColor: "rgb(243, 244, 247)",
                border: "none",
                flex: 1, // Giúp thành phần này chiếm tối đa không gian
              }}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              size="large"
              style={{
                backgroundColor: "rgb(243, 244, 247)",
                border: "none",
                flexShrink: 0,
              }}
              icon={<SearchOutlined />}
              textButton="timkiem"
              onClick={handleSearch}
            >
              tìm kiếm
            </Button>
          </div>
        </Col>

        <Col
          span={6}
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <div>
            <WrapperIconCart>
              <Badge count={4}>
                <LocalMallIcon
                  style={{ fontSize: "40px" }}
                  onClick={handleCart}
                />
              </Badge>

              <div>
                <span style={{ whiteSpace: "nowrap" }} onClick={handleCart}>
                  {" "}
                  gio hang
                </span>
              </div>
            </WrapperIconCart>
          </div>

          <WrapperHeaderAccount>
            <div>
              <WrapperIconAccount>
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    style={{
                      width: "35px",
                      height: "35px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  ></img>
                ) : (
                  <AccountCircleIcon style={{ fontSize: "40px" }} />
                )}
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
                    {user?.name}
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

          {/* <WrapperListPostsIcon>
            <div>
              <FaListAlt size="40px" />
            </div>
            <div>
              <span style={{ whiteSpace: "nowrap" }}>quan li bai dang</span>
            </div>
          </WrapperListPostsIcon> */}

          <div>
            <Button
              size="large"
              styleButton={{
                backgroundColor: "rgb(255,136,0)",
                border: "none",
              }}
              bordered="false"
              icon=<BsFileEarmarkPostFill />
              onClick={handlePostProduct}
            >
              đăng bán
            </Button>
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
