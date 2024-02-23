import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState([]);
  const [brand, setBrand] = useState([]);
  const [collection, setCollection] = useState([]);
  const [series, setSeries] = useState([]);
  const [input, setInput] = useState({
    name: "",
    stock: "",
    version: "",
    price: "",
    detail: "",
    scale: "",
    weight: "",
    material: "",
    status_product: "",
    brandId: "",
    collectionId: "",
    seriesId: "",
  });
  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem("token");
      const rs = await axios.get(`http://localhost:8000/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(rs.data.product);
      setInput((prevInput) => ({
        ...prevInput,
        name: rs.data.product.name,
        stock: rs.data.product.stock,
        version: rs.data.product.version,
        price: rs.data.product.price,
        detail: rs.data.product.detail,
        scale: rs.data.product.scale,
        weight: rs.data.product.weight,
        material: rs.data.product.material,
        status_product: rs.data.product.status_product,
        brandId: rs.data.product.brandId,
        collectionId: rs.data.product.collectionId,
        seriesId: rs.data.product.seriesId,
      }));
    };

    run();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const statusResponse = await axios.get(
        "http://localhost:8000/product/allStatus"
      );
      const brandResponse = await axios.get(
        "http://localhost:8000/product/allBrand"
      );
      const collectionResponse = await axios.get(
        "http://localhost:8000/product/allCollection"
      );
      const seriesResponse = await axios.get(
        "http://localhost:8000/product/allSeries"
      );

      setStatus(statusResponse.data.status_product);
      setBrand(brandResponse.data.brands);
      setCollection(collectionResponse.data.collections);
      setSeries(seriesResponse.data.series);
    };

    fetchData();
  }, []);

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const output = { ...input };
      const token = localStorage.getItem("token");

      const rs = await axios.patch(
        `http://localhost:8000/admin/product/${id}`,
        output,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Update product ok!");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  console.log(input);
  return (
    <form
      className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-3"
      onSubmit={hdlSubmit}
    >
      <p>Update Product</p>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="name"
          value={input.name}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Stock</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="stock"
          value={input.stock}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Version</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="version"
          value={input.version}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Price</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="price"
          value={input.price}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Scale</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="scale"
          value={input.scale}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Weight</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="weight"
          value={input.weight}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Material</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="material"
          value={input.material}
          onChange={hdlChange}
        />
      </label>
      <div className="label flex-col items-start gap-2">
        <span className="label-text">Status</span>
        <select
          className="select select-bordered w-full max-w-xs"
          name="status_product"
          value={input.status_product}
          onChange={hdlChange}
        >
          {status.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </div>
      <div className="label flex-col items-start gap-2">
        <span className="label-text">Brand</span>
        <select
          className="select select-bordered w-full max-w-xs"
          name="brandId"
          value={input.brandId}
          onChange={hdlChange}
        >
          {brand.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
      <div className="label flex-col items-start gap-2">
        <span className="label-text">Collection</span>
        <select
          className="select select-bordered w-full max-w-xs"
          name="collectionId"
          value={input.collectionId}
          onChange={hdlChange}
        >
          {collection.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
      <div className="label flex-col items-start gap-2">
        <span className="label-text">Series</span>
        <select
          className="select select-bordered w-full max-w-xs"
          name="seriesId"
          value={input.seriesId}
          onChange={hdlChange}
        >
          {series.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Detail</span>
        </div>
        <textarea
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full h-40"
          name="detail"
          value={input.detail}
          onChange={hdlChange}
        />
      </label>
      <button className="btn btn-primary" type="submit">
        UPDATE
      </button>
    </form>
  );
}
