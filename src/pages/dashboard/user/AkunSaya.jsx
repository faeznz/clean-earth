import React from "react";

import { datausers } from "../../../store";
import { useRecoilState } from "recoil";
import guestUsers from "../../../assets/img/guestUsers.webp";
import { convertToInternationalFormat } from "../../../function/convertToInternationalNumber";
import { NavLink } from "react-router-dom";

const AkunSaya = () => {
  const [datauser, setDatauser] = useRecoilState(datausers);
  return (
    <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
      <main>
        <div className='relative mx-4 sm:p-6 rounded-sm overflow-hidden'>
          <h1 className='font-poppins p-4 rounded-lg text-2xl md:text-3xl shadow-xl font-bold capitalize'>
            Pengaturan Akun
          </h1>
        </div>
        <div className='flex flex-col items-center my-4 py-10'>
          <div>
            <img
              src={
                datauser.image == null
                  ? guestUsers
                  : `${import.meta.env.VITE_API_SERVICE}${datauser.image}`
              }
              alt=''
              className={
                "w-1/2 md:w-2/3 max-w-md aspect-square object-cover rounded-full mx-auto"
              }
            />
          </div>
          <div className='text-center font-poppins mt-5 w-full'>
            <h2 className='font-bold  text-3xl mt-5'>{datauser.nama}</h2>
            <p className='mt-5 text-xl font-semibold'>{datauser.alamat}</p>
            <p className='mt-5 text-lg'>{datauser.email}</p>
            <p className='mt-5 text-lg'>
              {convertToInternationalFormat(datauser.kontak)}
            </p>
          </div>
          <div className='mt-5 font-poppins'>
            <NavLink
              to={"/profile/pengaturanbiodata"}
              className='bg-[#B0D9B1] py-3 px-6 w-28 rounded-xl'
            >
              Edit
            </NavLink>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AkunSaya;
