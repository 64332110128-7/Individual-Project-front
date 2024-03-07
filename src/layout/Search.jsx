import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/productCard";

export default function Search() {
  const location = useLocation();
  const [search, setSearch] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getSearch = location.state?.search;
    if (getSearch) {
      setSearch(getSearch);
    } else {
      alert("No search data");
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const rs = await axios.get(
          `http://localhost:8000/product?name=${search}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProducts(rs.data.products);
      } catch (error) {
        console.error("Error fetching Product:", error);
      }
    };

    if (search) {
      fetchProduct();
    }
  }, [search]);

  return (
    <div>
      <h1 className="text-3xl text-center mt-8">
        Search Results for: {search}
      </h1>
      <div className="flex-row gap-3 items-center p-3 grid grid-cols-6">
        {products.map((el) => (
          <ProductCard key={el.id} el={el} />
        ))}
      </div>
    </div>
  );
}
