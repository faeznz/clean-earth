import { Link } from "react-router-dom";

import { FaInstagram } from "react-icons/fa6";
import { MdOutlineFacebook } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className={"mg:px-10 lg:px-20 py-5 px-4 h-auto bg-[#20241F]"}>
      <div className="container mx-auto h-full flex flex-wrap justify-center px-3">
        <div
          className={
            "flex flex-col md:items-center text-white gap-x-10 gap-y-5 font-outfit w-full md:w-fit"
          }
        >
          <ul className={"flex flex-col mt-5 md:flex-row items-center gap-5 md:mt-16 w-full md:w-fit  "}>
            <Link
              to={"https://www.instagram.com/cleanearth23/"}
              target="_blank"
            >
              <li className={"flex flex-row"}>
                <FaInstagram className="w-7 h-7 mr-2" />
                <label htmlFor="" className="text-xl">Instagram</label>
              </li>
            </Link>
            <Link
              to={"https://www.facebook.com/people/Celan-Earth/61554381076404/"}
              target="_blank"
            >
              <li className={"flex flex-row"}>
                <MdOutlineFacebook className="w-7 h-7 mr-4" />
                <label htmlFor="" className="text-xl ">Facebook</label>
              </li>
            </Link>
            <Link to={""}>
              <li className={"flex flex-row"}>
                <BsLinkedin className="w-6 h-7 mr-4" />
                <label htmlFor="" className="text-xl">Linked in</label>
              </li>
            </Link>
            <Link to={""}>
              <li className={"flex flex-row"}>
                <FaYoutube className="w-7 h-7 mr-4" />
                <label htmlFor="" className="text-xl">YouTube</label>
              </li>
            </Link>
          </ul>
          <ul className={"flex flex-col items-center gap-5 mt-10 md:gap-8 md:mt-2 w-full md:w-fit md:flex-row "}>
            <li className={"text-xl font-light text-[#F4F0F0]"}>
              <a href={"/"}>Beranda</a>
            </li>
            <li className={"text-xl font-light text-[#F4F0F0]"}>
              <a href={"/edukasi"}>Edukasi</a>
            </li>
            <li className={"text-xl font-light text-[#F4F0F0]"}>
              <a href={"/komunitas"}>Komunitas</a>
            </li>
            <li className={"text-xl font-light text-[#F4F0F0]"}>
              <a href={"/"}>Umpan Balik</a>
            </li>
          </ul>
        </div>
        <h2
          className={
            "w-full text-center font-poppins font-semibold text-lg text-[#F4F0F0] mt-10 md:mt-16"
          }
        >
          Copyright ©2023; CleanEarth
        </h2>
      </div>
    </section>
  );
};

export default Footer;
