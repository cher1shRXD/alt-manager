import { toast } from "@/components/provider/ToastProvider"
import { EMAIL_REGEX } from "@/constants/regex"
import { SignupData } from "@/types/auth/SignupData"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useCustomRouter } from "../useCustomRouter"

export const useSignup = () => {
  const [signupData, setSignupData] = useState<SignupData>({ email: "", name: "", password: "", passwordCheck: "" });
  const [loading, setLoading] = useState(false);
  const router = useCustomRouter();

  const submit = async () => {
    if(loading) return;
    setLoading(true);

    try {
      if(
        signupData.email.trim().length <= 0 || 
        signupData.name.trim().length <= 0 ||
        signupData.password.trim().length <= 0 ||
        signupData.passwordCheck.trim().length <= 0
      ) {
        toast.warning("모든 필드를 채워주세요.");
        return;
      }

      if(signupData.password !== signupData.passwordCheck) {
        toast.error("비밀번호가 일치하지 않습니다.");
        return;
      }

      if(!EMAIL_REGEX.test(signupData.email)) {
        toast.error("올바르지 않은 이메일 형식입니다.");
        return;
      }

      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(signupData)
      });

      if(res.ok) {
        const loginRes = await signIn("credentials", {
          email: signupData.email,
          password: signupData.password,
          redirect: false,
        });
    
        if (loginRes?.ok) {
          toast.success("회원가입 성공!");
          router.replace("/choose-workspace");
        }
      } else {
        toast.error("회원가입 실패");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setSignupData(prev => ({...prev, [name]: value}));
  }

  return {
    signupData,
    handleData,
    submit,
    loading
  }
}