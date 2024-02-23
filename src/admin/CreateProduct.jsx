import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();
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
    Images: null,
  });

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

  const hdlImageChange = (e) => {
    setInput((prev) => ({ ...prev, Images: e.target.files[0] }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("stock", input.stock);
      formData.append("version", input.version);
      formData.append("price", input.price);
      formData.append("scale", input.scale);
      formData.append("weight", input.weight);
      formData.append("material", input.material);
      formData.append("status_product", input.status_product);
      formData.append("brandId", input.brandId);
      formData.append("collectionId", input.collectionId);
      formData.append("seriesId", input.seriesId);
      formData.append("detail", input.detail);
      formData.append("Images", input.Images);

      const token = localStorage.getItem("token");
      const rs = await axios.post(
        "http://localhost:8000/admin/product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Create new product ok!");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form
      className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-3"
      onSubmit={hdlSubmit}
    >
      <p>Create New Product</p>
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
          <option value="" disabled>
            Select status...
          </option>
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
          <option value="" disabled>
            Select Brand...
          </option>
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
          <option value="" disabled>
            Select Collection...
          </option>
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
          <option value="" disabled>
            Select Series...
          </option>
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
      <div className="">
        <input
          type="file"
          className="file-input file-input-bordered file-input-info w-full max-w-xs"
          name="Images"
          accept="Images/*"
          onChange={hdlImageChange}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Add new product
      </button>
    </form>
  );
}
