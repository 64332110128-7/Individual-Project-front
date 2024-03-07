import axios from "axios";
import useAuth from "../hooks/useAuth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserOrder() {
  const [orders, setOrders] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const rs = await axios.get(`http://localhost:8000/order/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(rs.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user.id]);

  const totalPrice = (order) => {
    let totalPrice = 0;
    order.order_item.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    return totalPrice;
  };

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
        <div className="container mx-auto px-4 py-8">
          {orders ? (
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Your Orders
              </h2>
              {orders.map((order) => (
                <div key={order.id} className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mt-4">
                    Product:
                  </h4>
                  {order.order_item.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center border-b border-gray-200 py-2"
                    >
                      <div className="flex-shrink-0 w-20 h-20">
                        <img
                          src={item.product.product_img[0].url}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {item.product.name}
                        </h4>
                        <p className="text-gray-500">
                          Price: {item.product.price} THB
                        </p>
                        <p className="text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  <p className="text-gray-700 font-semibold">
                    Total: {totalPrice(order)} THB
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xl text-gray-800">ไม่มีรายการสั่งซื้อ</div>
          )}
        </div>
      </div>
    </>
  );
}
