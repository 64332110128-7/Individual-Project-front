import React, { useState } from "react";
import axios from "axios";

export default function CreateAddress() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    address: "",
    postalCode: "",
    province: "",
    district: "",
    subDistrict: "",
    isMainAddress: "",
  });
  console.log(input);
  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = {
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        country: input.country,
        address: input.address,
        postalCode: input.postalCode,
        province: input.province,
        district: input.district,
        subDistrict: input.subDistrict,
        isMainAddress: input.isMainAddress,
      };

      const token = localStorage.getItem("token");
      const rs = await axios.post(
        "http://localhost:8000/customer/address",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Create new Address ok!");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form
      className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-3"
      onSubmit={hdlSubmit}
    >
      <p>Create New Address</p>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">First Name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="firstName"
          value={input.firstName}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Last Name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="lastName"
          value={input.lastName}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Phone</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="phone"
          value={input.phone}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Country</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="country"
          value={input.country}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Address</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="address"
          value={input.address}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">PostalCode</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="postalCode"
          value={input.postalCode}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Province</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="province"
          value={input.province}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">District</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="district"
          value={input.district}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">SubDistrict</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="subDistrict"
          value={input.subDistrict}
          onChange={hdlChange}
        />
      </label>
      <div className="label flex-col items-start gap-2">
        <span className="label-text">Main Address ?</span>
        <select
          className="select select-bordered w-full"
          name="isMainAddress"
          value={input.isMainAddress}
          onChange={hdlChange}
        >
          <option value="" disabled>
            Main Address select
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <button className="btn btn-primary" type="submit">
        Add new Address
      </button>
    </form>
  );
}
