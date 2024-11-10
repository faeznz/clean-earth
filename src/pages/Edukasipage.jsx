import Navbar from "../components/Navbar";
import CardEdukasi from "../components/CardEdukasi";
import apaitusampah from "../assets/edukasi/apa-itu-sampah.png";
import bannerSampah from "../assets/edukasi/banner-edukasi.png";
import Auth from "../middleware/Auth";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { token } from "../store";
import { useRecoilState } from "recoil";
import axios from "axios";
import User from "../middleware/User";

const Edukasipage = () => {
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const [datapostingan, setDatapostingan] = useState();
  useEffect(() => {
    const getPostingan = async () => {
      const result = await axios.post(
        `${import.meta.env.VITE_API_SERVICE}/postingan`,
        {},
        {
          headers: {
            Authorization: tokenJWT,
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      setDatapostingan(result.data.data);
    };

    getPostingan();
  }, []);

  return (
    <Auth>
      <User>
        <div className={"w-full overflow-x-hidden"}>
          <Navbar />
          <section
            className={
              "w-screen overflow-x-hidden h-[80vh] md:h-[70vh] lg:h-[80vh] bg-slate-900 relative"
            }
          >
            <img
              src={bannerSampah}
              alt=''
              className={"object-cover bg-center w-full h-full"}
            />
            <div
              className={
                "text-center w-full md:w-3/4 text-white z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
              }
            >
              <h2 className={"font-poppins text-3xl md:text-5xl font-semibold"}>
                Apa yang ingin kamu ketahui ?
              </h2>
              <p
                className={
                  "w-4/5 md:w-2/3 mt-3 font-poppins font-normal md:text-xl"
                }
              >
                Semakin banyak yang kamu ketahui mengenai sampah dan cara
                mengelolanya, maka akan semakin besar juga kesempatanmu untuk
                menyelamatkan bumi ini
              </p>
              <a href='#artikel'>
                <Button className='bg-[#618264]'>Jelajahi</Button>
              </a>
            </div>
          </section>
        </div>

        <section className='container mx-auto px-3 flex flex-wrap gap-8 text-[#444444]'>
          <div className='w-screen flex justify-center'>
            <div className='bg-[#B0D9B1] w-1/12 my-10 rounded-xl p-1'></div>
          </div>

          <div className='w-screen px-12 flex flex-col justify-between md:flex-row'>
            <div className='md:w-3/5'>
              <h1 className='text-4xl font-bold font-poppins' id={"jelajahi"}>
                Apa itu sampah ?
              </h1>
              <p className='text-xl font-poppins font-light my-8 text-justify'>
                Secara umum <span className='font-bold'>sampah</span> dapat
                diartikan sebagai material sisa dari rumah tangga dan produksi
                industri yang dibuang. Material sisa tersebut dapat berwujud zat{" "}
                <span className='font-bold'>padat, cair,</span> hingga{" "}
                <span className='font-bold'>gas.</span> Tidak jarang material
                seperti itu adalah bahan utama penyebab pencemaran
                lingkungannya. Sampah dikelompokkan menjadi{" "}
                <span className='font-bold'>dua jenis sampah</span> berdasarkan
                sifatnya, yaitu{" "}
                <span className='font-bold'>sampah organik</span> (dapat diurai
                atau degradable) dan{" "}
                <span className='font-bold'>sampah anorganik</span> (tidak dapat
                diurai atau undegradable).
              </p>
            </div>

            <div className='md:w-1/3 flex justify-center items-center'>
              <img
                src={apaitusampah}
                alt='sampah'
                className='bg-center bg-cover rounded-2xl'
              />
            </div>
          </div>

          <div className='w-screen py-16 flex flex-col justify-center'>
            <h1 className='text-3xl font-bold font-poppins text-center'>
              Sudah sejauh mana sih permasalahan sampah di Indonesia ?
            </h1>
            <div className='flex justify-center'>
              <div className='bg-[#C6C6C6] w-3/5 rounded-xl pt-0.5 mt-2'></div>
            </div>
            <div className='flex justify-center items-center mt-16'>
              <div className='w-3/4 md:w-1/2 flex justify-center'>
                <iframe
                  className='w-full aspect-video rounded-xl'
                  src='https://www.youtube.com/embed/i0bb7Et0ots'
                  title='Sejauh Mana Masalah Sampah di Indonesia?'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>

          <div className='w-screen flex justify-center'>
            <div className='bg-[#B0D9B1] w-1/12 rounded-xl p-1'></div>
          </div>

          <div className='w-screen py-16 flex flex-col justify-center'>
            <h1 className='text-3xl font-bold font-poppins text-center'>
              Kamu mau tonton video yang mana ?
            </h1>
            <p className='text-xl font-poppins font-light text-center my-8'>
              Kamu dapat mempraktekkan video tutorial ini. Semuanya mengenai
              cara mendaur ulang sampah nih
              <br />
              Selamat menonton !!!
            </p>
            <div className='flex flex-wrap justify-center items-center mt-16 gap-8'>
              <div className='w-3/4 md:w-1/4'>
                <iframe
                  className='w-full aspect-video rounded-xl'
                  src='https://www.youtube.com/embed/cjY-9U-YF4o'
                  title='3 Ide Daur Ulang dari Barang Bekas yang Sangat Bermanfaat'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowfullscreen
                ></iframe>
              </div>
              <div className='w-3/4 md:w-1/4'>
                <iframe
                  className='w-full aspect-video rounded-xl'
                  src='https://www.youtube.com/embed/EPoDzLTlmyY'
                  title='3 Ide Daur Ulang Sedotan Plastik | Ide Kreatif Sedotan Plastik Bekas'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowfullscreen
                ></iframe>
              </div>
              <div className='w-3/4 md:w-1/4'>
                <iframe
                  className='w-full aspect-video rounded-xl'
                  src='https://www.youtube.com/embed/ogE3n_KdYfg?list=PL5aQ2PMwUcmvQrmm9CdS1MWkODBlt7Qmh'
                  title='Ide Kreatif dari Gelas Plastik Bekas  || Ide yang Tak terpikirkan dari Gelas Plastik Minuman'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowfullscreen
                ></iframe>
              </div>
              <div className='w-3/4 md:w-1/4'>
                <iframe
                  className='w-full aspect-video rounded-xl'
                  src='https://www.youtube.com/embed/FrxrhaYsVWs'
                  title='Cara membuat Topi Karnaval Dari Kertas Bentuk Kerucut / Hiasan 17 Agustus'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowfullscreen
                ></iframe>
              </div>
              <div className='w-3/4 md:w-1/4'>
                <iframe
                  className='w-full aspect-video rounded-xl'
                  src='https://www.youtube.com/embed/MJd3bo_XRaU'
                  title='Daur ulang sampah plastik bungkus snack menjadi tempat pensil || Recycle from plastic snack'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowfullscreen
                ></iframe>
              </div>
              <div className='w-3/4 md:w-1/4'>
                <iframe
                  className='w-full aspect-video rounded-xl'
                  src='https://www.youtube.com/embed/yT-ntEUJq40'
                  title='ECOBRICK Sampah Plastik : Apa Itu Ecobric &amp; Cara Membuatnya (Gaya Hidup Berkelanjutan) Projek P5'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className='w-screen flex flex-col justify-center' id='artikel'>
            <h1 className='text-3xl font-bold font-poppins text-center'>
              Ada artikel juga nih, dibaca ya
            </h1>
            {datapostingan ? (
              <div className='flex flex-wrap justify-center items-center my-16 gap-8'>
                {datapostingan.map((item) => (
                  <CardEdukasi
                    imageSrc={"https://source.unsplash.com/random/?garbage"}
                    title={item.judul}
                    linkTo={`/baca/${item.id}`}
                  />
                ))}
              </div>
            ) : (
              <h3
                className={"text-center font-poppins font-bold text-3xl my-4"}
              >
                Coming Soon
              </h3>
            )}
          </div>
        </section>
        <Footer />
      </User>
    </Auth>
  );
};

export default Edukasipage;
