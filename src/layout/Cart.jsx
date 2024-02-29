import axios from "axios";
import useAuth from "../hooks/useAuth";
import React, { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const { user } = useAuth();

  //   console.log(user);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const rs = await axios.get(`http://localhost:8000/cart/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(rs.data.cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [user.id]);

  const totalPrice = () => {
    let totalPrice = 0;
    if (cart && cart.cart_products) {
      cart.cart_products.forEach((item) => {
        totalPrice += item.product.price * item.quantity;
      });
    }
    return totalPrice;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {cart ? (
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Your Cart
          </h2>
          {cart.cart_products.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-gray-200 py-4"
            >
              <div className="flex-shrink-0 w-20 h-20">
                <img
                  src={item.product.product_img[0].url}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.product.name}
                </h3>
                <p className="text-gray-500">Price: {item.product.price} THB</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Total</h3>
            <p className="text-gray-700">Total price: {totalPrice()} THB</p>
          </div>
        </div>
      ) : (
        <div className="text-xl text-gray-800">ไม่มีสินค้าในตะกร้า</div>
      )}
    </div>
  );
}
