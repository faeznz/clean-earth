import { useEffect } from "react";
import { getStatusAuth, token, datausers } from "../store";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import Loading from "../components/Loading";

const Auth = ({ children }) => {
  const navigate = useNavigate();
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const [datauser, setDatauser] = useRecoilState(datausers);
  const statusAuth = useRecoilValueLoadable(getStatusAuth);
  useEffect(() => {
    if (statusAuth.contents == false) {
      setTokenJWT(undefined);
      setDatauser({});
      navigate("/masuk");
    }
  }, [navigate, statusAuth]);

  return statusAuth.contents ? children : <Loading show={true} />;
};

export default Auth;
