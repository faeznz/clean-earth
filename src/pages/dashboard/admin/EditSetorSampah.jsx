import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { token, datausers } from "../../../store";
import { useRecoilState } from "recoil";
import axios from "axios";
import Loading from "../../../components/Loading";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const EditSetorSampah = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [datauser, setDatauser] = useRecoilState(datausers);
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const [intialdata, setInitialdata] = useState({});
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [selectdefault, setSelectdefault] = useState({
    value: 1,
    label: "John Doe",
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getIntialData = async () => {
      setLoading(true);
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_API_SERVICE}/setorsampah/${id}`,
          {},
          {
            headers: {
              Authorization: tokenJWT,
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        setInitialdata(result.data.data);
        setDate(new Date(result.data.data.waktu));
        setSelectdefault({
          value: result.data.data.users.id,
          label: result.data.data.users.nama,
        });
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
        setLoading(false);
      } catch (error) {
        navigate("/dashboard/setorsampah");
      }
    };
    getIntialData();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const onFormatDate = new Date(date)
      .toLocaleDateString("en-GB")
      .split("/")
      .reverse()
      .join("/")
      .replace(/\//g, "-");
    try {
      await axios.put(
        `${import.meta.env.VITE_API_SERVICE}/setorsampah/update/${id}`,
        {
          user_id: intialdata.user_id,
          waktu: onFormatDate,
          jenis_sampah: intialdata.jenis_sampah,
          jumlah: parseInt(intialdata.jumlah),
          nominal: parseInt(intialdata.nominal),
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
        title: "Success",
        text: "Data Setor Sampah Berhasil Di Update",
      });
      navigate("/dashboard/setorsampah");
    } catch (error) {
      withReactContent(Swal).fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal Memperharui Data Setor Sampah",
      });
      navigate("/dashboard/setorsampah");
    }
  };

  return loading ? (
    <Loading show={true} />
  ) : (
    <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
      <main>
        <div className='relative mx-4 sm:p-6 rounded-sm overflow-hidden'>
          <h1 className='font-poppins p-4 rounded-lg text-2xl md:text-3xl bg-[#718977] text-white shadow-xl font-bold capitalize'>
            Edit Data Setor Sampah
          </h1>
        </div>
        <form className='m-8' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>
              Waktu:
            </label>
            <DatePicker
              selected={date}
              className='mt-1 p-2 w-full border rounded-md'
              onChange={(d) => setDate(d)}
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
              placeholder={"Pilih Anggota"}
              required={true}
              defaultValue={selectdefault}
              className={"w-full border-1 border-slate-400"}
              options={users.map((items) => {
                return {
                  value: items.id,
                  label: items.nama,
                };
              })}
              onChange={(e) =>
                setInitialdata({ ...intialdata, user_id: e.value })
              }
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>
              Jenis Sampah:
            </label>
            <input
              type='text'
              name='jenis_sampah'
              className='mt-1 p-2 w-full border rounded-md'
              required={true}
              placeholder={"Masukkan Jenis Sampah"}
              defaultValue={intialdata.jenis_sampah}
              onChange={(e) =>
                setInitialdata({ ...intialdata, jenis_sampah: e.target.value })
              }
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>
              Jumlah:
            </label>
            <input
              type='text'
              name='jumlah'
              className='mt-1 p-2 w-full border rounded-md'
              required={true}
              placeholder={"Masukkan Jumlah Sampah"}
              min={1}
              pattern={"[0-9]*"}
              defaultValue={intialdata.jumlah}
              onChange={(e) =>
                setInitialdata({ ...intialdata, jumlah: e.target.value })
              }
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-600'>
              Nominal:
            </label>
            <input
              type='text'
              name='nominal'
              className='mt-1 p-2 w-full border rounded-md'
              required={true}
              placeholder={"Masukkan Nominal Sampah"}
              min={1}
              pattern={"[0-9]*"}
              defaultValue={intialdata.nominal}
              onChange={(e) =>
                setInitialdata({ ...intialdata, nominal: e.target.value })
              }
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

export default EditSetorSampah;
