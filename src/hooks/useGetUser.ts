import { User } from "@/entities/User";
import { customFetch } from "@/utilities/customFetch";
import { useEffect, useState } from "react"

export const useGetUser = (userId: string | null) => {
  const [username, setUsername] = useState("");

  const get = async () => {
    if(!userId) return;
    const { user } = await customFetch.get<{ user: User }>(`/api/users/${userId}`);
    if(user) {
      setUsername(user.name || "");
    }
  }

  useEffect(() => {
    get();
  }, [userId]);

  return username;
}