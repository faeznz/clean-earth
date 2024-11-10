const DotAccesnt = (props) => {
  const { count = 3, className } = props;
  const elements = [];
  for (let x = 0; x < count; x++) {
    elements.push(
      <li
        key={x}
        className={"w-3 aspect-square rounded-full bg-[#79AC78]"}
      ></li>
    );
  }
  return <ul className={`flex gap-x-4 my-4 ${className}`}>{elements}</ul>;
};

export default DotAccesnt;
