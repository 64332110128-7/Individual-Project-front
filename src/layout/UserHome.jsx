import axios from "axios";
import { useEffect, useState } from "react";
import TodoCard from "../components/productCard";
// import Modal from "../components/Modal";

export default function UserHome() {
  const [todos, setTodos] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem("token");
      const rs = await axios.get("http://localhost:8000/product", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(rs.data.product);
    };
    run();
  }, [trigger]);

  // const openModal = (id) => {
  //   setEditIdx(todos.findIndex((el) => el.id === id));
  //   document.getElementById("my_modal_2").showModal();
  // };

  // const closeModal = () => {
  //   document.getElementById("my_modal_2").close();
  // };
  return (
    <>
      <h2 className="text-3xl text-center mt-8">Product</h2>
      <div className="flex flex-row gap-3 items-center p-3">
        {todos.map((el) => (
          <TodoCard
            key={el.id}
            el={el}
            // openModal={openModal}
            setTrigger={setTrigger}
          />
        ))}
      </div>
      {/* <Modal el={todos[editIdx]} closeModal={closeModal} setTrigger={setTrigger}/> */}
    </>
  );
}
