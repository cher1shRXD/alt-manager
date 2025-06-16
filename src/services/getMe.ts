import { User } from "@/entities/User";
import { authOptions } from "@/libs/next-auth/auth";
import { initializeDataSource } from "@/libs/typeorm/initialize";
import { getServerSession } from "next-auth";

export const getMe = async () => {
  const session = await getServerSession(authOptions);
  
  if(session && session.user.id) {
    const db = await initializeDataSource();
    const userRepo = db.getRepository(User);
    const user = await userRepo.findOneBy({ id: session.user.id });
    if(user) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      }
    }
    return null;
  }

  return null;
}