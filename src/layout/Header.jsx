import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const guestNav = [
  { to: "/login", text: "Login" },
  { to: "/register", text: "Register" },
];

const userNav = [
  { to: "/myFavorite", text: "Favorite" },
  { to: "/cart", text: "Cart" },
  { to: "/auth/me", text: "Profile" },
];

const adminNav = [
  { to: "/admin/product", text: "Create Product" },
  { to: "/admin/collection", text: "Create Collection" },
  { to: "/admin/brand", text: "Create Brand" },
  { to: "/admin/series", text: "Create Series" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const finalNav = !user?.id ? guestNav : userNav;
  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate("/");
  };

  const hdlAdminMenu = () => {
    setShowAdminMenu(!showAdminMenu);
  };

  const hdlAdminMenuItem = (to) => {
    setShowAdminMenu(false);
    navigate(to);
  };

  const hdlSearch = () => {
    navigate(`/product?name=${search}`, { state: { search } });
  };

  return (
    <div className="navbar bg-gray-200 text-gray-800 shadow-md py-2 px-4 md:flex md:justify-between md:items-center">
      <div className="LOGO flex-1">
        <Link to="/" className="text-xl font-bold">
          LOGO, {user?.id ? user.firstName : "Guest"}
        </Link>
      </div>
      <div className="search-bar flex justify-center items-center md:justify-start md:flex-1 md:mr-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 w-full md:w-auto border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          onClick={hdlSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div className="relative">
        {user?.role === "ADMIN" && (
          <div className="dropdown">
            <button className="dropdown-btn" onClick={hdlAdminMenu}>
              Admin
            </button>
            {showAdminMenu && (
              <ul className="dropdown-menu absolute bg-white shadow-md mt-2 py-2 w-32">
                {adminNav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => hdlAdminMenuItem(item.to)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {finalNav.map((el) => (
            <li key={el.to}>
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          {user?.id && (
            <li>
              <Link
                to="#"
                onClick={hdlLogout}
                className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
