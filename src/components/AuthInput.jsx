const AuthInput = (props) => {
  const { name, placeholder, type = "text" } = props;
  return (
    <input
      {...props}
      id={name}
      type={type}
      placeholder={placeholder}
      className={
        "py-4 px-5 placeholder:font-poppins placeholder:text-[#808080] placeholder:text-sm outline outline-1 outline-[#ADADAD] rounded-lg focus:outline-[#AADDAA]"
      }
      required={true}
    />
  );
};

export default AuthInput;
