import React from "react";
import { useRecoilState } from "recoil";
import { datausers } from "../../../store";

function WelcomeBanner() {
  const [datauser, setDatauser] = useRecoilState(datausers);
  return (
    <div className='relative p-2 sm:p-6 rounded-sm overflow-hidden mb-3'>
      {/* Content */}
      <div className='relative'>
        <h1 className=' font-poppins text-2xl md:text-3xl text-slate-800 font-bold mb-1 capitalize'>
          Selamat Datang, {datauser.nama} 👋
        </h1>
        <p className=' font-poppins'>
          Semoga sehat selaluu dan pastinya bahagia terusss.{" "}
        </p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
