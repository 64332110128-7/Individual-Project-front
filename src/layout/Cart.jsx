import axios from "axios";
import useAuth from "../hooks/useAuth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const { user } = useAuth();
  console.log(user.id);

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
        cart.total += item.product.price * item.quantity;
      });
    }
    return cart.total;
  };

  const hdlCheckout = () => {
    if (cart && cart.cart_products.length > 0) {
      navigate("/order", { state: { cart } });
    } else {
      alert("no product in cart");
      navigate("/cart");
    }
  };

  const hdlDelete = async (productId, productName) => {
    try {
      if (!window.confirm(`Delete ${productName}?`)) {
        return;
      }
      const token = localStorage.getItem("token");
      let rs = await axios.delete(
        `http://localhost:8000/cart/${user.id}/products/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
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
              className="flex items-center justify-between border-b border-gray-200 py-4"
            >
              <div className="flex flex-row">
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
                  <p className="text-gray-500">
                    Price: {item.product.price} THB
                  </p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div>
                <button
                  className="delete bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600"
                  onClick={() => hdlDelete(item.product.id, item.product.name)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Total</h3>
            <p className="text-gray-700">Total price: {totalPrice()} THB</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={hdlCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-xl text-gray-800">ไม่มีสินค้าในตะกร้า</div>
      )}
    </div>
  );
}
