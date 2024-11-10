import { useEffect } from "react";
import { datausers } from "../store";
import { useRecoilState } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";

const Admin = ({ children }) => {
  const [datauser, setDatauser] = useRecoilState(datausers);
  const navigate = useNavigate();
  useEffect(() => {
    if (datauser.role == "user") {
      navigate("/profile");
    }
  }, [navigate]);
  return children;
};

export default Admin;
