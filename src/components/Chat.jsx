import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";

const Chat = (props) => {
  const { reverse = false, img, message = "Lorem Ipsum" } = props;
  return (
    <div
      className={`w-full my-5 md:my-10 opacity-100 flex ${
        reverse ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-3 items-center shrink-0 h-fit ${
          reverse ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <img
          src={img}
          alt='Icon User'
          className={
            "w-11 bg-white aspect-square rounded-full object-cover bg-center"
          }
        />
        <p
          className={
            "font-inter py-2 px-3 text-white text-sm bg-[#618264] font-medium rounded-md relative max-w-[200px] md:max-w-full"
          }
        >
          {reverse ? (
            <IoMdArrowDropright
              color={"#618264"}
              size={25}
              className={"absolute -right-[15px] top-1/2 -translate-y-1/2"}
            />
          ) : (
            <IoMdArrowDropleft
              color={"#618264"}
              size={25}
              className={"absolute -left-[15px] top-1/2 -translate-y-1/2"}
            />
          )}
          {message}
        </p>
      </div>
    </div>
  );
};

export default Chat;
