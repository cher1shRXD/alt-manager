import { forbidden, notfound, unauthorized } from "@/constants/errorEnum";
import { User } from "@/entities/User";
import { Workspace } from "@/entities/Workspace";
import { authOptions } from "@/libs/next-auth/auth"
import { initializeDataSource } from "@/libs/typeorm/initialize";
import { getServerSession } from "next-auth"
import { TaskDTO } from "@/types/dto/TaskDTO";
import { Task } from "@/entities/Task";
import { TaskSubmission } from "@/entities/TaskSubmission";

export const getTasks = async (workspaceId: string) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();

  const user = await db
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.email = :email", { email: session.user.email })
    .getOne();
  if (!user) throw new Error(notfound);

  const workspace = await db
    .getRepository(Workspace)
    .createQueryBuilder("workspace")
    .leftJoinAndSelect("workspace.users", "user")
    .where("workspace.id = :workspaceId", { workspaceId })
    .getOne();

  if (!workspace) throw new Error(notfound);

  const isMember = workspace.users?.some(u => u.id === user.id);
  if (!isMember) throw new Error(forbidden);

  const tasks = await db
    .getRepository(Task)
    .createQueryBuilder("task")
    .leftJoinAndSelect("task.workspace", "workspace")
    .leftJoinAndSelect("task.mentor", "mentor")
    .leftJoinAndSelect("task.mentees", "mentees")
    .where("workspace.id = :workspaceId", { workspaceId })
    .getMany();

  return tasks;
};



export const getMyTasks = async (workspaceId: string) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) {
    throw new Error(unauthorized);
  }
    
  const db = await initializeDataSource();
  const userRepo = db.getRepository(User)
  const user = await userRepo.findOneBy({ email: session.user.email });


  if(!user) {
    throw new Error(notfound);
  }

  const userWithTasks = await userRepo
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.menteeTask", "task")
    .leftJoinAndSelect("task.workspace", "workspace")
    .leftJoinAndSelect("task.mentor", "mentor")
    .where("user.id = :userId", { userId: user.id })
    .andWhere("task.workspace = :workspaceId", { workspaceId })
    .getOne();

  return userWithTasks?.menteeTask || [];
};

export const getTaskDetailMentors = async (workspaceId: string, taskId: number) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const user = await userRepo.findOneBy({ email: session.user.email });
  if (!user) throw new Error(notfound);

  const workspace = await db
    .getRepository(Workspace)
    .createQueryBuilder("workspace")
    .leftJoinAndSelect("workspace.users", "user")
    .leftJoinAndSelect("workspace.admin", "admin")
    .leftJoinAndSelect("workspace.mentors", "mentors")
    .where("workspace.id = :workspaceId", { workspaceId })
    .getOne();
  if (!workspace) throw new Error(notfound);

  const isMember = workspace.users?.some(u => u.id === user.id);
  if (!isMember) throw new Error(forbidden);

  const task = await db
    .getRepository(Task)
    .createQueryBuilder("task")
    .leftJoinAndSelect("task.workspace", "workspace")
    .leftJoinAndSelect("task.mentor", "mentor")
    .leftJoinAndSelect("task.mentees", "mentees")
    .leftJoinAndSelect("task.submissions", "submissions")
    .leftJoinAndSelect("submissions.user", "submissionUser")
    .leftJoinAndSelect("submissions.files", "submissionFiles")
    .where("task.id = :taskId", { taskId })
    .andWhere("workspace.id = :workspaceId", { workspaceId })
    .getOne();

  const isMentor = workspace.mentors?.some(u => u.id === user.id);
  const isAdmin = workspace.admin?.id === user.id;
  if(!isMentor && !isAdmin) throw new Error(forbidden);

  if (!task) throw new Error(notfound);

  return task;
};

export const getTaskDetailMentees = async (workspaceId: string, taskId: number) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const user = await userRepo.findOneBy({ email: session.user.email });
  if (!user) throw new Error(notfound);

  const workspace = await db
    .getRepository(Workspace)
    .createQueryBuilder("workspace")
    .leftJoinAndSelect("workspace.users", "user")
    .leftJoinAndSelect("workspace.admin", "admin")
    .leftJoinAndSelect("workspace.mentors", "mentors")
    .where("workspace.id = :workspaceId", { workspaceId })
    .getOne();
  if (!workspace) throw new Error(notfound);

  const isMember = workspace.users?.some(u => u.id === user.id);
  if (!isMember) throw new Error(forbidden);

  const task = await db
    .getRepository(Task)
    .createQueryBuilder("task")
    .leftJoinAndSelect("task.workspace", "workspace")
    .leftJoinAndSelect("task.mentor", "mentor")
    .leftJoinAndSelect("task.mentees", "mentees")
    .leftJoinAndSelect("task.submissions", "submissions", "submissions.user = :userId", { userId: user.id })
    .leftJoinAndSelect("submissions.user", "submissionUser")
    .leftJoinAndSelect("submissions.files", "submissionFiles")
    .where("task.id = :taskId", { taskId })
    .andWhere("workspace.id = :workspaceId", { workspaceId })
    .getOne();

  const isMentee = task?.mentees?.some(u => u.id === user.id);
  const isMentor = workspace.mentors?.some(u => u.id === user.id);
  const isAdmin = workspace.admin?.id === user.id;
  if(!isMentee && !isMentor && !isAdmin) throw new Error(forbidden);

  if (!task) throw new Error(notfound);

  return task;
};


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

  if(!content.startDate || !content.endDate) {
    throw new Error(forbidden);
  }

  const task = taskRepo.create({
    title: content.title,
    description: content.description,
    mentor,
    workspace,
    mentees: content.mentees,
    isDone: false,
    startDate: new Date(content.startDate),
    endDate: new Date(content.endDate)
  });

  await taskRepo.save(task);
  return task;
}

export const getTaskSubmissionDetails = async (workspaceId: string, taskId: number) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const workspaceRepo = db.getRepository(Workspace);
  const taskRepo = db.getRepository(Task);
  const submissionRepo = db.getRepository(TaskSubmission);

  const user = await userRepo.findOneBy({ email: session.user.email });
  const workspace = await workspaceRepo.findOne({
    where: { id: workspaceId },
    relations: ["admin"]
  });
  if(user?.id !== workspace?.admin?.id) throw new Error(forbidden);
  if (!workspace) throw new Error(notfound);

  const submissions = await submissionRepo.createQueryBuilder("submission")
    .leftJoinAndSelect("submission.user", "user")
    .leftJoinAndSelect("submission.files", "file")
    .where("submission.task = :taskId", { taskId })
    .andWhere("submission.isSubmitted = true")
    .getMany();

  return submissions.map(sub => ({
    user: sub.user,
    files: sub.files?.map(f => ({ url: f.url, originalName: f.originalName, uploadedAt: f.uploadedAt })) || []
  }));
};