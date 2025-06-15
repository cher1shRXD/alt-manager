import { authOptions } from "@/libs/next-auth/auth";
import { SessionWithToken } from "@/types/session/SessionWithToken";
import { getServerSession } from "next-auth";

export async function requestWithSession<T>(
  callback: (accessToken: string, ...args: string[]) => Promise<T>,
  ...args: string[]
): Promise<{ hasSession: boolean; data: T | null }> {
  const session = await getServerSession(authOptions);
  const accessToken = (session as SessionWithToken)?.accessToken;

  if (!accessToken) {
    return {
      hasSession: false,
      data: null,
    };
  }

  const data = await callback(accessToken, ...args);

  return {
    hasSession: true,
    data,
  };
}
