// import axios from "axios";
// import { useState, useEffect } from "react";

// export default function Modal(props) {
//   const { el, closeModal, setTrigger } = props;
//   const [status, setStatus] = useState([]);
//   const [brand, setBrand] = useState([]);
//   const [collection, setCollection] = useState([]);
//   const [series, setSeries] = useState([]);
//   const [input, setInput] = useState({
//     name: "",
//     stock: "",
//     version: "",
//     price: "",
//     detail: "",
//     scale: "",
//     weight: "",
//     material: "",
//     status_product: "",
//     brandId: "",
//     collectionId: "",
//     seriesId: "",
//     Images: null,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       const statusResponse = await axios.get(
//         "http://localhost:8000/product/allStatus"
//       );
//       const brandResponse = await axios.get(
//         "http://localhost:8000/product/allBrand"
//       );
//       const collectionResponse = await axios.get(
//         "http://localhost:8000/product/allCollection"
//       );
//       const seriesResponse = await axios.get(
//         "http://localhost:8000/product/allSeries"
//       );

//       setStatus(statusResponse.data.status_product);
//       setBrand(brandResponse.data.brands);
//       setCollection(collectionResponse.data.collections);
//       setSeries(seriesResponse.data.series);
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     setInput({
//       name: el?.name ?? "",
//       dueDate: new Date(el?.dueDate ?? null).toISOString().split("T")[0],
//       status: el?.status ?? "",
//     });
//   }, [el?.id]);

//   const hdlChange = (e) => {
//     setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
//   };

//   const hdlSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       const output = { ...input, dueDate: new Date(input.dueDate) };
//       const token = localStorage.getItem("token");
//       const rs = await axios.put(
//         `http://localhost:8000/product/${el.id}`,
//         output,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log(rs);
//       setTrigger((prv) => !prv);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <dialog id="my_modal_2" className="modal">
//       <form
//         className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-3"
//         onSubmit={hdlSubmit}
//       >
//         <p>Create New Product</p>
//         <label className="form-control w-full ">
//           <div className="label">
//             <span className="label-text">Name</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Type here"
//             className="input input-bordered w-full "
//             name="name"
//             value={input.name}
//             onChange={hdlChange}
//           />
//         </label>
//         <label className="form-control w-full ">
//           <div className="label">
//             <span className="label-text">Stock</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Type here"
//             className="input input-bordered w-full "
//             name="stock"
//             value={input.stock}
//             onChange={hdlChange}
//           />
//         </label>
//         <label className="form-control w-full ">
//           <div className="label">
//             <span className="label-text">Version</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Type here"
//             className="input input-bordered w-full "
//             name="version"
//             value={input.version}
//             onChange={hdlChange}
//           />
//         </label>
//         <label className="form-control w-full ">
//           <div className="label">
//             <span className="label-text">Price</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Type here"
//             className="input input-bordered w-full "
//             name="price"
//             value={input.price}
//             onChange={hdlChange}
//           />
//         </label>
//         <label className="form-control w-full ">
//           <div className="label">
//             <span className="label-text">Scale</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Type here"
//             className="input input-bordered w-full "
//             name="scale"
//             value={input.scale}
//             onChange={hdlChange}
//           />
//         </label>
//         <label className="form-control w-full ">
//           <div className="label">
//             <span className="label-text">Weight</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Type here"
//             className="input input-bordered w-full "
//             name="weight"
//             value={input.weight}
//             onChange={hdlChange}
//           />
//         </label>
//         <label className="form-control w-full ">
//           <div className="label">
//             <span className="label-text">Material</span>
//           </div>
//           <input
//             type="text"
//             placeholder="Type here"
//             className="input input-bordered w-full "
//             name="material"
//             value={input.material}
//             onChange={hdlChange}
//           />
//         </label>
//         <div className="label flex-col items-start gap-2">
//           <span className="label-text">Status</span>
//           <select
//             className="select select-bordered w-full max-w-xs"
//             name="status_product"
//             value={input.status_product}
//             onChange={hdlChange}
//           >
//             {status.map((el) => (
//               <option key={el} value={el}>
//                 {el}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="label flex-col items-start gap-2">
//           <span className="label-text">Brand</span>
//           <select
//             className="select select-bordered w-full max-w-xs"
//             name="brandId"
//             value={input.brandId}
//             onChange={hdlChange}
//           >
//             {brand.map((el) => (
//               <option key={el.id} value={el.id}>
//                 {el.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="label flex-col items-start gap-2">
//           <span className="label-text">Collection</span>
//           <select
//             className="select select-bordered w-full max-w-xs"
//             name="collectionId"
//             value={input.collectionId}
//             onChange={hdlChange}
//           >
//             {collection.map((el) => (
//               <option key={el.id} value={el.id}>
//                 {el.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="label flex-col items-start gap-2">
//           <span className="label-text">Series</span>
//           <select
//             className="select select-bordered w-full max-w-xs"
//             name="seriesId"
//             value={input.seriesId}
//             onChange={hdlChange}
//           >
//             {series.map((el) => (
//               <option key={el.id} value={el.id}>
//                 {el.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <label className="form-control w-full ">
//           <div className="label">
//             <span className="label-text">Detail</span>
//           </div>
//           <textarea
//             type="text"
//             placeholder="Type here"
//             className="input input-bordered w-full h-40"
//             name="detail"
//             value={input.detail}
//             onChange={hdlChange}
//           />
//         </label>
//         {/* <div className="">
//           <input
//             type="file"
//             className="file-input file-input-bordered file-input-info w-full max-w-xs"
//             name="Images"
//             accept="Images/*"
//             onChange={hdlImageChange}
//           />
//         </div> */}
//         <button className="btn btn-primary" type="submit">
//           Add new product
//         </button>
//       </form>
//     </dialog>
//   );
// }
