import { keyboardImplementationWrapper } from "@testing-library/user-event/dist/keyboard";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import OrderPage from "./pages/OrderPage/OrderPage";
import { routes } from "./routes";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import FooterComponent from "./components/FooterComponent/FooterComponent";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>

      <FooterComponent />
    </div>
  );
}

export default App;
