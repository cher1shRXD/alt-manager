import { authOptions } from "@/libs/next-auth/auth";
import { getServerSession } from "next-auth";

export const getMe = async () => {
  const session = await getServerSession(authOptions);
  
  if(session) {
    return session.user;
  }

  return null;
}