// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function AdminAddressCard({ el }) {
//   const hdlDelete = async (e) => {
//     try {
//       e.stopPropagation();
//       if (!window.confirm(`Delete Address No.${el.id}?`)) {
//         return;
//       }
//       const token = localStorage.getItem("token");
//       let rs = await axios.delete(
//         `http://localhost:8000/customer/address/${el.id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log(rs);
//       window.location.reload();
//     } catch (err) {
//       console.log(err.message);
//     }
//   };
//   return (
//     <div className="items-center gap-1 mb-3 justify-center">
//       <div className="card-body items-center text-center">
//         <div className="flex flex-col items-center">
//           <h2 className="text-lg font-bold mb-2">
//             {el.firstName} {el.lastName}
//           </h2>
//           <p className="text-sm mb-2">Phone: {el.phone}</p>
//           <p className="text-sm mb-2">Country: {el.country}</p>
//           <p className="text-sm mb-2">Address: {el.address}</p>
//           <p className="text-sm mb-2">Postal Code: {el.postalCode}</p>
//           <p className="text-sm mb-2">Province: {el.province}</p>
//           <p className="text-sm mb-2">District: {el.district}</p>
//           <p className="text-sm mb-2">Sub-district: {el.subDistrict}</p>
//         </div>
//       </div>
//       <div className="flex items-center justify-center gap-1 mb-3">
//         <Link to={`/customer/address/${el.id}`}>
//           <button className="update bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600">
//             Update
//           </button>
//         </Link>
//         <button
//           className="delete bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600"
//           onClick={hdlDelete}
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }
