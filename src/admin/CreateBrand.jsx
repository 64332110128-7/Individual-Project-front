import React from "react";
import axios from "axios";
import { useState } from "react";

export default function CreateBrand() {
  const [input, setInput] = useState({
    name: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const output = { ...input };
      const token = localStorage.getItem("token");
      const rs = await axios.post("http://localhost:8000/admin/brand", output, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Create Brand Successful");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form
      className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-6"
      onSubmit={hdlSubmit}
    >
      <p>Create New Brand</p>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="name"
          value={input.name}
          onChange={hdlChange}
        />
      </label>
      <button className="btn btn-primary">Add new</button>
    </form>
  );
}
