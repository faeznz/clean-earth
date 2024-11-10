import React, { useState } from "react";
import Chart from "../../../components/dashboard/admin/BarChart";
import CardDashboard from "../../../components/dashboard/admin/CardDashboard";
import WelcomeBanner from "../../../components/dashboard/admin/WelcomeBanner";
import Admin from "../../../middleware/Admin";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { datausers, token } from "../../../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../../components/Loading";

const Dashboard = () => {
  const [datauser, setDatauser] = useRecoilState(datausers);
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const [datachart, setDatachart] = useState([]);
  const [users, setUsers] = useState([]);
  const [jumlahuser, setJumlahuser] = useState(0);
  const [jumlahadmin, setJumlahadmin] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getIntialData = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_SERVICE}/setorsampah/stats`,
          {},
          {
            headers: {
              Authorization: tokenJWT,
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        );
        setDatachart(res.data.data);
        console.log(res.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setTokenJWT(undefined);
        setDatauser({});
        navigate("/masuk");
      }
    };

    const getUsers = async () => {
      setLoading(true);
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
        setUsers(result.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setTokenJWT(undefined);
        setDatauser({});
        navigate("/masuk");
      }
    };

    getUsers();
    getIntialData();
  }, [navigate]);

  return loading ? (
    <Loading show={true} />
  ) : (
    <Admin>
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        <main>
          <div className='relative mx-4 sm:p-6 rounded-sm overflow-hidden'>
            <h1 className='font-poppins p-4 rounded-lg text-2xl md:text-3xl bg-[#718977] text-white shadow-xl font-bold capitalize'>
              Dashboard
            </h1>
          </div>
          <div className='px-5 w-full max-w-9xl mx-auto'>
            {/* Welcome banner */}
            <WelcomeBanner />
          </div>
          <div>
            <CardDashboard jumlahadmin={users.filter((items) => items.role == "admin").length} jumlahuser={users.filter((items) => items.role == "user").length} />
          </div>
          <div className='shadow-2xl border-2 shadow-black-600 p-4 rounded-3xl mx-10 mb-5'>
            <Chart dataChart={datachart} />
          </div>
        </main>
      </div>
    </Admin>
  );
};

export default Dashboard;
