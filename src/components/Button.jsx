const Button = (props) => {
  const { className = "bg-[#618264]", children } = props;
  return (
    <button {...props} className={`px-5 py-2 rounded-md ${className}`}>
      {children}
    </button>
  );
};

export default Button;
