import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getStatusAuth, token } from "../store";
import { useEffect, useState } from "react";
import AuthInput from "../components/AuthInput";

const TestJWT = () => {
  const [tokenJWT, setTokenJWT] = useRecoilState(token);
  const statusAuth = useRecoilValueLoadable(getStatusAuth);
  console.log(statusAuth);
  return (
    <div
      className={
        "w-screen h-screen overflow-x-hidden flex justify-center items-center bg-slate-900"
      }
    >
      <div className={"w-3/4 max-w-md bg-slate-300 rounded-lg px-4 py-3"}>
        <h2 className={"font-poppins text-2xl font-medium"}>
          Token Recoil State
        </h2>
        <hr className='h-[3px] bg-slate-950 rounded-lg my-3' />
        <div className={"w-full h-fit text whitespace-nowrap text-black"}>
          <p>Status Login : {statusAuth.contents ? "True" : "False"}</p>
          <p>Token : {tokenJWT}</p>
          {/* <AuthInput
            name={"token"}
            onChange={(e) => setTokenJWT(e.target.value)}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default TestJWT;
