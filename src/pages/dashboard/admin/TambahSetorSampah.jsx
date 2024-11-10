import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { datausers, token } from "../../../store/index";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const TambahSetorSampah = () => {
  const [dataform, setDataform] = useState({});
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const [users, setUsers] = useState([]);
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  const handleForm = (c, d) => {
    setDataform({ ...dataform, [c]: d });
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    setDataform({
      ...dataform,
      waktu: dataform.waktuform,
    });
    const onFormatDate = new Date(time)
      .toLocaleDateString("en-GB")
      .split("/")
      .reverse()
      .join("/")
      .replace(/\//g, "-");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_SERVICE}/setorsampah/create`,
        {
          user_id: dataform.user_id,
          waktu: onFormatDate,
          jenis_sampah: dataform.jenis_sampah,
          jumlah: parseInt(dataform.jumlah),
          nominal: parseInt(dataform.nominal),
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
        text: "Berhasil menambahkan Data Setor Sampah",
      });
      navigate("/dashboard/setorsampah");
    } catch (error) {
      withReactContent(Swal).fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menambahkan Data Setor Sampah,Harap Coba Lagi Nanti!",
      });
      navigate("/dashboard/setorsampah");
    }
  };

  useEffect(() => {
    const getDataUsers = async () => {
      try {
        const res = await axios.post(
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
        setUsers(res.data.data);
      } catch (error) {
        navigate("/dashboard/setorsampah");
      }
    };

    getDataUsers();
  }, []);

  return (
    <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
      <main>
        <div className='relative mx-4 sm:p-6 rounded-sm overflow-hidden'>
          <h1 className='font-poppins p-4 rounded-lg text-2xl md:text-3xl bg-[#718977] text-white shadow-xl font-bold capitalize'>
            Tambah Data Setor Sampah
          </h1>
        </div>
        <form onSubmit={handleInsert} className='m-8'>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>
              Waktu:
            </label>
            <DatePicker
              selected={time}
              onChange={(date) => setTime(date)}
              className='mt-1 p-2 w-full border rounded-md'
              dateFormat='yyyy-MM-dd'
              required={true}
              placeholderText={"Masukkan Tanggal Setor Sampah"}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>
              Nama:
            </label>
            <Select
              options={users.map((items, i) => {
                return {
                  value: items.id,
                  label: items.nama,
                };
              })}
              placeholder={"Pilih Anggota"}
              required={true}
              className={"w-full border-1 border-slate-400"}
              onChange={(choice) => handleForm("user_id", choice.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>
              Jenis Sampah:
            </label>
            <input
              type='text'
              name='jenis_sampah'
              onChange={(e) => handleForm("jenis_sampah", e.target.value)}
              className='mt-1 p-2 w-full border rounded-md'
              required={true}
              placeholder={"Masukkan Jenis Sampah"}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>
              Jumlah:
            </label>
            <input
              type='text'
              name='jumlah'
              onChange={(e) => handleForm("jumlah", e.target.value)}
              className='mt-1 p-2 w-full border rounded-md'
              required={true}
              placeholder={"Masukkan Jumlah Sampah"}
              min={1}
              pattern={"[0-9]*"}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>
              Nominal:
            </label>
            <input
              type='text'
              name='nominal'
              onChange={(e) => handleForm("nominal", e.target.value)}
              className='mt-1 p-2 w-full border rounded-md'
              required={true}
              placeholder={"Masukkan Nominal Sampah"}
              min={1}
              pattern={"[0-9]*"}
            />
          </div>
          <button
            type='submit'
            className='bg-[#B0D9B1] py-2 px-4 rounded-lg hover:bg-[#B0D9B1] text-md mr-2'
          >
            Simpan
          </button>
          <NavLink
            to={"/dashboard/setorsampah"}
            className={
              "bg-[#B6BBC4] py-3 px-4 rounded-lg hover:bg-slate-400 text-md"
            }
          >
            Kembali
          </NavLink>
        </form>
      </main>
    </div>
  );
};

export default TambahSetorSampah;
