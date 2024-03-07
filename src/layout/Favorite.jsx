import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function FavoriteProducts({ userId }) {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/customer/myFavorite/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavorites(response.data.fav);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      }
    };

    fetchFavorites();
  }, [userId]);

  return (
    <div className="ml-8 mt-8">
      <h2 className="text-2xl font-bold mb-4">Favorite Products</h2>
      <div className="flex-row gap-3 items-center p-3 grid grid-cols-6">
        {favorites.map((favorite) => (
          <div key={favorite.id}>
            {favorite.favoriteProducts.map((favoriteProduct) => (
              <div
                key={favoriteProduct.id}
                className="card shadow-xl cursor-pointer active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                <Link to={`/product/${favoriteProduct.product.id}`}>
                  <div className="card-body items-center text-center">
                    <div className="flex-col">
                      {favoriteProduct.product.product_img.map((img, index) => (
                        <img
                          key={index}
                          src={img.url}
                          alt={`Product Image ${index + 1}`}
                          className="w-20 h-20 mr-2"
                        />
                      ))}
                      <h2 className="text-center card-title focus:text-red-300">
                        {favoriteProduct.product.name}
                      </h2>
                      <p className="text-center bg-indigo-500 rounded-lg text-white">
                        {favoriteProduct.product.price} THB
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
