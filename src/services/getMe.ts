import { User } from "@/entities/User";
import { authOptions } from "@/libs/next-auth/auth";
import { initializeDataSource } from "@/libs/typeorm/initialize";
import { getServerSession } from "next-auth";

export const getMe = async () => {
  const session = await getServerSession(authOptions);
  
  if(session && session.user.email) {
    const db = await initializeDataSource();
    const userRepo = db.getRepository(User);
    const user = await userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.menteeTask", "menteeTask")
      .leftJoinAndSelect("user.reports", "reports")
      .where("user.email = :email", { email: session.user.email })
      .getOne();

    if(user) {
      return user;
    }
    return null;
  }

  return null;
}