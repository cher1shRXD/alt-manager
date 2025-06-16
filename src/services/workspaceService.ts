import { forbidden, notfound, unauthorized } from "@/constants/errorEnum";
import { User } from "@/entities/User";
import { Workspace } from "@/entities/Workspace";
import { authOptions } from "@/libs/next-auth/auth";
import { initializeDataSource } from "@/libs/typeorm/initialize";
import { WorkspaceDTO } from "@/types/dto/WorkspaceDTO";
import { getServerSession } from "next-auth"

export const getWorkspace = async (workspaceId: string) => {
  const session = await getServerSession(authOptions);

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
    .leftJoinAndSelect("workspace.users", "users")
    .where("workspace.id = :workspaceId", { workspaceId })
    .andWhere("users.id = :userId", { userId: user.id })
    .leftJoinAndSelect("workspace.admin", "admin")
    .getOne();


  if(!workspace) {
    throw new Error(notfound);
  }

  return workspace;
}

export const getMyWorkspaces = async () => {
  const session = await getServerSession(authOptions);

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


export const createWorkspace = async (data: WorkspaceDTO) => {
  const session = await getServerSession(authOptions);

  if(!session || !session.user.email) {
    throw new Error(unauthorized);
  }

  const db = await initializeDataSource();
  const workspaceRepo = db.getRepository(Workspace);
  const user = await db.getRepository(User).findOneBy({ email: session.user.email });;

  if(!user) {
    throw new Error(notfound);
  }

  const newWorkspace = workspaceRepo.create({ admin: user, name: data.title, users: [user] });
  await workspaceRepo.save(newWorkspace);

  return newWorkspace;
}

export const updateWorkspace = async (data: WorkspaceDTO, workspaceId: string) => {
  const session = await getServerSession(authOptions);

  if(!session || !session.user.email) {
    throw new Error(unauthorized);
  }

  const db = await initializeDataSource();
  const user = await db.getRepository(User).findOneBy({ email: session.user.email });;

  if(!user) {
    throw new Error(notfound);
  }

  const workspace =  await db
    .getRepository(Workspace)
    .createQueryBuilder("workspace")
    .leftJoin("workspace.users", "user")
    .where("user.id = :userId", { userId: user.id })
    .andWhere("workspace.id = :workspaceId", { workspaceId })
    .leftJoinAndSelect("workspace.admin", "admin")
    .getOne();

  if(user.id !== workspace?.admin?.id) {
    throw new Error(forbidden);
  }

  if (!workspace) {
    throw new Error(notfound);
  }

  workspace.name = data.title;

  await db.getRepository(Workspace).save(workspace);

  return workspace;
}

export const deleteWorkspace = async (workspaceId: string) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email) {
    throw new Error(unauthorized);
  }

  const db = await initializeDataSource();
  const user = await db.getRepository(User).findOneBy({ email: session.user.email });

  if (!user) {
    throw new Error(notfound);
  }

  const workspace = await db
    .getRepository(Workspace)
    .createQueryBuilder("workspace")
    .leftJoin("workspace.users", "u")
    .leftJoinAndSelect("workspace.admin", "admin")
    .where("u.id = :userId", { userId: user.id })
    .andWhere("workspace.id = :workspaceId", { workspaceId })
    .getOne();

  if (!workspace) {
    throw new Error(notfound);
  }

  if (user.id !== workspace.admin?.id) {
    throw new Error(forbidden);
  }

  await db.getRepository(Workspace).delete({ id: workspace.id });

  return workspace;
};
