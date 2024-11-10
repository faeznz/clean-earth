import { useState } from "react";
import Logo from "../assets/img/Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { IoMdMenu } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { token, datausers } from "../store";
import { useRecoilState } from "recoil";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const [configToggle, setConfigToggle] = useState(false);
  const [datauser, setDatauser] = useRecoilState(datausers);
  const navigate = useNavigate();

  const handleLogout = () => {
    setTokenJWT(undefined);
    setConfigToggle(false);
    setDatauser({});
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className='bg-white w-screen z-40'>
      <div className='flex items-center justify-between md:px-3 lg:px-7'>
        <div className='z-50 p-5 md:w-auto w-full flex justify-between '>
          <div className='flex'>
            <img src={Logo} alt='logo' className='md:cursor-pointer h-9' />
            <h1 className='pt-1 pl-2 font-bold text-xl'>CleanEarth</h1>
          </div>
          <div className='text-3xl md:hidden' onClick={() => setOpen(!open)}>
            <IoMdMenu name={`${open ? "close" : "menu"}`} />
          </div>
        </div>
        {/* Navigation For Desktop */}
        <ul
          className={"hidden md:flex gap-7 font-light font-poppins text-base"}
        >
          <li>
            <NavLink to={"/"}>Beranda</NavLink>
          </li>
          <li>
            <NavLink to={"/edukasi"}>Edukasi</NavLink>
          </li>
          <li>
            <NavLink to={"/komunitas"}>Komunitas</NavLink>
          </li>
        </ul>
        {datauser.nama == undefined ? (
          <div className={"hidden md:flex gap-3"}>
            <Button className='bg-[#618264] text-white' type='submit'>
              <NavLink to='daftar'>Daftar</NavLink>
            </Button>
            <Button className='bg-[#F6F6F6] shadow-xl' type='submit'>
              <NavLink to='masuk'>Masuk</NavLink>
            </Button>
          </div>
        ) : (
          <div
            className={
              "hidden md:flex px-2 rounded-2xl py-1 outline outline-2 outline-black gap-2 items-center relative cursor-pointer"
            }
            onClick={() => setConfigToggle(!configToggle)}
          >
            <div
              className={
                "w-8 aspect-square rounded-full bg-green-700 flex justify-center items-center overflow-hidden"
              }
            >
              {datauser.image == null ? (
                <FaUser width={"100%"} height={"100%"} color={"white"} />
              ) : (
                <img
                  src={`${import.meta.env.VITE_API_SERVICE}${datauser.image}`}
                  alt='Profile Picture'
                  className={"w-full h-full object-cover"}
                />
              )}
            </div>
            <p className={"font-poppins font-medium text-sm"}>
              {datauser.nama}
            </p>
            {/* Toggle Action User Navbar Start*/}
            <div
              className={`${
                configToggle ? "flex" : "hidden"
              } absolute -bottom-16 rounded-2xl py-1 px-2 w-full outline outline-1 bg-white outline-green-600 right-0 flex-col font-poppins z-50`}
            >
              <NavLink to={"/profile"}>Akun Saya</NavLink>
              <button
                className={"w-fit text-red-600"}
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
            {/* Toggle Action User Navbar End*/}
          </div>
        )}

        {/* Mobile navbar */}
        <ul
          className={`md:hidden flex flex-col items-center z-50  bg-white fixed w-full h-full bottom-0 py-24 pl-4 duration-500 ${
            open ? "left-0" : "left-[-100%]"
          }`}
        >
          <li>
            <NavLink to='/' className='py-7 px-3 inline-block font-medium  '>
              Beranda
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/edukasi'
              className='py-7 px-3 inline-block font-medium'
            >
              Edukasi
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/komunitas'
              className='py-7 px-3 inline-block font-medium'
            >
              Komunitas
            </NavLink>
          </li>
          {datauser.nama == undefined ? (
            <div className={"flex md:hidden gap-3 py-3"}>
              <NavLink to={"/daftar"}>
                <Button className=' bg-[#618264] text-white' type='submit'>
                  Daftar
                </Button>
              </NavLink>

              <NavLink to={"/masuk"}>
                <Button className='bg-[#F6F6F6] shadow-xl' type='submit'>
                  Masuk
                </Button>
              </NavLink>
            </div>
          ) : (
            <div>
              <div
                className={
                  "py-2 px-4 outline outline-2 outline-black rounded-2xl flex gap-2 items-center"
                }
                onClick={() => setConfigToggle(!configToggle)}
              >
                <p className={"font-poppins font-medium text-md flex"}>
                  {datauser.nama}
                </p>
                <IoMdArrowDropdown size={24} />
              </div>
            </div>
          )}
          {configToggle ? (
            <ul
              className={
                "text-center flex flex-col gap-2 my-3 font-poppins text-md font-medium"
              }
            >
              <li>
                <NavLink to={"/profile"}>Akun Saya</NavLink>
              </li>
              <li
                className={"text-red-600 cursor-pointer"}
                onClick={() => handleLogout()}
              >
                Logout
              </li>
            </ul>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
