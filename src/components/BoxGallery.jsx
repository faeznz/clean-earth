const BoxGallery = (props) => {
  const { gambar } = props;
  return (
    <div
      className={
        "w-3/5 md:w-1/4 lg:w-1/5 aspect-square overflow-hidden rounded-lg"
      }
    >
      <img
        src={gambar}
        alt='Gallery Image'
        className={"w-full aspect-square object-cover bg-center"}
      />
    </div>
  );
};

export default BoxGallery;
