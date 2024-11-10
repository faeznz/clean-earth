import { useEffect } from "react";
import axios from "axios";
import { token, datausers } from "../../../store";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Button from "../../../components/Button";
import SearchDashboard from "../../../components/SearchDashboard";

const GetPostingan = () => {
  const [datauser, setDatauser] = useRecoilState(datausers);
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const [postingan, setPostingan] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPostingan = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_SERVICE}/postingan/`,
          {},
          {
            headers: {
              Authorization: tokenJWT,
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        setPostingan(res.data.data || []);
      } catch (error) {
        setTokenJWT(undefined);
        setDatauser({});
        navigate("/masuk");
      }
    };

    getPostingan();
  }, [navigate, trigger]);

  const deletePostingan = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_SERVICE}/postingan/delete/${id}`,
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
        text: "Berhasil Menghapus Data Postingan",
      });
      setTrigger(!trigger);
    } catch (error) {
      // withReactContent(Swal).fire({
      //   icon: "error",
      //   title: "Gagal",
      //   text: "Gagal Mengapus Postingan",
      // });
    }
  };

  return (
    <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
      <main>
        <div className='relative mx-4 sm:p-6 rounded-sm overflow-hidden'>
          <h1 className='font-poppins p-4 rounded-lg text-2xl md:text-3xl bg-[#718977] text-white shadow-xl font-bold capitalize'>
            Data Postingan
          </h1>
        </div>
        <div className='w-full flex justify-between p-4 sm:px-10'>
          <SearchDashboard placeholder={"Cari Nama atau Jenis Sampah"} />
          <NavLink
            className='w-fit h-fit px-5 py-2 my-1 ml-2 rounded-md bg-[#B0D9B1] '
            to='/dashboard/tambahpostingan'
          >
            Tambah
          </NavLink>
        </div>
        <div className='w-full flex justify-between p-4 sm:px-10'></div>
        <div className='px-8 w-fullmin-h h-fit overflow-auto'>
          <h2 className='text-xl font-semibold border-b-2 px-2 py-4 bg-[#EFF3F0]'>
            Daftar Postingan
          </h2>
          <table className='min-w-full divide-y divide-gray-200 text-center'>
            <thead className='bg-[#EFF3F0]'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Nomor
                </th>
                <th
                  scope='col'
                  className='px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Judul
                </th>
                <th
                  scope='col'
                  className='px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Link Artikel
                </th>
                <th
                  scope='col'
                  className='px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Penulis
                </th>
                <th
                  scope='col'
                  className='px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {postingan.length == 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className={
                      "text-md font-semibold font-poppins py-3 text-xl leading-relaxed"
                    }
                  >
                    Belum Ada Artikel
                  </td>
                </tr>
              ) : (
                <></>
              )}
              {postingan.map((items, i) => {
                return (
                  <tr key={items.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>{i + 1}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {items.judul}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap flex justify-center'>
                      <NavLink
                        to={`/baca/${items.id}`}
                        className={
                          "flex px-3 py-2 rounded-md justify-center bg-yellow-300"
                        }
                      >
                        <FaRegEye size={18} />
                      </NavLink>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap '>
                      {items.users.nama}
                    </td>
                    <td className='px-6 py-4 flex gap-x-2 justify-center'>
                      <NavLink
                        className='bg-[#FFE382] px-5 py-2 rounded-md'
                        to={`/dashboard/editpostingan/${items.id}`}
                      >
                        <FaEdit color={"#191919"} size={18} />
                      </NavLink>
                      <Button
                        className='bg-[#BF3131]'
                        onClick={() => deletePostingan(items.id)}
                      >
                        <FaTrash color={"#FBF6EE"} size={18} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default GetPostingan;
