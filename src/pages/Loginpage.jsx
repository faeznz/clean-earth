import ImgBanner from "../assets/login/imgLogin.png";
import AuthInput from "../components/AuthInput";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { token, datausers } from "../store";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "../components/Button";
import Loading from "../components/Loading";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Guest from "../middleware/Guest";

const Loginpage = () => {
  const [credentials, setCredentials] = useState({});
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const [loading, setLoading] = useState(false);
  const [datauser, setDatauser] = useRecoilState(datausers);
  const navigate = useNavigate();

  const loginAction = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_SERVICE}/users/login`,
        {
          email: credentials.email,
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
        text: "Login Berhasil",
      });
      setTokenJWT(res.data.token);
      const result = await axios.post(
        `${import.meta.env.VITE_API_SERVICE}/users/validate`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: res.data.token,
          },
        }
      );
      setDatauser(result.data.data);
      if (result.data.data.role == "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      if (error.response.status == 400) {
        withReactContent(Swal).fire({
          icon: "error",
          title: "Validation Error",
          text: error.response.data.message[0].message,
        });
      } else if (error.response.status == 403) {
        withReactContent(Swal).fire({
          icon: "error",
          title: "Forbidden",
          text: error.response.data.message,
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
        {/* Loading Sign */}
        <Loading show={loading} />
        {/* Loading Sign */}
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
              <h2 className={"text-5xl font-poppins font-medium"}>Masuk</h2>
              <form
                action='POST'
                className={"flex flex-col gap-3"}
                onSubmit={loginAction}
              >
                <div className={"flex flex-col gap-2"}>
                  <label htmlFor='email' className={"font-poppins text-md"}>
                    Masukkan Email Anda
                  </label>
                  <AuthInput
                    name='email'
                    placeholder='Masukkan Email Anda'
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                    // type='email'
                  />
                </div>
                <div className={"flex flex-col gap-2"}>
                  <label htmlFor='password' className={"font-poppins text-md"}>
                    Masukkan Password Anda
                  </label>
                  <AuthInput
                    name='password'
                    type='password'
                    placeholder='Masukkan Email Anda'
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
                  Masuk
                </Button>
              </form>
              <p className={"font-poppins text-center"}>
                Belum Punya Akun? &nbsp;
                <NavLink
                  className={"text-blue-400 hover:text-blue-500"}
                  to={"/daftar"}
                >
                  Daftar Disini
                </NavLink>
              </p>
              <p className={"font-poppins text-center"}>
                <NavLink
                  className={"text-blue-400 hover:text-blue-500"}
                  to={"/"}
                >
                  Kembali Ke Homepage
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Guest>
  );
};

export default Loginpage;
