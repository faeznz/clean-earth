import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import { IoMdHome } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { RxExit } from "react-icons/rx";

import Logo from "../../../assets/img/Logo.png";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden='true'
      ></div>

      {/* Sidebar */}
      <div
        id='sidebar'
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-46 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-[#2d4e38] p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className='flex justify-between pr-3 sm:px-2'>
          {/* Close button */}
          <button
            ref={trigger}
            className='lg:hidden text-slate-500 hover:text-slate-400'
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls='sidebar'
            aria-expanded={sidebarOpen}
          >
            <span className='sr-only'>Close sidebar</span>
            <svg
              className='w-6 h-6 fill-current'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z' />
            </svg>
          </button>
        </div>
        <NavLink to='/profile'>
          <div className='flex justify-center mt-5'>
            <img
              src={Logo}
              alt=''
              className='2xl:w-[100px] lg:w-[60px] w-[100px]'
            />
          </div>
          <h2
            className={
              "font-poppins lg:hidden lg:sidebar-expanded:block 2xl:block text-2xl text-white font-semibold text-center mt-5"
            }
          >
            Dashboard User
          </h2>
        </NavLink>

        {/* Links */}
        <div className='space-y-8 mt-16'>
          <div>
            <h3 className='text-2xl font-poppins text-white font-semibold text-center'>
              {/* <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span> */}
              <span className=' font-poppins lg:hidden lg:sidebar-expanded:block 2xl:block'>
                CleanEarth
              </span>
            </h3>

            <div className='flex justify-center mt-5'>
              <ul className='flex flex-col justify-between h-full gap-5 mt-5 '>
                <NavLink
                  className={`block text-slate-200 truncate transition duration-150`}
                  to='/profile'
                >
                  <div className='flex items-center justify-between group'>
                    <div className='flex items-center '>
                      <IoMdHome className='text-slate-200 w-7 h-7 group-hover:text-green-500 ' />
                      <span className=' font-poppins text-base font-medium ml-3 2xl:inline lg:hidden lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 group-hover:text-green-500'>
                        Dashboard{" "}
                      </span>
                    </div>
                  </div>
                </NavLink>

                <NavLink
                  className={`block text-slate-200 truncate transition duration-150`}
                  to='/profile/transaksi'
                >
                  <div className='flex items-center justify-between group'>
                    <div className='flex items-center '>
                      <GrTransaction className='text-slate-200 w-7 h-7 group-hover:text-green-500' />
                      <span className=' font-poppins text-base font-medium ml-3 2xl:inline lg:hidden lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 group-hover:text-green-500'>
                        Transaksi{" "}
                      </span>
                    </div>
                  </div>
                </NavLink>

                <NavLink
                  className={`block text-slate-200 truncate transition duration-150`}
                  to='/profile/akunsaya'
                >
                  <div className='flex items-center justify-between group '>
                    <div className='flex items-center '>
                      <IoPersonCircleOutline className='text-slate-200 w-7 h-7 group-hover:text-green-500' />
                      <span className=' font-poppins text-sm font-medium ml-3 2xl:inline lg:hidden lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 group-hover:text-green-500'>
                        Akun Saya{" "}
                      </span>
                    </div>
                  </div>
                </NavLink>

                <NavLink
                  className={`block text-slate-200 truncate transition duration-150`}
                  to='/'
                >
                  <div className='flex items-center mt-28 md:mt-40 justify-between group'>
                    <div className='flex items-center'>
                      <RxExit className='text-slate-200 w-7 h-7 group-hover:text-green-500' />
                      <span className=' font-poppins text-sm font-medium ml-3 2xl:inline lg:hidden lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 group-hover:text-green-500'>
                        Keluar{" "}
                      </span>
                    </div>
                  </div>
                </NavLink>
              </ul>
            </div>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className='pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto'>
          <div className='px-3 py-2'>
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              {/* <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className='w-6 h-6 fill-current sidebar-expanded:rotate-180'
                viewBox='0 0 24 24'
              >
                <path
                  className='text-slate-400'
                  d='M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z'
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
