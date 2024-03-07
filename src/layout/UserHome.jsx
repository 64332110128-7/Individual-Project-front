import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";

export default function UserHome() {
  const [products, setProducts] = useState([]);
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
        className="w-1000 h-auto max-w-full object-cover mx-auto block"
      />

      <h2 className="text-3xl text-center mt-8">Product</h2>
      <div className="flex-row gap-3 items-center p-3 grid grid-cols-6">
        {products.map((el) => (
          <ProductCard key={el.id} el={el} />
        ))}
      </div>
    </>
  );
}
