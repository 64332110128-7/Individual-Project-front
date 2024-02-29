// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import AdminAddressCard from "./AdminAddressCard";

// export default function AdminAddress() {
//   const [trigger, setTrigger] = useState(false);
//   const [address, setAddress] = useState([]);
//   const { user } = useAuth();
//   useEffect(() => {
//     const run = async () => {
//       let token = localStorage.getItem("token");
//       const rs = await axios.get(
//         `http://localhost:8000/customer/address/${user.id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setAddress(rs.data.address);
//     };
//     run();
//   }, [trigger]);

//   return (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="flex flex-col mt-8 ml-8">
//         <Link to="/auth/me">
//           <p className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300">
//             Profile
//           </p>
//         </Link>
//         <Link to="/customer/myAddress">
//           <p className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300">
//             address
//           </p>
//         </Link>
//         <a
//           href="#"
//           className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300"
//         >
//           เมนู 3
//         </a>
//         <a
//           href="#"
//           className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300"
//         >
//           เมนู 4
//         </a>
//         <a
//           href="#"
//           className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300"
//         >
//           เมนู 5
//         </a>
//         <a
//           href="#"
//           className="py-2 px-4 bg-gray-200 text-gray-800 hover:bg-gray-300"
//         >
//           เมนู 6
//         </a>
//       </div>
//       <div className=" mt-8">
//         <div className="flex flex-col items-center">
//           <h2 className="text-3xl mt-8">Address</h2>
//           <div>
//             <Link to="/customer/address">
//               <button className="update bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600">
//                 Add new Address
//               </button>
//             </Link>
//           </div>
//         </div>

//         <div className="flex flex-col gap-3 items-center p-3">
//           {address.map((el) => (
//             <div
//               key={el.id}
//               className="flex flex-col gap-3 items-center p-3 bg-white rounded-lg shadow-md"
//             >
//               <AdminAddressCard el={el} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
