import { notfound, unauthorized } from "@/constants/errorEnum";
import { User } from "@/entities/User";
import { Workspace } from "@/entities/Workspace";
import { initializeDataSource } from "@/libs/typeorm/initialize";
import { CreateWorkspaceDTO } from "@/types/dto/CreateWorkspaceDTO";
import { getServerSession } from "next-auth"

export const getWorkspace = async (workspaceId: string) => {
  const session = await getServerSession();

  if(!session || !session.user.email) {
    throw new Error(unauthorized);
  }

  const db = await initializeDataSource();
  const user = await db.getRepository(User).findOneBy({ email: session.user.email });

  if(!user) {
    throw new Error(notfound);
  }

  const workspace = await db
    .getRepository(Workspace)
    .createQueryBuilder("workspace")
    .leftJoin("workspace.users", "user")
    .where("workspace.id = :workspaceId", { workspaceId })
    .andWhere("user.id = :userId", { user: user.id })
    .getOne();

  if(!workspace) {
    throw new Error(notfound);
  }

  return workspace;
}

export const getMyWorkspaces = async () => {
  const session = await getServerSession();

  if (!session || !session.user.email) {
    throw new Error(unauthorized);
  }

  const db = await initializeDataSource();
  const user = await db.getRepository(User).findOneBy({ email: session.user.email });

  if(!user) {
    throw new Error(notfound);
  }

  const workspaces = await db
    .getRepository(Workspace)
    .createQueryBuilder("workspace")
    .leftJoin("workspace.users", "user")
    .where("user.id = :userId", { userId: user.id })
    .leftJoinAndSelect("workspace.admin", "admin")
    .leftJoinAndSelect("workspace.tasks", "task")
    .leftJoinAndSelect("workspace.reports", "report")
    .leftJoinAndSelect("workspace.users", "users")
    .getMany();

  return workspaces;
};


export const createWorkspace = async (data: CreateWorkspaceDTO) => {
  const session = await getServerSession();

  if(!session || !session.user.email) {
    throw new Error(unauthorized);
  }

  const db = await initializeDataSource();
  const workspaceRepo = db.getRepository(Workspace);
  const userRepo = db.getRepository(User);

  const user = await userRepo.findOneBy({ email: session.user.email });
  if(!user) {
    throw new Error(notfound);
  }

  const newWorkspace = workspaceRepo.create({ admin: user, name: data.title, users: [user] });
  await workspaceRepo.save(newWorkspace);

  return newWorkspace;
}

