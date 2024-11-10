import React from "react";
import { NavLink } from "react-router-dom";

const CardEdukasi = ({ imageSrc, title, content, linkTo }) => {
  return (
    <div className='flex flex-col text-center w-80 h-96 shadow-xl rounded-2xl'>
      <div className='flex flex-col text-center gap-2 p-2'>
        <img
          src={imageSrc}
          alt={title}
          className='bg-center object-cover rounded-2xl w-full aspect-video'
        />
        <h2 className='text-md font-bold font-poppins'>{title}</h2>
      </div>
      <div className='p-2 block mt-auto bg-[#B0D9B1] rounded-b-2xl'>
        <button>
          <NavLink to={linkTo}>BACA SELENGKAPNYA</NavLink>
        </button>
      </div>
    </div>
  );
};

export default CardEdukasi;
