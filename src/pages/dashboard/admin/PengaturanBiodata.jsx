import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineImage } from "react-icons/md";
import guestUsers from "../../../assets/img/guestUsers.webp";
import { datausers, token } from "../../../store";
import { useRecoilState } from "recoil";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../../../components/Loading";

const PengaturanBiodata = () => {
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const [datauser, setDatauser] = useRecoilState(datausers);
  const [useradata, setUserdata] = useState({});
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(null);
  const [dataform, setDataform] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getDataUsers = async () => {
      setLoading(true);
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
        setUserdata(result.data.data);
        setDataform({
          nama: result.data.data.nama,
          username: result.data.data.username,
          gender: result.data.data.gender,
          usia: result.data.data.usia,
          alamat: result.data.data.alamat,
          email: result.data.data.email,
          kontak: result.data.data.kontak,
        });
        if (result.data.data.image == null) {
          setImageURL(guestUsers);
        } else {
          setImageURL(
            `${import.meta.env.VITE_API_SERVICE}${result.data.data.image}`
          );
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setTokenJWT(undefined);
        navigate("/masuk");
      }
    };
    getDataUsers();
  }, [navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setDataform({ ...dataform, image: reader.result });
      };
      reader.readAsDataURL(file);
      const imageURL = URL.createObjectURL(file);
      setImageURL(imageURL);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateData = await axios.put(
        `${import.meta.env.VITE_API_SERVICE}/users/update`,
        dataform,
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
        text: "Update Data Berhasil",
      });
      setLoading(false);
      navigate("/dashboard/pengaturan");
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
  };

  return (
    <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
      <Loading show={loading} />
      <main>
        <div className='relative mx-4 sm:p-6 rounded-sm overflow-hidden'>
          <h1 className='font-poppins p-4 rounded-lg text-2xl md:text-3xl bg-[#718977] text-white shadow-xl font-bold capitalize'>
            Pengaturan Akun Admin
          </h1>
        </div>
        <div>
          <ul className='flex mt-7'>
            <NavLink
              to='/dasboard/pengaturan'
              className='flex items-center justify-between group lg:mx-10 mx-5'
              activeClassName='border-b-2 border-black'
            >
              <div className='flex items-center border-b-4 p-2  text-center'>
                <span className='font-poppins text-base font-medium 2xl:opacity-100 duration-200'>
                  Biodata diri
                </span>
              </div>
            </NavLink>
            <NavLink
              to='/dashboard/katasandi'
              className='flex items-center justify-between group'
              activeClassName='border-b-2 border-black'
            >
              <div className='flex items-center'>
                <span className='font-poppins text-base font-medium ml-3 2xl:opacity-100 duration-200'>
                  Kata Sandi
                </span>
              </div>
            </NavLink>
          </ul>
        </div>
        <div className='sm:flex justify-center flex-col lg:flex-row mt-10'>
          <div className='w-96 flex flex-col items-center p-5'>
            <img
              src={imageURL}
              alt=''
              className={`w-4/5 object-cover bg-center aspect-square rounded-full`}
            />
            <div className='bg-[#343735] font-poppins text-white p-2 w-2/3 rounded-xl mt-5 overflow-hidden flex items-center justify-center gap-3'>
              <MdOutlineImage size={30} />
              <label
                htmlFor='fileInput'
                className='cursor-pointer font-medium text-slate-100 text-center hover:text-slate-500 focus:outline-none focus:underline transition duration-150 ease-in-out'
              >
                Choose a file
                <input
                  id='fileInput'
                  type='file'
                  className='sr-only'
                  accept='image/*'
                  onChange={(e) => handleImageChange(e)}
                />
              </label>
            </div>
          </div>

          <div className='sm:flex ml-10 p-4 md:flex-col w-5/6'>
            <div className='relative sm:p-6 rounded-sm overflow-hidden'>
              <div className='font-poppins py-4 px-2 rounded-lg text-xl shadow-xl flex justify-between items-center'>
                <h1 className='font-bold'>Informasi Data Diri</h1>
                <div>
                  <NavLink
                    to={"/dashboard/pengaturan"}
                    className='bg-[#949494] p-2 hidden md:inline-block w-20 rounded-xl mr-2 text-sm text-center'
                  >
                    Batal
                  </NavLink>
                </div>
              </div>
              <div>
                <form
                  action=''
                  method={"POST"}
                  className='flex flex-col gap-3 mt-5'
                  onSubmit={editData}
                >
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='nama' className='font-poppins'>
                      Nama Lengkap
                    </label>
                    <input
                      required={true}
                      type='text'
                      className='rounded border-[#343735]'
                      defaultValue={useradata.nama}
                      onChange={(e) => {
                        setDataform({ ...dataform, nama: e.target.value });
                      }}
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='jenisKelamin' className='font-poppins'>
                      Jenis Kelamin
                    </label>
                    <select
                      required={true}
                      id='jenisKelamin'
                      className='rounded border-[#343735]'
                      onChange={(e) => {
                        setDataform({ ...dataform, gender: e.target.value });
                      }}
                      defaultValue={datauser.gender || useradata.gender}
                    >
                      <option value=''>Pilih Jelas Kelamin</option>
                      <option value='L'>Laki-Laki</option>
                      <option value='P'>Perempuan</option>
                    </select>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='nama' className='font-poppins'>
                      Usia
                    </label>
                    <input
                      pattern='[0-9]*'
                      required={true}
                      type='text'
                      className='rounded border-[#343735]'
                      defaultValue={useradata.usia}
                      onChange={(e) => {
                        setDataform({
                          ...dataform,
                          usia: parseInt(e.target.value),
                        });
                      }}
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='nama' className='font-poppins'>
                      Alamat
                    </label>
                    <input
                      required={true}
                      type='text'
                      className='rounded border-[#343735]'
                      defaultValue={useradata.alamat}
                      onChange={(e) => {
                        setDataform({ ...dataform, alamat: e.target.value });
                      }}
                    />
                  </div>
                  <div className='font-poppins py-4 pl-1 rounded-lg text-xl shadow-xl flex justify-between items-center'>
                    <h1 className='font-bold'>Ubah Kontak</h1>
                  </div>
                  <div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='nama' className='font-poppins'>
                        Alamat Email
                      </label>
                      <input
                        required={true}
                        type='text'
                        className='rounded border-[#343735]'
                        defaultValue={useradata.email}
                        onChange={(e) => {
                          setDataform({ ...dataform, email: e.target.value });
                        }}
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor='nama' className='font-poppins'>
                        Nomor Kontak
                      </label>
                      <input
                        required={true}
                        type='text'
                        className='rounded border-[#343735]'
                        defaultValue={useradata.kontak}
                        onChange={(e) => {
                          setDataform({ ...dataform, kontak: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className={"flex gap-x-2"}>
                    <button
                      className='px-3 py-1 md:py-2 text-center text-white bg-[#3559E0] rounded-lg text-sm w-fit'
                      type={"submit"}
                    >
                      Simpan
                    </button>
                    <NavLink
                      to={"/dashboard/pengaturan"}
                      className='bg-[#949494] p-2 w-20 md:hidden rounded-xl mr-2 text-sm text-center'
                    >
                      Batal
                    </NavLink>
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
