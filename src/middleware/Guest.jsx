import { useEffect } from "react";
import { getStatusAuth } from "../store";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import Loading from "../components/Loading";

const Guest = ({ children }) => {
  const navigate = useNavigate();
  const statusAuth = useRecoilValueLoadable(getStatusAuth);
  useEffect(() => {
    if (statusAuth.contents == true) {
      navigate("/");
    }
  }, [navigate, statusAuth]);

  return statusAuth.contents ? <Loading show={true} /> : children;
};

export default Guest;
