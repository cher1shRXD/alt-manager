"use client";

import CustomLink from "@/components/common/CustomLink";
import { useLogin } from "@/hooks/auth/useLogin";
import Image from "next/image";

const Login = () => {
  const { handleEmail, handlePw, email, password, submit, loading } = useLogin();

  return (
    <div className="w-full h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-210 h-120 bg-container rounded-xl border border-border flex items-center justify-between p-2 gap-2">
        <Image
          src="/AuthBanner.png"
          alt="auth-banner"
          width={2400}
          height={2400}
          priority
          className="h-full w-116 rounded-lg"
        />
        <form
          className="flex-1 h-full flex flex-col gap-4 items-center p-4"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}>
          <p className="text-primary font-anton text-4xl mb-4">LOGIN</p>
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm">이메일</p>
            <input
              type="text"
              className="w-full p-2 text-sm rounded-lg bg-container border border-border outline-none"
              placeholder="example@exm.com"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm">비밀번호</p>
            <input
              type="password"
              className="w-full p-2 text-sm rounded-lg bg-container border border-border outline-none"
              placeholder="*********"
              value={password}
              onChange={handlePw}
            />
          </div>
          <div className="flex-1" />
          <button
            type="submit"
            className="w-full py-2 text-sm bg-primary rounded-lg disabled:bg-gray-300"
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
          <div className="w-full text-xs text-end">
            회원이 아니라면?{" "}
            <CustomLink href="/signup" className="text-primary">
              회원가입
            </CustomLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
