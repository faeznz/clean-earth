const CardFitur = (props) => {
  const { gambar, judul, deskripsi } = props;
  return (
    <div
      className={
        "w-[70%] max-w-[250px] aspect-[2/3] max-h-[300px] rounded-lg bg-[#F9F8F8] my-1 shadow-lg py-6 flex flex-col gap-4 justify-center"
      }
    >
      <div
        className={
          "w-1/3 rounded-full aspect-square bg-[#D0E7D2] mx-auto flex justify-center items-center"
        }
      >
        <img src={gambar} alt='Icons' className={"bg-center bg-cover"} />
      </div>
      <h2
        className={
          "uppercase font-poppins font-semibold text-center text-2xl text-[#444444]"
        }
      >
        {judul}
      </h2>
      <p
        className={
          "text-center w-[70%] mx-auto font-popins text-sm leading-relaxed tracking-wider font-[400]"
        }
      >
        {deskripsi}
      </p>
    </div>
  );
};

export default CardFitur;
