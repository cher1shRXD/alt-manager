"use client";

import CustomLink from "@/components/common/CustomLink";
import { useSignup } from "@/hooks/auth/useSignup";
import Image from "next/image";

const Signup = () => {
  const { handleData, signupData, submit } = useSignup();

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
          <p className="text-primary font-anton text-4xl mb-4">SIGN-UP</p>
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm">이메일</p>
            <input
              type="text"
              className="w-full p-2 text-sm rounded-lg bg-container border border-border outline-none"
              placeholder="example@exm.com"
              value={signupData.email}
              onChange={handleData}
              name="email"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm">이름</p>
            <input
              type="text"
              className="w-full p-2 text-sm rounded-lg bg-container border border-border outline-none"
              placeholder="홍길동"
              value={signupData.name}
              onChange={handleData}
              name="name"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm">비밀번호</p>
            <input
              type="password"
              className="w-full p-2 text-sm rounded-lg bg-container border border-border outline-none"
              placeholder="*********"
              value={signupData.password}
              onChange={handleData}
              name="password"
            />
            <input
              type="password"
              className="w-full p-2 text-sm rounded-lg bg-container border border-border outline-none"
              placeholder="비밀번호 확인"
              value={signupData.passwordCheck}
              onChange={handleData}
              name="passwordCheck"
            />
          </div>
          <div className="flex-1" />
          <button
            type="submit"
            className="w-full py-2 text-sm bg-primary rounded-lg">
            회원가입
          </button>
          <div className="w-full text-xs text-end">
            회원이라면?{" "}
            <CustomLink href="/login" className="text-primary">
              로그인
            </CustomLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup