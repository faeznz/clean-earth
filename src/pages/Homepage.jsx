import Navbar from "../components/Navbar";
import Button from "../components/Button";
import CardFitur from "../components/CardFitur";
import DotAccesnt from "../components/DotAccent";
import BoxGallery from "../components/BoxGallery";
import Footer from "../components/Footer";
import LogoWelcomebanner from "../assets/img/LogoWelcomebanner.png";
import Iconedukasi from "../assets/img/Iconedukasi.png";
import Iconkomunitas from "../assets/img/Iconkomunitas.png";
import Prosespembuatan1 from "../assets/img/Prosespembuatan1.jpg";
import Prosespembuatan2 from "../assets/img/Prosespembuatan2.jpg";
import Prosespembuatan3 from "../assets/img/Prosespembuatan3.jpg";
import Prosespembuatan4 from "../assets/img/Prosespembuatan4.jpg";
import ContactUs from "../assets/img/ContactUs.png";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  return (
    <div className={"overflow-x-hidden"}>
      <Navbar />
      <section className='container mx-auto px-3 md:px-0 flex flex-wrap'>
        {/* Block For Text Banner Section */}
        <div
          className={
            "w-screen h-fit md:min-h-[calc(100vh-50vh)]  lg:min-h-[calc(100vh-80px)] md:w-1/2 py-10 flex flex-wrap gap-3 items-center justify-center lg:px-4 lg:py-0"
          }
        >
          <div className={"px-2 md:px-6"}>
            <h2
              className={
                "text-3xl font-bold font-poppins text-left lg:text-5xl"
              }
            >
              Hai,Selamat Datang !
            </h2>
            <p
              className={
                "text-base font-poppins font-normal my-4 lg:my-8 lg:text-lg"
              }
            >
              CleanEarth merupakan solusi dari permasalahan sampah anda. Yuk
              gabung bersama komunitas kami untuk membuat perubahan positif
              dalam menjaga bumi kita tetap hijau dan sehat{" "}
            </p>
            <NavLink
              to={"/komunitas"}
              className='bg-[rgb(97,130,100)] text-white shadow-xl px-5 py-3 rounded-md'
            >
              Gabung Yuk
            </NavLink>
          </div>
        </div>
        <div
          className={
            "w-screen md:min-h-[calc(100vh-50vh)] lg:min-h-[calc(100vh-80px)] md:w-1/2 flex justify-center items-center"
          }
        >
          <div
            className={
              "w-4/5 md:w-2/3 lg:w-4/6 aspect-square bg-gradient-to-b from-[#D0E7D2] to-transparent rounded-full p-4"
            }
          >
            <img
              src={LogoWelcomebanner}
              alt=''
              className={"bg-center bg-cover"}
            />
          </div>
        </div>
      </section>
      {/* Block Code Of Image Banner  */}
      {/* Block Code Of  Tentang Kami Start*/}
      <section
        className={
          "container mx-auto h-fit overflow-x-hidden flex flex-col py-20 lg:py-5 mg:px-10 lg:px-20 px-5"
        }
      >
        <h2
          className={"font-poppins text-2xl text-center font-semibold"}
          id={"tentangKami"}
        >
          Tentang Kami
        </h2>
        <DotAccesnt count='3' className='mx-auto' />
        <div
          className={
            "container mx-auto bg-[#F9F8F8] my-2 lg:py-10 lg:px-16 rounded-lg shadow-lg h-fit py-3 px-2"
          }
        >
          <p className={"text-center font-poppins text-base"}>
            &quot;Clean Earth&quot; merupakan sumber daya online yang bertujuan
            membantu masyarakat untuk lebih peduli dengan lingkungan sekitar.
            Salah satu usaha dalam menjaga lingkungan yakni melakukan
            pengelolaan sampah dengan baik. Website ini menyediakan berbagai
            fitur dan sumber daya untuk membantu pengguna mengatasi masalah
            penumpukan sampah dan mencapai lingkungan yang lebih bersih dan
            sehat.
          </p>
        </div>
      </section>
      {/* Block Code Of  Tentang Kami End*/}
      {/* Fitur Utama Section Start */}
      <section
        className={
          "lg:py-10 mg:px-10 lg:px-20 py-10 container mx-auto flex flex-col"
        }
      >
        <h2 className={"font-poppins text-2xl text-center font-semibold"}>
          Fitur Utama
        </h2>
        <DotAccesnt count='3' className='mx-auto' />
        <div
          className={"flex justify-center flex-wrap w-full gap-x-32 gap-y-5"}
        >
          <CardFitur
            gambar={Iconedukasi}
            judul='edukasi'
            deskripsi='Menampilkan segala informasi mengenai pengelolaan sampah'
          />
          <CardFitur
            gambar={Iconkomunitas}
            judul='komunitas'
            deskripsi='kamu bisa berinteraksi dan berbagi pengalaman terkait dengan pengelolaan sampah'
          />
        </div>
      </section>
      {/* Fitur Utama Section End */}
      {/* Galery Kami Start */}
      <section
        className={
          "container mx-auto lg:py-10 mg:px-10 lg:px-20  flex flex-col py-10"
        }
      >
        <h2 className={"font-poppins text-2xl text-center font-semibold"}>
          Galeri Kami
        </h2>
        <DotAccesnt count='3' className='mx-auto' />
        <div className={"flex flex-wrap justify-center gap-x-6 gap-y-4"}>
          <BoxGallery gambar={Prosespembuatan1} />
          <BoxGallery gambar={Prosespembuatan2} />
          <BoxGallery gambar={Prosespembuatan3} />
          <BoxGallery gambar={Prosespembuatan4} />
        </div>
      </section>
      {/* Galery Kami End */}
      {/* Hubungi Kami Start */}
      <section
        className={
          "lg:py-10 mg:px-10 lg:px-20 py-5 px-4 container mx-auto flex flex-col"
        }
      >
        <div
          className={
            "w-full md:w-[90%] md:aspect-[6/4] lg:aspect-[6/3] h-fit md:bg-[#F6F6F6] md:shadow-lg mx-auto rounded-md md:rounded-3xl overflow-hidden flex flex-wrap"
          }
        >
          {/* Form Section */}
          <div
            className={
              "w-full md:w-[60%] h-fit md:h-full px-4 py-4 md:py-7 md:px-6 flex flex-col gap-3 md:gap-8 md:justify-center"
            }
          >
            <h2 className={"font-montserrat text-4xl font-bold"}>
              Hubungi Kami
            </h2>
            <p className={"font-montserrat text-base"}>
              Jika kamu memiliki pertanyaan, umpan balik, atau ingin
              berkolaborasi, jangan ragu untuk menghubungi kami. Tim kami siap
              membantu dan akan merespons secepat mungkin
            </p>
            <form
              action='#'
              method={"POST"}
              className={"flex flex-col gap-5 md:gap-2"}
            >
              <input
                type='text'
                placeholder={"Nama"}
                className={
                  "py-2 px-4 outline outline-[0.5px] outline-[#E0E0E0] placeholder:font-montserrat placeholder:font-light placeholder:text-sm"
                }
              />
              <input
                type='text'
                placeholder={"Email"}
                className={
                  "py-2 px-4 outline outline-[0.5px] outline-[#E0E0E0] placeholder:font-montserrat placeholder:font-light placeholder:text-sm"
                }
              />
              <input
                type='text'
                placeholder={"Pesan"}
                className={
                  "py-2 px-4 outline outline-[0.5px] outline-[#E0E0E0] placeholder:font-montserrat placeholder:font-light placeholder:text-sm"
                }
              />
              <Button
                type='submit'
                className='w-full bg-[#618264] font-montserrat text-white font-bold'
              >
                KIRIM
              </Button>
            </form>
          </div>
          {/* Form Section End */}
          {/* Image Form Only For Desktop Start */}
          <div className={"hidden md:flex md:w-[40%] h-full"}>
            <img
              src={ContactUs}
              alt='Form Decoration Image'
              className={"bg-center object-cover w-full h-full"}
            />
          </div>
          {/* Image Form Only For Desktop End */}
        </div>
      </section>
      {/* Hubungi Kami End */}
      {/* Footer Start */}
      <Footer />
      {/* Footer End */}
    </div>
  );
};

export default Homepage;
