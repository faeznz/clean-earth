import { useEffect } from "react";
import { datausers } from "../store";
import { useRecoilState } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";

const User = ({ children }) => {
  const [datauser, setDatauser] = useRecoilState(datausers);
  const navigate = useNavigate();
  useEffect(() => {
    if (datauser.role == "admin") {
      navigate("/dashboard");
    }
  }, [navigate]);
  return children;
};

export default User;
