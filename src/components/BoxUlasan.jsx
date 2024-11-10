import { FaStar } from "react-icons/fa";

const BoxUlasan = (props) => {
  const {
    name = "John Doe",
    komentar = "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    img,
    bintang,
    tanggal,
  } = props;
  return (
    <div
      className={
        "w-3/5 max-w-xs bg-[#F5F7F8] rounded-md aspect-[5/6] flex flex-shrink-0 px-4 flex-col gap-4 md:gap-6 py-6 md:px-6 md:py-7 whitespace-normal outline outline-2 outline-black"
      }
    >
      <div className={"flex gap-3 items-center"}>
        <img
          src={img}
          alt='User Images'
          className={"w-10 object-cover bg-center rounded-full aspect-square"}
        />
        <p className={"font-lexend text-base"}>{name}</p>
      </div>
      <div className={"w-full h-[1px] bg-black"}></div>
      <div className={"flex gap-2"}>
        <FaStar
          size={20}
          fill={"#FFE382"}
          className={`${bintang >= 1 ? "block" : "hidden"}`}
        />
        <FaStar
          size={20}
          fill={"#FFE382"}
          className={`${bintang >= 2 ? "block" : "hidden"}`}
        />
        <FaStar
          size={20}
          fill={"#FFE382"}
          className={`${bintang >= 3 ? "block" : "hidden"}`}
        />
        <FaStar
          size={20}
          fill={"#FFE382"}
          className={`${bintang >= 4 ? "block" : "hidden"}`}
        />
        <FaStar
          size={20}
          fill={"#FFE382"}
          className={`${bintang >= 5 ? "block" : "hidden"}`}
        />
      </div>
      <p className={"font-lexend font-medium font-base"}>{komentar}</p>
      <small
        className={"ml-auto text-slate-400 font-lexend font-light text-sm"}
      >
        {/* {toDateString(tanggal)} */}
      </small>
    </div>
  );
};

export default BoxUlasan;
