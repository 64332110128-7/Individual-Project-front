import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ el }) {
  return (
    <div
      className={`card shadow-xl cursor-pointer active:shadow-none active:translate-x-1 active:translate-y-1`}
    >
      <Link to={`/product/${el.id}`}>
        <div className="card-body items-center text-center">
          <div className="flex-col">
            {el.product_img.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`Product Image ${index + 1}`}
                className="w-20 h-20 mr-2"
              />
            ))}
            <h2 className="text-center card-title focus:text-red-300">
              {el.name}
            </h2>
            <p className="text-center bg-indigo-500 rounded-lg text-white">
              {el.price} THB
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
