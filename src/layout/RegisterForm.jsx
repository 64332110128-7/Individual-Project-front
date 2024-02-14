import axios from "axios";
import { useState } from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      // validation
      if (input.password !== input.confirmPassword) {
        return alert("Please check confirm password");
      }
      const rs = await axios.post("http://localhost:8000/auth/register", input);
      console.log(rs);
      if (rs.status === 200) {
        alert("Register Successful");
      }
    } catch (err) {
      if (err.response.status === 400) {
        alert("Invalid input data, please check your fields");
      } else if (err.response.status === 401) {
        alert("Email already exist");
      } else if (err.response.status === 402) {
        alert("confirm password not match");
      } else if (err.response.status === 403) {
        alert("Please enter your input data");
      } else {
        console.log(err.message);
      }
    }
  };

  const hdlLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="py-16 mt-8 border w-1/3 min-w-[500px] mx-auto rounded-3xl text-[#161A30] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="text-3xl text-center mb-5">Register Form</div>
      <form className="flex flex-col items-center gap-2">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">first name :</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs rounded-3xl"
            name="firstName"
            value={input.firstName}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">last name :</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs rounded-3xl"
            name="lastName"
            value={input.lastName}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Phone :</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs rounded-3xl"
            name="phone"
            value={input.phone}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">E-mail :</span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full max-w-xs rounded-3xl"
            name="email"
            value={input.email}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">password :</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs rounded-3xl"
            name="password"
            value={input.password}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Confirm Password :</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs rounded-3xl"
            name="confirmPassword"
            value={input.confirmPassword}
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
              Register
            </button>
          </div>
          <div className="or">or</div>
          <div className="register-btn">
            <button
              type="button"
              className="bg-[#161A30] text-[#ffffff] w-80 h-12 rounded-3xl"
              onClick={hdlLogin}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
