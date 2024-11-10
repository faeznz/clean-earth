import React, { useEffect, useState } from "react";
import { datausers } from "../../../store";
import { useRecoilState } from "recoil";
import guestUser from "../../../assets/img/guestUsers.webp";

function Header({ sidebarOpen, setSidebarOpen }) {
  const [datauser, setDatauser] = useRecoilState(datausers);

  return (
    <header className='sticky top-0 z-30'>
      <div className='px-4 sm:px-6 lg:px-0'>
        <div className='flex items-center justify-between h-16 -mb-px'>
          {/* Header: Left side */}
          <div className='flex items-center  '>
            {/* Hamburger button */}
            <button
              className='text-slate-500 hover:text-slate-600 lg:hidden'
              aria-controls='sidebar'
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className='sr-only'>Open sidebar</span>
              <svg
                className='w-6 h-6 fill-current'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect x='4' y='5' width='16' height='2' />
                <rect x='4' y='11' width='16' height='2' />
                <rect x='4' y='17' width='16' height='2' />
              </svg>
            </button>
          </div>
          <div className='flex border-2 border-black rounded-full p-2 lg:mr-14 sm:mr-0 items-center gap-2'>
            <img
              src={
                datauser.image == null
                  ? guestUser
                  : `${import.meta.env.VITE_API_SERVICE}${datauser.image}`
              }
              alt=''
              className='w-8 aspect-square rounded-full object-cover bg-center'
            />
            <h2 className='font-poppins font-bold lg:text-base sm:text-sm'>
              {datauser.nama}
            </h2>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
