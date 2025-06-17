import { notfound } from "@/constants/errorEnum";
import { User } from "@/entities/User";
import { initializeDataSource } from "@/libs/typeorm/initialize"

export const getUser = async (userId: string) => {
  const db = await initializeDataSource();
  const user = await db.getRepository(User).findOneBy({ id: userId });
  if(!user) {
    throw new Error(notfound);
  }

  return user;
}