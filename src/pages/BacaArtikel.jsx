import Navbar from "../components/Navbar";
import Auth from "../middleware/Auth";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { token } from "../store";
import { useEffect, useState } from "react";
import axios from "axios";

const BacaArtikel = () => {
  const { id } = useParams();
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const navigate = useNavigate();
  const [postingan, setPostingan] = useState({});
  useEffect(() => {
    const getSinglePostingan = async () => {
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_API_SERVICE}/postingan/${id}`,
          {},
          {
            headers: {
              Authorization: tokenJWT,
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        setPostingan(result.data.data);
      } catch (error) {
        navigate("/edukasi");
      }
    };
    getSinglePostingan();
  }, [navigate]);
  return (
    <Auth>
      <div className={"w-full overflow-x-hidden"}>
        <Navbar />
        <div
          style={{
            backgroundImage: `url(https://source.unsplash.com/random/?garbage)`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
          className=' mx-auto py-16 flex justify-center gap-8 mb-16'
        >
          <div className='md:w-1/2 py-32 flex flex-col justify-center text-white'>
            <div className='px-8 text-center'>
              <h1 className='text-3xl md:text-4xl font-bold font-poppins'>
                {postingan.judul}
              </h1>
            </div>
          </div>
        </div>

        <section className='container mx-auto px-3 flex flex-wrap gap-8 text-[#444444]'>
          <div className='w-screen flex justify-center'>
            <div className='bg-[#B0D9B1] w-1/12 rounded-xl p-1'></div>
          </div>

          <div className='w-screen py-16 flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold font-poppins text-center'>
              {postingan.judul}
            </h1>
            <div
              className='text-xl font-poppins font-light my-8 text-justify'
              dangerouslySetInnerHTML={{ __html: postingan.isi }}
            ></div>
          </div>
        </section>
      </div>

      <Footer />
    </Auth>
  );
};

export default BacaArtikel;
