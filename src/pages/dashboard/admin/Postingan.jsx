import { React, useState } from "react";
import Editor from "react-simple-wysiwyg";
import { useRecoilState } from "recoil";
import { datausers, token } from "../../../store";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";

const Postingan = () => {
  const [datauser, setDatauser] = useRecoilState(datausers);
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const navigate = useNavigate();
  const [dataform, setDataform] = useState({
    isi: "",
    judul: "",
  });

  const handleInsert = async (event) => {
    event.preventDefault();
    const isi = dataform.isi.replace(/'/g, "&apos;");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_SERVICE}/postingan/create`,
        {
          judul: dataform.judul,
          isi: isi,
        },
        {
          headers: {
            Authorization: tokenJWT,
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      withReactContent(Swal).fire({
        icon: "success",
        title: "Berhasil",
        text: "Berhasil Menambahkan Data Postingan",
      });
      navigate("/dashboard/postingan");
    } catch (error) {
      if (error.response.status == 400) {
        withReactContent(Swal).fire({
          icon: "error",
          title: "Validasi Error",
          text: error.response.data.message[0].message,
        });
      } else {
        withReactContent(Swal).fire({
          icon: "error",
          title: "Gagal",
          message: "Gagal Memambahkan Postingan Baru",
        });
        navigate("/dashboard/postingan");
      }
    }
  };

  return (
    <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden font-poppins'>
      <main>
        <div className='relative mx-4 sm:p-6 rounded-sm overflow-hidden'>
          <h1 className='font-poppins p-4 rounded-lg text-2xl md:text-3xl bg-[#718977] text-white shadow-xl font-bold capitalize'>
            Tambah Data Postingan
          </h1>
        </div>
        <div className='w-full flex justify-between p-4 sm:px-10'></div>
        <div className='px-8 py-6 w-fullmin-h h-fit overflow-auto'>
          <h2 className='text-xl font-bold border-b-2 px-2 py-4'>
            Informasi Data Postingan
          </h2>
          <form action='' onSubmit={handleInsert}>
            <div className='flex flex-col my-4 w-full'>
              <label className='py-2'>Judul</label>
              <input
                type='text'
                name='judul'
                className='w-2/3 rounded-xl'
                onChange={(e) =>
                  setDataform({ ...dataform, judul: e.target.value })
                }
                required={true}
              />
            </div>
            <div className='mt-8'>
              <Editor
                value={dataform.isi}
                onChange={(e) =>
                  setDataform({ ...dataform, isi: e.target.value })
                }
              />
            </div>
            <div className='my-12 flex justify-center gap-4 text-white'>
              <NavLink
                to={"/dashboard/postingan"}
                className='bg-[#949494] py-2 px-4 rounded hover:bg-[#727272]'
              >
                Batal
              </NavLink>
              <button
                type='submit'
                className='bg-[#154EF9] py-2 px-4 rounded hover:bg-[#161ae2]'
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Postingan;
