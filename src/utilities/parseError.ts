import { duplicated, forbidden, notfound, serverError, unauthorized } from "@/constants/errorEnum"

export const parseError = (error: string) => {
  switch(error) {
    case unauthorized: return "인증되지 않은 사용자입니다.";
    case forbidden: return "접근 권한이 없습니다.";
    case duplicated: return "중복된 값입니다.";
    case notfound: return "결과를 찾을 수 없습니다.";
    case serverError: return "서버에 에러가 발생했습니다.";
    default: return "알 수 없는 에러";
  }
}