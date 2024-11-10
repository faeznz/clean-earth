import React, { useState } from "react";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import { datausers, token } from "../../../store";
import { useRecoilState } from "recoil";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../../../components/Loading";

const PengaturanBiodata = () => {
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const [validatepassword, setValidatepassword] = useState(null);
  const [datauser, setDatauser] = useRecoilState(datausers);
  const [tempdata, setTempdata] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const renewData = async () => {
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_API_SERVICE}/users/validate`,
          {},
          {
            headers: {
              Authorization: tokenJWT,
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        setDatauser(result.data.data);
        setTempdata({
          nama: result.data.data.nama,
          username: result.data.data.username,
          email: result.data.data.email,
          kontak: result.data.data.kontak,
          usia: result.data.data.usia,
          alamat: result.data.data.alamat,
          gender: result.data.data.gender,
        });
      } catch (error) {
        setDatauser({});
        setTokenJWT(undefined);
        navigate("/masuk");
      }
    };
    renewData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validatepassword != tempdata.password) {
      setLoading(false);
      withReactContent(Swal).fire({
        icon: "error",
        title: "Validation Error",
        text: "Password Tidak Sama!",
      });
    } else {
      try {
        const updateData = await axios.put(
          `${import.meta.env.VITE_API_SERVICE}/users/update`,
          tempdata,
          {
            headers: {
              Authorization: tokenJWT,
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        const validateUsers = await axios.post(
          `${import.meta.env.VITE_API_SERVICE}/users/validate`,
          {},
          {
            headers: {
              Authorization: updateData.data.token,
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        setTokenJWT(updateData.data.token);
        setDatauser(validateUsers.data.data);
        withReactContent(Swal).fire({
          icon: "success",
          title: "Berhasil",
          text: "Ubah Password Berhasil",
        });
        setLoading(false);
        navigate("/profile/akunsaya");
      } catch (error) {
        setLoading(false);
        if (error.response.status == 400) {
          const err = error.response.data.message[0];
          withReactContent(Swal).fire({
            icon: "error",
            title: "Validation Error",
            text: err.message,
          });
        } else {
          withReactContent(Swal).fire({
            icon: "error",
            title: "Validation Error",
            text: error.response.data.message,
          });
        }
      }
    }
  };

  return (
    <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
      <Loading show={loading} />
      <main>
        <div className='relative mx-4 sm:p-6 rounded-sm overflow-hidden'>
          <h1 className='font-poppins p-4 rounded-lg text-2xl md:text-3xl shadow-xl font-bold capitalize'>
            Pengaturan Akun
          </h1>
        </div>
        <div>
          <ul className='flex mt-7'>
            <NavLink
              to='/profile/pengaturanbiodata'
              className='flex items-center justify-between group lg:mx-10 mx-5'
              activeClassName='border-b-2 border-black'
            >
              <div className='flex items-center'>
                <span className='font-poppins text-base font-medium ml-3 2xl:opacity-100 duration-200'>
                  Biodata diri
                </span>
              </div>
            </NavLink>
            <NavLink
              to='/profile/pengaturankatasandi'
              className='flex items-center justify-between group'
              activeClassName='border-b-2 border-black'
            >
              <div className='flex items-center border-b-4 p-2 '>
                <span className='font-poppins text-base font-medium ml-3 2xl:opacity-100 duration-200'>
                  Kata Sandi
                </span>
              </div>
            </NavLink>
          </ul>
        </div>
        <div className='ml-10 lg:ml-0 mt-1'>
          <div className='flex flex-col p-4 w-5/6'>
            <div className='relative sm:p-6 rounded-sm overflow-hidden'>
              <div className='font-poppins py-4 px-2 rounded-lg text-xl shadow-xl flex justify-between items-center'>
                <h1 className='font-bold'>Ubah Kata Sandi</h1>
                <div></div>
              </div>
              <div>
                <form
                  action=''
                  method={"POST"}
                  onSubmit={handleSubmit}
                  className='flex flex-col gap-3 mt-5'
                >
                  <div className='flex flex-col gap-2'>
                    <label
                      htmlFor='nama'
                      className='font-poppins'
                      required={true}
                    >
                      Kata Sandi Baru
                    </label>
                    <input
                      type='password'
                      min={5}
                      class='rounded border-[#343735]'
                      onChange={(e) =>
                        setTempdata({ ...tempdata, password: e.target.value })
                      }
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='nama' className='font-poppins'>
                      Konfirmasi Kata Sandi Baru
                    </label>
                    <input
                      type='password'
                      min={5}
                      class='rounded border-[#343735]'
                      required={true}
                      onChange={(e) => setValidatepassword(e.target.value)}
                    />
                  </div>
                  <div className='mt-5'>
                    <NavLink
                      to={"/profile/akunsaya"}
                      className='bg-[#949494] py-2 px-4   rounded-xl mr-2 text-sm text-center text-slate-200'
                    >
                      <a href=''>Batal</a>
                    </NavLink>
                    <button
                      type={"submit"}
                      className='bg-[#154EF9] py-2 px-4  rounded-xl text-sm text-center text-slate-200'
                    >
                      Ubah Kata Sandi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PengaturanBiodata;
