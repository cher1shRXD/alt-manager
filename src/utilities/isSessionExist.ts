import { authOptions } from "@/libs/next-auth/auth"
import { SessionWithToken } from "@/types/session/SessionWithToken";
import { getServerSession } from "next-auth"

export const isSessionExist = async () => {
  const session = await getServerSession(authOptions);

  if((session as SessionWithToken).user.id) {
    return true;
  }

  return false;
}