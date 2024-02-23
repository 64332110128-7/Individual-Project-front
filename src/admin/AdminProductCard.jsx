import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminProductCard({ el, setTrigger }) {

  const hdlDelete = async (e) => {
    try {
      e.stopPropagation();
      if (!window.confirm(`Delete ${el.name}?`)) {
        return;
      }
      const token = localStorage.getItem("token");
      let rs = await axios.delete(
        `http://localhost:8000/admin/product/${el.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(rs);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className={`card shadow-xl cursor-pointer active:shadow-none active:translate-x-1 active:translate-y-1 items-center`}
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
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-1 mb-3">
        <Link to={`/admin/product/${el.id}`}>
          <button className="update bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600">
            Update
          </button>
        </Link>
        <button
          className="delete bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600"
          onClick={hdlDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
