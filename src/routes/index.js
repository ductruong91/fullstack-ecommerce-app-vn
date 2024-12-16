import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/:type",
    page: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/product",
    page: ProductPage,
    isShowHeader: true,
  },
  {
    path: "/signin",
    page: SignInPage,
    isShowHeader: false,
  },

  {
    path: "/signup",
    page: SignUpPage,
    isShowHeader: false,
  },

  {
    path: "/product-detail",
    page: ProductDetailPage,
    isShowHeader: true,
  },

  {
    path: "/profile-user/*",
    page: ProfilePage,
    isShowHeader: true,
  },

  {
    path: "*",
    page: NotFoundPage,
  },
];
