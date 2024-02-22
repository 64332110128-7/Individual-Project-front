import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const guestNav = [
  { to: "/", text: "home" },
  { to: "/login", text: "Login" },
  { to: "/register", text: "Register" },
];

const userNav = [{ to: "/", text: "Home" }];

const adminNav = [
  { to: "/", text: "Home " },
  { to: "/admin/product", text: "Create Product" },
  // { to: "/admin/product/:productId", text: "Update Product" },
  { to: "/admin/collection", text: "Create Collection" },
  { to: "/admin/brand", text: "Create Brand" },
  { to: "/admin/series", text: "Create Series" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const finalNav = !user?.id
    ? guestNav
    : user.role === "ADMIN"
    ? adminNav
    : userNav;

  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar bg-[#BFBFC8] text-[#161A30]">
      <div className="LOGO flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          LOGO, {user?.id ? user.firstName : "Guest"}
        </Link>
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
              <Link to="#" onClick={hdlLogout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
