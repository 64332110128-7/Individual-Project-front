import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const [address, setAddress] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        let token = localStorage.getItem("token");
        const rs = await axios.get(
          `http://localhost:8000/customer/userAddress/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAddress(rs.data.address);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, [user.id, trigger]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col mt-8 ml-8">
          <Link to="/auth/me">
            <p className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300">
              Profile
            </p>
          </Link>
          <Link to="/customer/myAddress">
            <p className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300">
              address
            </p>
          </Link>
          <Link to="/customer/order">
            <p className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300">
              Orders
            </p>
          </Link>
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

          {address.length > 0 && address[0].isMainAddress === true && (
            <div className="mt-4">
              <p className="text-lg font-semibold">Main Address:</p>
              <p>First Name: {address[0].firstName}</p>
              <p>Last Name: {address[0].lastName}</p>
              <p>Address: {address[0].address}</p>
              <p>Country: {address[0].country}</p>
              <p>Postal Code: {address[0].postalCode}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
