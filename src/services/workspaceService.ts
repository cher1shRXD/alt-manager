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
    .leftJoinAndSelect("workspace.admin", "admin")
    .leftJoinAndSelect("workspace.tasks", "task")
    .leftJoinAndSelect("workspace.reports", "report")
    .leftJoinAndSelect("workspace.mentors", "mentors")
    .where("workspace.id = :workspaceId", { workspaceId })
    .getOne();

  if(!workspace) {
    throw new Error(notfound);
  }

  console.log(workspace);

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

  const newWorkspace = workspaceRepo.create({ admin: user, name: data.title, users: [user], mentors: [user] });
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


export const joinWorkspace = async (workspaceId: string) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email) {
    throw new Error(unauthorized);
  }

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const workspaceRepo = db.getRepository(Workspace);

  const user = await userRepo.findOne({
    where: { email: session.user.email },
    relations: ["workspaces"],
  });

  if (!user) {
    throw new Error(notfound);
  }

  const workspace = await workspaceRepo.findOne({
    where: { id: workspaceId },
    relations: ["users", "admin"],
  });

  if (!workspace) {
    throw new Error(notfound);
  }

  const alreadyJoined = workspace.users?.some((u) => u.id === user.id);

  if (alreadyJoined) {
    return workspace; 
  }

  workspace.users?.push(user);
  await workspaceRepo.save(workspace);

  return workspace;
};

export const removeMemberFromWorkspace = async (
  workspaceId: string,
  userId: string
) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const workspaceRepo = db.getRepository(Workspace);

  const admin = await userRepo.findOneBy({ email: session.user.email });
  if (!admin) throw new Error(notfound);

  const workspace = await workspaceRepo.findOne({
    where: { id: workspaceId },
    relations: ["users", "admin"],
  });
  if (!workspace) throw new Error(notfound);

  if (workspace.admin && workspace.admin.id !== admin.id) throw new Error(forbidden);
  if (admin.id === userId) throw new Error(forbidden);

  const member = workspace.users?.find((u) => u.id === userId);
  if (!member) throw new Error(notfound);

  workspace.users = workspace.users?.filter((u) => u.id !== userId);
  await workspaceRepo.save(workspace);

  return workspace;
};

export const transferWorkspaceAdmin = async (
  workspaceId: string,
  userId: string
) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const workspaceRepo = db.getRepository(Workspace);

  const currentAdmin = await userRepo.findOneBy({ email: session.user.email });
  if (!currentAdmin) throw new Error(notfound);

  const workspace = await workspaceRepo
    .createQueryBuilder("workspace")
    .leftJoinAndSelect("workspace.users", "users")
    .leftJoinAndSelect("workspace.admin", "admin")
    .leftJoinAndSelect("workspace.tasks", "task")
    .leftJoinAndSelect("workspace.reports", "report")
    .leftJoinAndSelect("workspace.mentors", "mentors")
    .where("workspace.id = :workspaceId", { workspaceId })
    .getOne();
  if (!workspace) throw new Error(notfound);

  if (workspace.admin && workspace.admin.id !== currentAdmin.id) throw new Error(forbidden);

  const newAdmin = workspace.users?.find((u) => u.id === userId);
  if (!newAdmin) throw new Error(notfound);

  workspace.admin = newAdmin;
  workspace.mentors = [...(workspace.mentors || []), newAdmin];
  await workspaceRepo.save(workspace);

  return workspace;
};

export const setAsMentor = async (
  workspaceId: string,
  userId: string
) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const workspaceRepo = db.getRepository(Workspace);

  const admin = await userRepo.findOneBy({ email: session.user.email });
  if (!admin) throw new Error(notfound);

  const workspace = await workspaceRepo
    .createQueryBuilder("workspace")
    .leftJoinAndSelect("workspace.users", "user")
    .leftJoinAndSelect("workspace.mentors", "mentor")
    .leftJoinAndSelect("workspace.admin", "admin")
    .where("workspace.id = :workspaceId", { workspaceId })
    .getOne();

  if (!workspace) throw new Error(notfound);

  if (workspace.admin?.id !== admin.id) throw new Error(forbidden);

  const targetUser = workspace.users?.find((u) => u.id === userId);
  if (!targetUser) throw new Error(notfound);

  const alreadyMentor = workspace.mentors?.some((m) => m.id === userId);
  if (alreadyMentor) return workspace;

  workspace.mentors = [...(workspace.mentors || []), targetUser];
  await workspaceRepo.save(workspace);

  return workspace;
};

export const unsetMentor = async (
  workspaceId: string,
  userId: string
) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const workspaceRepo = db.getRepository(Workspace);

  const admin = await userRepo.findOneBy({ email: session.user.email });
  if (!admin) throw new Error(notfound);

  const workspace = await workspaceRepo
    .createQueryBuilder("workspace")
    .leftJoinAndSelect("workspace.users", "user")
    .leftJoinAndSelect("workspace.mentors", "mentor")
    .leftJoinAndSelect("workspace.admin", "admin")
    .where("workspace.id = :workspaceId", { workspaceId })
    .getOne();

  if (!workspace) throw new Error(notfound);
  if (workspace.admin?.id !== admin.id) throw new Error(forbidden);

  const isMentor = workspace.mentors?.some((m) => m.id === userId);
  if (!isMentor) return workspace;

  workspace.mentors = (workspace.mentors || []).filter((m) => m.id !== userId);
  await workspaceRepo.save(workspace);

  return workspace;
};


