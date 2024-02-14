import axios from "axios";

export default function TodoCard(props) {
  const { el, openModal, setTrigger } = props;

  let statusColor =
    el.status === "PENDING"
      ? "bg-pink-200"
      : el.status === "DOING"
      ? "bg-blue-200"
      : "bg-white-200";

  return (
    <div
      className={`card w-1/5 shadow-xl cursor-pointer 
      active:shadow-none active:translate-x-1 active:translate-y-1 ${statusColor}`}
      // onClick={() => openModal(el.id)}
    >
      <div className="card-body items-center text-center ">
        <div className="flex-col ">
          {el.product_img.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={`Product Image ${index + 1}`}
              className="w-20 h-20 mr-2"
            />
          ))}
          <h2 className="text-center card-title focus:text-red-300">
            {el.name}
          </h2>
        </div>
      </div>
    </div>
  );
}
