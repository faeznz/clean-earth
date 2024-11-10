import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = (props) => {
  const { show = false } = props;
  return (
    <div
      className={`${
        show ? "flex" : "hidden"
      } fixed top-[50%] left-[50%] gap-4 bg- py-3 px-5 items-center bg-[#618264] rounded-md z-50`}
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <AiOutlineLoading3Quarters className={"text-2xl animate-spin"} />
      <p className={"font-poppins text-xl text-white"}>Loading..</p>
    </div>
  );
};

export default Loading;
