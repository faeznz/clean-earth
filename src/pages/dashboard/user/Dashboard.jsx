import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdAttachMoney } from "react-icons/md";
import Chart from "../../../components/dashboard/user/BarChart";
import { datausers, token } from "../../../store";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../../../components/Loading";

const Dashboard = () => {
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const [datauser, setDatauser] = useRecoilState(datausers);
  const [totalnominal, setTotalnominal] = useState();
  const [datachart, setDatachart] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getSetorSampah = async () => {
      setLoading(true);
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_API_SERVICE}/setorsampah/stats/${
            datauser.id
          }`,
          {},
          {
            headers: {
              Authorization: tokenJWT,
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        setDatachart(result.data.data);
        setTotalnominal(result.data.jumlah_nominal);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setDatauser({});
        setTokenJWT(undefined);
        navigate("/masuk");
      }
    };
    getSetorSampah();
  }, [navigate]);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
      <Loading show={loading} />
      <main>
        <div className='relative mx-4 sm:p-6 rounded-sm overflow-hidden'>
          <h1 className='font-poppins p-4 rounded-lg text-2xl md:text-3xl shadow-xl font-bold capitalize'>
            Dashboard
          </h1>
        </div>
        <div>
          <NavLink>
            <div className='flex justify-between bg-[#F6F6F6] md:w-96 sm:w-52 p-5 rounded-lg shadow-xl mx-10 mb-8'>
              <div className='flex flex-col justify-center font-poppins'>
                <p>Total Transaksi Setor Sampah</p>
                <h2 className='text-2xl font-bold mt-2'>
                  Rp. {numberWithCommas(parseInt(totalnominal))}
                </h2>
              </div>
              <div className=''>
                <MdAttachMoney className='w-12 h-12' color='#79AC78' />
              </div>
            </div>
          </NavLink>
        </div>
        <div className='shadow-2xl border-2 shadow-black-600 p-4 rounded-3xl mx-10 mb-5'>
          <Chart dataChart={datachart} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
