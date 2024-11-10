import React from "react";
import { NavLink } from "react-router-dom";

import { FaRegCalendar } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";

const CardDashboard = ({ jumlahadmin, jumlahuser }) => {
  return (
    <div className='lg:grid grid-cols-4 md:grid gap-24'>
      <NavLink>
        <div className='flex justify-between bg-[#FFE5E5] lg:w-72 md:w-52 p-5 rounded-lg shadow-xl mx-10 mb-8'>
          <div className='flex flex-col justify-center font-poppins'>
            <h2 className='text-4xl mb-2'>2023</h2>
            <p className='text-sm'>Tahun</p>
          </div>
          <div className='ml-5'>
            <FaRegCalendar className='w-20 h-20' />
          </div>
        </div>
      </NavLink>

      <NavLink>
        <div className='flex justify-between bg-[#FFE5CD] lg:w-72 md:w-52 p-5 rounded-lg shadow-xl mx-10 mb-8'>
          <div className='flex flex-col justify-center font-poppins'>
            <h2 className='text-4xl mb-2'>{jumlahadmin}</h2>
            <p className='text-sm md:text-xs'>Jumlah Petugas</p>
          </div>
          <div className='ml-5'>
            <RiAdminFill className='w-20 h-20' />
          </div>
        </div>
      </NavLink>

      <NavLink>
        <div className='flex justify-between bg-[#E8FFE4] lg:w-72 md:w-52 p-5 rounded-lg shadow-xl mx-10 mb-8'>
          <div className='flex flex-col justify-center font-poppins'>
            <h2 className='text-4xl mb-2'>{jumlahuser}</h2>
            <p className='text-sm md:text-xs'>Jumlah Nasabah</p>
          </div>
          <div className='ml-5'>
            <IoPerson className='w-20 h-20' />
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default CardDashboard;
