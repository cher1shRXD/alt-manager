import { toast } from "@/components/provider/ToastProvider"
import { EMAIL_REGEX } from "@/constants/regex"
import { SignupData } from "@/types/auth/SignupData"
import { useState } from "react"

export const useSignup = () => {
  const [signupData, setSignupData] = useState<SignupData>({ email: "", name: "", password: "", passwordCheck: "" })

  const submit = async () => {
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

    if(EMAIL_REGEX.test(signupData.email)) {
      toast.error("올바르지 않은 이메일 형식입니다.");
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(signupData)
    });

  }

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setSignupData(prev => ({...prev, [name]: value}));
  }

  return {
    handleData,
    signupData,
    submit
  }
}