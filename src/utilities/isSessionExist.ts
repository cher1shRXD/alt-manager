import { authOptions } from "@/libs/next-auth/auth"
import { SessionWithToken } from "@/types/session/SessionWithToken";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export const isSessionExist = async () => {
  const session = await getServerSession(authOptions);

  if(session && (session as SessionWithToken).user.id) {
    return true;
  }else{
    redirect("/login");
  }

  return false;
}