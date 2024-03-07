import axios from "axios";
import useAuth from "../hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem("token");
      const rs = await axios.get(`http://localhost:8000/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(rs.data.product);
    };

    run();
  }, [id]);

  const hdlAddToCart = async () => {
    try {
      let token = localStorage.getItem("token");
      const rs = await axios.post(
        `http://localhost:8000/cart/${user.id}/products/${id}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Product added to cart successfully");
    } catch (err) {
      console.error("Error adding product to cart:", err);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const hdlAddToFavorite = async () => {
    try {
      let token = localStorage.getItem("token");
      const rs = await axios.post(
        `http://localhost:8000/customer/favorite/${user.id}/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Product added to favorites successfully");
    } catch (err) {
      console.error("Error adding product to favorites:", err);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center">
        <div className="w-full lg:w-1/2 pb-4">
          <img
            src={product.product_img[0].url}
            alt={`Product Image`}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="w-full lg:w-1/2 lg:pl-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            {product.name}
          </h2>
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={hdlAddToFavorite}
          >
            Favorite
          </button>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Specifications
            </h3>
            <ul className="list-disc list-inside">
              <li className="text-lg text-gray-700">Scale: {product.scale}</li>
              <li className="text-lg text-gray-700">
                Weight: {product.weight}
              </li>
              <li className="text-lg text-gray-700">
                Material: {product.material}
              </li>
              <li className="text-lg text-gray-700">
                Brand: {product.brand.name}
              </li>
              <li className="text-lg text-gray-700">
                Collection: {product.collection.name}
              </li>
              <li className="text-lg text-gray-700">
                Series: {product.series.name}
              </li>
            </ul>
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-4 mt-4">
            {product.price} THB
          </p>
          <div className="flex items-center">
            <div className="flex items-center">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <input
                className="bg-gray-100 text-center w-16"
                type="text"
                value={quantity}
                readOnly
              />
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

            <button
              className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={hdlAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Details</h3>
        <p className="text-lg text-gray-700">{product.detail}</p>
      </div>
    </div>
  );
}
