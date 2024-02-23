import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const [trigger, setTrigger] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col mt-8 ml-8">
          <Link to="/auth/me">
            <p className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300">
              Profile
            </p>
          </Link>
          <Link to="/customer/allAddress">
            <p className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300">
              address
            </p>
          </Link>
          <a
            href="#"
            className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            เมนู 3
          </a>
          <a
            href="#"
            className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            เมนู 4
          </a>
          <a
            href="#"
            className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            เมนู 5
          </a>
          <a
            href="#"
            className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            เมนู 6
          </a>
        </div>
        <div className="mt-8 ml-10">
          <div className="text-3xl font-bold text-left">{user.firstName}</div>
          <h2 className="text-3xl font-semibold text-left mt-4">
            ACCOUNT INFORMATION
          </h2>
          <h3 className="text-lg text-left mt-2">
            First Name: {user.firstName}
          </h3>
          <h3 className="text-lg text-left">Last Name: {user.lastName}</h3>
          <h3 className="text-lg text-left">Email: {user.email}</h3>
        </div>
      </div>
    </>
  );
}
