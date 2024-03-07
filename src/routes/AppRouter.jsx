import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginForm from "../layout/LoginForm";
import RegisterForm from "../layout/RegisterForm";
import useAuth from "../hooks/useAuth";
import Header from "../layout/Header";
import UserHome from "../layout/UserHome";
import ProductDetails from "../components/ProductDetails";
import CreateProduct from "../admin/CreateProduct";
import UpdateProduct from "../admin/UpdateProduct";
import CreateCollection from "../admin/CreateCollection";
import CreateBrand from "../admin/CreateBrand";
import CreateSeries from "../admin/CreateSeries";
import AdminHome from "../admin/AdminHome";
import Profile from "../layout/Profile";
import Address from "../layout/Address";
import CreateAddress from "../components/CreateAddress";
import UpdateAddress from "../components/UpdateAddress";
import Cart from "../layout/Cart";
import Order from "../layout/Order";
import UserOrder from "../layout/UserOrder";
import Favorite from "../layout/Favorite";
import Search from "../layout/Search";

const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <LoginForm /> },
      { path: "/", element: <UserHome /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/product", element: <Search /> },
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <UserHome /> },
      { path: "/login", element: <UserHome /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/auth/me", element: <Profile /> },
      { path: "/customer/myAddress", element: <Address /> },
      { path: "/customer/address", element: <CreateAddress /> },
      { path: "/customer/address/:id", element: <UpdateAddress /> },
      { path: "/myFavorite", element: <Favorite /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order", element: <Order /> },
      { path: "/product", element: <Search /> },
      { path: "/customer/order", element: <UserOrder /> },
    ],
  },
]);

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <AdminHome /> },
      { path: "/login", element: <AdminHome /> },
      { path: "/admin/product", element: <CreateProduct /> },
      { path: "/admin/product/:id", element: <UpdateProduct /> },
      { path: "/admin/collection", element: <CreateCollection /> },
      { path: "/admin/brand", element: <CreateBrand /> },
      { path: "/admin/series", element: <CreateSeries /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/auth/me", element: <Profile /> },
      { path: "/customer/myAddress", element: <Address /> },
      { path: "/customer/address", element: <CreateAddress /> },
      { path: "/customer/address/:id", element: <UpdateAddress /> },
      { path: "/myFavorite", element: <Favorite /> },
      { path: "/product", element: <Search /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order", element: <Order /> },
      { path: "/customer/order", element: <UserOrder /> },
    ],
  },
]);

export default function AppRouter() {
  const { user } = useAuth();
  const finalRouter = !user?.id
    ? guestRouter
    : user.role === "ADMIN"
    ? adminRouter
    : userRouter;
  return <RouterProvider router={finalRouter} />;
}
