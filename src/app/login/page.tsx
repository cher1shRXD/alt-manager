"use client";

import { signIn } from "next-auth/react";

const Login = () => {
  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email: "tw080401@naver.com",
      password: "Tw080401!!**",
      redirect: false,
    });

    if (res?.ok) {
      console.log("로그인 성공");
    } else {
      console.log("로그인 실패");
    }
  };

  return (
    <div onClick={handleLogin}>Login</div>
  )
}

export default Login