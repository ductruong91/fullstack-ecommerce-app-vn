import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PostProductPage from "../pages/PostProductPage/PostProductPage";
import ShoppingCartPage from "../pages/ShoppingCartPage/ShoppingCartPage";
 import ProductPayPage from "../pages/ProductPayPage/ProductPayPage"

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
    path: "/product-detail/:id",
    page: ProductDetailPage,
    isShowHeader: true,
  },

  {
    path: "/profile-user/*",
    page: ProfilePage,
    isShowHeader: true,
  },

  {
    path: "/system/admin/*",
    page: AdminPage,
    isShowHeader: false,
    isAdmin: true,
  },

  {
    path: "/dang-tin",
    page: PostProductPage,
    isShowHeader: true,
  },

  {
    path: "/cart",
    page: ShoppingCartPage,
    isShowHeader: true,
  },

  {
    path: "/checkout",
    page: ProductPayPage,
    isShowHeader: true,
  },

  {
    path: "*",
    page: NotFoundPage,
  },
];
