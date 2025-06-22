import { useState } from "react"
import { signIn } from "next-auth/react";
import { toast } from "@/components/provider/ToastProvider";
import { useCustomRouter } from "../useCustomRouter";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useCustomRouter();

  const submit = async () => {
    if(loading) return;
    setLoading(true);
    if(email.trim().length <= 0 || password.trim().length <= 0) {
      toast.warning("모든 필드를 채워주세요.");
      setLoading(false);
      return;
    }
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("로그인 성공!");
      router.replace("/choose-workspace");
    } else if (res && res.status < 500 && res.status > 399) {
      toast.error("이메일, 비밀번호를 확인해주세요.");
      setLoading(false);
    } else {
      toast.error("로그인 실패");
      setLoading(false);
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return {
    email,
    password,
    handleEmail,
    handlePw,
    submit,
    loading
  }
}