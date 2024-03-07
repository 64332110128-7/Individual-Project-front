import axios from "axios";
import useAuth from "../hooks/useAuth";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const { user } = useAuth();
  const [input, setInput] = useState({
    total: "",
    deliveryFee: "",
  });
  const deliveryFeeOptions = ["Standard", "Express"];

  console.log(input);

  useEffect(() => {
    const getCart = location.state?.cart;
    if (getCart) {
      setCart(getCart);
    } else {
      alert("No product in cart");
    }
  }, [location.state]);

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = {
        total: cart.total,
        deliveryFee: input.deliveryFeeOption,
        cart: cart,
      };

      const token = localStorage.getItem("token");
      const rs = await axios.post(
        `http://localhost:8000/order/${user.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Create new Order ok!");
      navigate("/customer/order");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className=" ml-4 mt-4">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      {cart ? (
        <div>
          {cart.cart_products.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center border-b border-gray-200 py-4"
            >
              <div className="flex-shrink-0 w-20 h-20">
                <img
                  src={item.product.product_img[0].url}
                  alt={item.product.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="ml-4">
                <p className="text-lg font-semibold">{item.product.name}</p>
                <p>Price: {item.product.price} THB</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <form onSubmit={hdlSubmit}>
            <div className="mb-4">
              <label className="block font-semibold mb-1 ">Delivery Fee</label>
              <select
                id="deliveryFeeOption"
                name="deliveryFeeOption"
                value={input.deliveryFeeOption}
                onChange={hdlChange}
                className="border border-gray-300 rounded px-3 py-1"
              >
                <option value="" disabled>
                  Select Delivery Fee
                </option>
                {deliveryFeeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <p className="mt-3 font-bold"> Total = {cart.total}</p>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Place Order
            </button>
          </form>
        </div>
      ) : (
        <p>No cart data received.</p>
      )}
    </div>
  );
}
