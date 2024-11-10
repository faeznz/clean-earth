import React, { useState, useEffect } from "react";
import SearchDashboard from "../../../components/SearchDashboard";
import Button from "../../../components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { datausers, token } from "../../../store/index";
import { useRecoilState } from "recoil";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SetorSampah = () => {
  const navigate = useNavigate();
  const [datauser, setDatauser] = useRecoilState(datausers);
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const [datasetorsampah, setDatasetorsampah] = useState([]);
  const [search, setSearch] = useState(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getDatasetorsampah = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_SERVICE}/setorsampah/`,
          {},
          {
            headers: {
              Authorization: tokenJWT,
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        setDatasetorsampah(res.data.data);
      } catch (error) {
        setTokenJWT(undefined);
        setDatauser({});
        navigate("/masuk");
      }
    };

    getDatasetorsampah();
  }, [navigate, trigger]);

  const handleDelete = async (id) => {
    withReactContent(Swal)
      .fire({
        title: "Ingin Menghapus Data Setor Sampah?",
        text: "Data Tidak Bisa Di Kembalikan Jika Sudah Terhapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus",
      })
      .then(async (r) => {
        if (r.isConfirmed) {
          try {
            await axios.delete(
              `${import.meta.env.VITE_API_SERVICE}/setorsampah/delete/${id}`,
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
              text: "Berhasil Menghapus Data Setor Sampah",
            });
            setTrigger(!trigger);
          } catch (error) {
            setTokenJWT(undefined);
            setDatauser({});
            navigate("/masuk");
          }
        }
      });
  };

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <main>
        <div className="relative mx-4 sm:p-6 rounded-sm overflow-hidden">
          <h1 className="font-poppins p-4 rounded-lg text-2xl md:text-3xl bg-[#718977] text-white shadow-xl font-bold capitalize">
            Data Setor Sampah
          </h1>
        </div>
        <div className="w-full flex justify-between p-4 sm:px-10">
          <SearchDashboard
            placeholder={"Cari Nama atau Jenis Sampah"}
            onSearch={setSearch}
          />
          <NavLink
            className="w-fit h-fit px-5 py-2 my-1 ml-2 rounded-md bg-[#B0D9B1] "
            to="/dashboard/tambahsetorsampah"
          >
            Tambah
          </NavLink>
        </div>
        <div className="px-8 py-6 w-fullmin-h h-fit overflow-auto">
          <h2 className="text-xl font-semibold border-b-2 px-2 py-4 bg-[#EFF3F0]">
            Rincian Data Setor Sampah
          </h2>
          <table className="min-w-full divide-y divide-gray-200 text-center">
            <thead className="bg-[#EFF3F0]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nomor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Waktu
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nama
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Jenis Sampah
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Jumlah
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nominal
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {datasetorsampah.length == 0 ? (
                <tr>
                  <td colSpan={7} className={"text-lg font-bold font-poppins"}>
                    Belum Ada Data Setor Sampah
                  </td>
                </tr>
              ) : (
                <></>
              )}
              {datasetorsampah.map((items, i) => {
                if (search != null && search != "") {
                  if (
                    items.jenis_sampah
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    items.users.nama
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    const isoDate = new Date(items.waktu);
                    var formattedDate = isoDate.toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    });
                    return (
                      <tr key={items.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formattedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.users.nama}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.jenis_sampah}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.jumlah}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.nominal}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {items.jumlah * items.nominal}
                        </td>
                        <td className="px-6 py-4 flex justify-center gap-2">
                          <NavLink
                            to={`/dashboard/editsetorsampah/${items.id}`}
                            className="bg-[#FFE382] px-5 py-2 rounded-md"
                          >
                            <FaEdit size={20} color={"#191919"} />
                          </NavLink>
                          <Button
                            className="bg-[#BF3131]"
                            onClick={() => handleDelete(items.id)}
                          >
                            <MdDelete size={20} color={"#191919"} />
                          </Button>
                        </td>
                      </tr>
                    );
                  }
                } else if (i + 1 < 10) {
                  const isoDate = new Date(items.waktu);
                  var formattedDate = isoDate.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });
                  return (
                    <tr key={items.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formattedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {items.users.nama}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {items.jenis_sampah}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {items.jumlah}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {items.nominal}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {items.jumlah * items.nominal}
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <NavLink
                          to={`/dashboard/editsetorsampah/${items.id}`}
                          className="bg-[#FFE382] px-5 py-2 rounded-md"
                        >
                          <FaEdit size={20} color={"#191919"} />
                        </NavLink>
                        <Button
                          className="bg-[#BF3131]"
                          onClick={() => handleDelete(items.id)}
                        >
                          <MdDelete size={20} color={"#191919"} />
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

export default SetorSampah;
