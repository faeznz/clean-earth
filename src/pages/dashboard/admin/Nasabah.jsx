import React, { useState, useEffect } from "react";
import SearchDashboard from "../../../components/SearchDashboard";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { datausers, token } from "../../../store";
import { useRecoilState } from "recoil";
import axios from "axios";
import Button from "../../../components/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Nasabah = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState();
  const [datauser, setDatauser] = useRecoilState(datausers);
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const [dataUsers, setDataUsers] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const handleRemoveUser = async (id) => {
    withReactContent(Swal)
      .fire({
        title: "Ingin Hapus Data?",
        text: "Apakah Anda Yakin Akan Menghapus Data User",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus",
      })
      .then(async (res) => {
        if (res.isConfirmed) {
          try {
            await axios.delete(
              `${import.meta.env.VITE_API_SERVICE}/users/delete/${id}`,
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
              text: "Berhasil Menghapus Data User",
            });
            setTrigger(!trigger);
          } catch (error) {
            datauser({});
            token(undefined);
            navigate("/masuk");
          }
        }
      });
  };

  useEffect(() => {
    const getDataUsers = async () => {
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_API_SERVICE}/users/getusers`,
          {},
          {
            headers: {
              Authorization: tokenJWT,
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );

        setDataUsers(result.data.data);
      } catch (error) {
        setDatauser({});
        setTokenJWT(undefined);
        navigate("/masuk");
      }
    };
    getDataUsers();
  }, [navigate, trigger]);

  return (
    <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
      <main>
        <div className='relative mx-4 sm:p-6 rounded-sm overflow-hidden'>
          <h1 className='font-poppins p-4 rounded-lg text-2xl md:text-3xl bg-[#718977] text-white shadow-xl font-bold capitalize'>
            Anggota
          </h1>
        </div>
        <div className='w-full flex justify-between p-4 sm:px-10'>
          <SearchDashboard onSearch={setSearchResults} val={searchResults} />
        </div>
        <div className='px-8 py-6 w-fullmin-h h-fit overflow-auto'>
          <h2 className='text-xl font-semibold border-b-2 px-2 py-4 bg-[#EFF3F0]'>
            Daftar Anggota
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
                  Nama
                </th>
                <th
                  scope='col'
                  className='px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  No Telepon
                </th>
                <th
                  scope='col'
                  className='px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Alamat
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
              {dataUsers.length == 0 ? (
                <tr>
                  <td
                    colSpan={"5"}
                    className={
                      "text-center px-6 py-4 whitespace-nowrap font-semibold text-lg font-poppins"
                    }
                  >
                    Belum Ada Anggota
                  </td>
                </tr>
              ) : (
                <></>
              )}
              {dataUsers.map((item, i) => {
                if (searchResults != "" && searchResults != undefined) {
                  if (
                    item.nama
                      .toLowerCase()
                      .includes(searchResults.toLowerCase())
                  ) {
                    return (
                      <tr key={item.id}>
                        <td className='px-6 py-4 whitespace-nowrap'>{i + 1}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          {item.nama}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          {item.kontak}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          {item.alamat == null ? "-" : item.alamat}
                        </td>
                        <td className={"px-6 py-4 whitespace-nowrap"}>
                          <Button
                            className='bg-[#B31312]'
                            onClick={() => {
                              handleRemoveUser(item.id);
                            }}
                          >
                            <MdDelete size={20} color={"#F0F0F0"} />
                          </Button>
                        </td>
                      </tr>
                    );
                  }
                } else if (i + 1 <= 10) {
                  return (
                    <tr key={item.id}>
                      <td className='px-6 py-4 whitespace-nowrap'>{i + 1}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {item.nama}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {item.kontak}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {item.alamat == null ? "-" : item.alamat}
                      </td>
                      <td className={"px-6 py-4 whitespace-nowrap"}>
                        <Button
                          className='bg-[#B31312]'
                          onClick={() => {
                            handleRemoveUser(item.id);
                          }}
                        >
                          <MdDelete size={20} color={"#F0F0F0"} />
                        </Button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Nasabah;
