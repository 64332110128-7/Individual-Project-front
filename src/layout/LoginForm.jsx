import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      // validation
      const rs = await axios.post("http://localhost:8000/auth/login", input);
      console.log(rs.data.token);
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("http://localhost:8000/auth/me", {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });
      console.log(rs1.data);
      setUser(rs1.data);
    } catch (err) {
      if (err.response.status === 400) {
        alert("Email and password are required");
      } else if (err.response.status === 401) {
        alert("Email or password is invalid");
      } else {
        console.log(err.message);
      }
    }
  };

  const hdlRegister = () => {
    window.location.href = "/register";
  };

  return (
    <div className="py-16 mt-8 border w-1/3 min-w-[500px] mx-auto rounded-3xl text-[#161A30] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="text-3xl text-center mb-5">Login</div>
      <form className="flex flex-col items-center gap-2">
        <label className="email form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email :</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs rounded-3xl"
            name="email"
            value={input.email}
            onChange={hdlChange}
          />
        </label>

        <label className="password form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">password :</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs rounded-3xl "
            name="password"
            value={input.password}
            onChange={hdlChange}
          />
        </label>

        <div className="button flex flex-col items-center gap-5">
          <div className="login-btn">
            <button
              type="submit"
              className="bg-[#161A30] text-[#ffffff] w-80 h-12 rounded-3xl mt-8"
              onClick={hdlSubmit}
            >
              Login
            </button>
          </div>
          <div className="or">or</div>
          <div className="register-btn">
            <button
              type="button"
              className="bg-[#161A30] text-[#ffffff] w-80 h-12 rounded-3xl"
              onClick={hdlRegister}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
