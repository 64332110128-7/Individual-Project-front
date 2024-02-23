import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminProductCard from "./AdminProductCard";

export default function AdminHome() {
  const [products, setProducts] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem("token");
      const rs = await axios.get("http://localhost:8000/product/landing", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(rs.data.product);
    };
    run();
  }, [trigger]);

  return (
    <>
      <img
        src="\src\assets\banner.jpg"
        alt="Banner Image"
        className="w-full h-auto max-w-full"
      />

      <h2 className="text-3xl text-center mt-8">Admin Product</h2>
      <div className="flex-row gap-3 items-center p-3 grid grid-cols-6">
        {products.map((el) => (
          <AdminProductCard key={el.id} el={el} setTrigger={setTrigger} />
        ))}
      </div>
    </>
  );
}
