import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(response.data.product);
    };

    run();
  }, [id]);

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
          <p className="text-lg text-gray-700 mb-4">{product.detail}</p>
          <p className="text-2xl font-semibold text-gray-900 mb-4">
            {product.price} THB
          </p>
          <div className="flex items-center">
            <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Add to Cart
            </button>
            <button className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Details</h3>
        <p className="text-lg text-gray-700">{product.detail}</p>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Specifications
        </h3>
        <ul className="list-disc list-inside">
          <li className="text-lg text-gray-700">Scale: {product.scale}</li>
          <li className="text-lg text-gray-700">Weight: {product.weight}</li>
          <li className="text-lg text-gray-700">
            Material: {product.material}
          </li>
          <li className="text-lg text-gray-700">Brand: {product.brand.name}</li>
          <li className="text-lg text-gray-700">
            Collection: {product.collection.name}
          </li>
          <li className="text-lg text-gray-700">
            Series: {product.series.name}
          </li>
        </ul>
      </div>
    </div>
  );
}
