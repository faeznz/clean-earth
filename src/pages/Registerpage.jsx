import { useState } from "react";
import ImgBanner from "../assets/login/imgLogin.png";
import AuthInput from "../components/AuthInput";
import Button from "../components/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Guest from "../middleware/Guest";

const Registerpage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const [loading, setLoading] = useState(false);

  const registerAction = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_SERVICE}/users/register`,
        {
          nama: credentials.nama,
          username: credentials.username,
          email: credentials.email,
          kontak: credentials.kontak,
          password: credentials.password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      setLoading(false);
      withReactContent(Swal).fire({
        icon: "success",
        title: "Berhasil",
        text: "Akun Berhasil Di Buat!",
      });
      navigate("/masuk");
    } catch (error) {
      setLoading(false);
      if (error.response.status == 400) {
        withReactContent(Swal).fire({
          icon: "error",
          title: "Validasi Error",
          text: error.response.data.message[0].message,
        });
      } else if (error.response.status == 409) {
        withReactContent(Swal).fire({
          icon: "error",
          title: "Akun Sudah Tersedia",
          text: error.response.data.message,
        });
      } else {
        withReactContent(Swal).fire({
          icon: "error",
          title: "Server Error",
          text: "Server Sedang Bermasalah Harap Coba Lagi Nanti!",
        });
      }
    }
  };

  return (
    <Guest>
      <div
        className={
          "w-screen min-h-screen overflow-x-hidden bg-[#D0E7D2] flex flex-wrap"
        }
      >
        <Loading show={loading} />
        {/* Image For Desktop Only */}
        <div className={"hidden lg:flex lg:w-1/2 h-screen"}>
          <img
            src={ImgBanner}
            alt='Banner Image'
            className={"object-cover backdrop-brightness-110"}
          />
        </div>
        {/* Form Section */}
        <div className={"w-screen lg:w-1/2 py-7 lg:py-0"}>
          <div className='container mx-auto h-full flex justify-center items-center flex-col px-3 lg:px-0'>
            <div
              className={
                "bg-white py-7 px-5 rounded-lg w-full lg:w-3/4 flex flex-col gap-7"
              }
            >
              <h2 className={"text-5xl font-poppins font-medium"}>Daftar</h2>
              <form
                action='POST'
                onSubmit={registerAction}
                className={"flex flex-col gap-3"}
              >
                <div className={"flex flex-col gap-2"}>
                  <label htmlFor='nama' className={"font-poppins text-md"}>
                    Masukkan Nama Anda
                  </label>
                  <AuthInput
                    name='nama'
                    placeholder='Masukkan Nama Anda'
                    onChange={(e) =>
                      setCredentials({ ...credentials, nama: e.target.value })
                    }
                  />
                </div>
                <div className={"flex flex-col gap-2"}>
                  <label htmlFor='email' className={"font-poppins text-md"}>
                    Masukkan Alamat Email Anda
                  </label>
                  <AuthInput
                    name='email'
                    type='email'
                    placeholder='Masukkan Alamat Email Anda'
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                  />
                </div>
                <div
                  className={
                    "flex flex-wrap justify-between w-full gap-4 lg:gap-0"
                  }
                >
                  <div className={"flex flex-col gap-2 w-full lg:w-[48%]"}>
                    <label
                      htmlFor='username'
                      className={"font-poppins text-md"}
                    >
                      Username
                    </label>
                    <AuthInput
                      name='username'
                      placeholder='Username'
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          username: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={"flex flex-col gap-2 w-full lg:w-[48%]"}>
                    <label htmlFor='kontak' className={"font-poppins text-md"}>
                      Kontak
                    </label>
                    <AuthInput
                      name='kontak'
                      placeholder='Kontak'
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          kontak: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={"flex flex-col gap-2"}>
                  <label htmlFor='password' className={"font-poppins text-md"}>
                    Masukkan Password
                  </label>
                  <AuthInput
                    name='password'
                    type='password'
                    placeholder='Masukkan Password'
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <Button
                  className='w-fit h-fit py-3 px-2 bg-[#618264] text-white mx-auto'
                  type='submit'
                >
                  Daftar
                </Button>
              </form>
              <p className={"font-poppins text-md text-center"}>
                Sudah Punya Akun? &nbsp;
                <NavLink to={"/masuk"} className={"text-blue-400"}>
                  Login Disini
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Guest>
  );
};

export default Registerpage;

