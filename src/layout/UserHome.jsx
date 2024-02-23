import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/productCard";
// import Modal from "../components/Modal";

export default function UserHome() {
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
      <img src={"../assets/banner.jpg"} alt="Banner Image" />
      <h2 className="text-3xl text-center mt-8">Product</h2>
      <div className="flex flex-row gap-3 items-center p-3">
        {products.map((el) => (
          <ProductCard key={el.id} el={el} />
        ))}
      </div>
    </>
  );
}
