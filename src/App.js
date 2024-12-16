import { keyboardImplementationWrapper } from "@testing-library/user-event/dist/keyboard";
import React, { Fragment, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Await,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import OrderPage from "./pages/OrderPage/OrderPage";
import { routes } from "./routes";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./ultils";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slides/userSilde";
import * as UserService from "./service/UserService";

function App() {
  // const fetchApi = async () => {
  //   const res = await axios.get(
  //     `${process.env.REACT_APP_API_KEY}/product/get-all-product`
  //   );
  //   return res.data;
  // };
  // const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });
  // console.log("query", query);
  const dispatch = useDispatch();
  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    console.log("storagedata", storageData); // In ra giá trị access token sau khi parse

    return {decoded, storageData};
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();

      const currentTime = new Date();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data.access_token} `;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                    {/* {route.isShowHeader && <FooterComponent />} */}
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
