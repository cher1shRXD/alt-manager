import { forbidden, notfound, unauthorized } from "@/constants/errorEnum";
import { User } from "@/entities/User";
import { Workspace } from "@/entities/Workspace";
import { authOptions } from "@/libs/next-auth/auth"
import { initializeDataSource } from "@/libs/typeorm/initialize";
import { getServerSession } from "next-auth"
import { TaskDTO } from "@/types/dto/TaskDTO";

export const getTasks = async (workspaceId: string) => {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user.email) {
    throw new Error(unauthorized);
  }

  const db = await initializeDataSource();
  const user = await db.getRepository(User).findOneBy({ email: session.user.email });
  const workspace = await db.getRepository(Workspace).findOne({
    where: { id: workspaceId },
    relations: ["users", "tasks"],
  });

  if (!user) {
    throw new Error(notfound);
  }

  if (!workspace) {
    throw new Error(notfound);
  }

  const isMember = workspace.users?.some(u => u.id === user.id);

  if (!isMember) {
    throw new Error(forbidden);
  }

  return workspace.tasks || [];
}

export const getMyTasks = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user.email) {
    throw new Error(unauthorized);
  }

  const db = await initializeDataSource();
  const user = await db.getRepository(User).findOne({
    where: { email: session.user.email },
    relations: ["menteeTask", "menteeTask.workspace", "menteeTask.mentor"]
  });

  if (!user) {
    throw new Error(notfound);
  }

  return user.menteeTask || [];
}

export const createTask = async (
  workspaceId: string,
  content: TaskDTO
) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const workspaceRepo = db.getRepository(Workspace);
  const taskRepo = db.getRepository("Task");

  const mentor = await userRepo.findOneBy({ email: session.user.email });
  if (!mentor) throw new Error(notfound);

  const workspace = await workspaceRepo.findOne({
    where: { id: workspaceId },
    relations: ["mentors", "users"]
  });
  if (!workspace) throw new Error(notfound);

  const isMentor = workspace.mentors?.some(u => u.id === mentor.id);
  if (!isMentor) throw new Error(forbidden);

  const task = taskRepo.create({
    title: content.title,
    description: content.description,
    mentor,
    workspace,
    mentees: content.mentees,
    isDone: false,
    startDate: content.startDate,
    endDate: content.endDate
  });

  await taskRepo.save(task);
  return task;
}