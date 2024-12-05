import { Col } from "antd";
import React from "react";
import {
  WrappeHeader,
  WrapperHeaderAccount,
  WrapperIconAccount,
  WrapperIconCart,
  WrapperListPostsIcon,
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
import { FaListAlt } from "react-icons/fa";

const onSearch = (value, _e, info) => console.log(info?.source, value);

const HeaderComponent = () => {
  return (
    <div>
      <WrappeHeader gutter={10}>
        <Col span={4}>
          <WrapperTextHeader>bkE</WrapperTextHeader>
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
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <div>
            <WrapperIconCart>
              <LocalMallIcon style={{ fontSize: "40px" }} />
            </WrapperIconCart>
          </div>

          <WrapperHeaderAccount>
            <div>
              <WrapperIconAccount>
                <AccountCircleIcon style={{ fontSize: "40px" }} />
              </WrapperIconAccount>
            </div>
            <div>
              <span> đăng nhập</span>
            </div>
          </WrapperHeaderAccount>

          <WrapperListPostsIcon>
              <div>
                <FaListAlt size="40px" />
              </div>
              <div>
                <span>quan li bai dang</span>
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
