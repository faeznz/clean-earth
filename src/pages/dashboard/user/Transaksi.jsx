import React, { useState, useEffect } from "react";
import { datausers, token } from "../../../store";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";

const Transaksi = () => {
  const [datauser, setDatauser] = useRecoilState(datausers);
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const [datasetorsampah, setDatasetorsampah] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getDataSetorSampah = async () => {
      setLoading(true);
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_API_SERVICE}/setorsampah`,
          {},
          {
            headers: {
              Authorization: tokenJWT,
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        setDatasetorsampah(result.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setDatauser({});
        setTokenJWT(undefined);
        navigate("/masuk");
      }
    };
    getDataSetorSampah();
  }, [navigate]);

  return (
    <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
      <Loading show={loading} />
      <main>
        <div className='relative mx-4 sm:p-6 rounded-sm'>
          <h1 className='font-poppins p-4 rounded-lg text-2xl md:text-3xl shadow-xl font-bold capitalize'>
            Transaksi
          </h1>
        </div>
        <div className='px-8 py-6 w-fullmin-h h-fit overflow-x-auto'>
          <h2 className='text-xl font-semibold border-b-2 px-2 py-4 bg-[#EFF3F0]'>
            Riwayat Transaksi Setor Sampah
          </h2>
          <table className='min-w-full divide-y divide-gray-200 text-center'>
            <thead className='bg-[#EFF3F0]'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  ID Transaksi
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Waktu
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Jenis Sampah
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Jumlah
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Nominal
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {datasetorsampah.map((item, i) => {
                if (item.user_id == datauser.id) {
                  const isoDate = new Date(item.waktu);
                  var formattedDate = isoDate.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });

                  formattedDate = formattedDate.replace(/\//g, "-");
                  return (
                    <tr key={item.id}>
                      <td className='px-6 py-4 whitespace-nowrap'>{item.id}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {formattedDate}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {item.jenis_sampah}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {item.jumlah}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        Rp. {item.nominal}
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

export default Transaksi;
