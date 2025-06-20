import { forbidden, notfound, unauthorized } from "@/constants/errorEnum";
import { User } from "@/entities/User";
import { Workspace } from "@/entities/Workspace";
import { authOptions } from "@/libs/next-auth/auth";
import { initializeDataSource } from "@/libs/typeorm/initialize";
import { getServerSession } from "next-auth";
import { TaskDTO } from "@/types/dto/TaskDTO";
import { Task } from "@/entities/Task";
import { TaskSubmission } from "@/entities/TaskSubmission";
import { TaskSubmissionFile } from "@/entities/TaskSubmissionFile";
import { SubmittedFile } from "@/types/SubmittedFile";

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

  const isMember = workspace.users?.some((u) => u.id === user.id);
  if (!isMember) throw new Error(forbidden);

  const tasks = await db
    .getRepository(Task)
    .createQueryBuilder("task")
    .leftJoinAndSelect("task.workspace", "workspace")
    .leftJoinAndSelect("task.mentor", "mentor")
    .leftJoinAndSelect("task.mentees", "mentees")
    .leftJoinAndSelect("task.submissions", "submissions")
    .leftJoinAndSelect("submissions.user", "submissionUser")
    .leftJoinAndSelect("submissions.files", "submissionFiles")
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
  const userRepo = db.getRepository(User);
  const user = await userRepo.findOneBy({ email: session.user.email });

  if (!user) {
    throw new Error(notfound);
  }

  const userWithTasks = await userRepo
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.menteeTask", "task")
    .leftJoinAndSelect("task.workspace", "workspace")
    .leftJoinAndSelect("task.mentor", "mentor")
    .leftJoinAndSelect("task.mentees", "mentees")
    .leftJoinAndSelect("task.submissions", "submissions")
    .leftJoinAndSelect("submissions.user", "submissionUser")
    .leftJoinAndSelect("submissions.files", "submissionFiles")
    .where("user.id = :userId", { userId: user.id })
    .andWhere("task.workspace = :workspaceId", { workspaceId })
    .getOne();

  const tasks = userWithTasks?.menteeTask || [];

  return tasks.map((task: any) => {
    const mySubmissions = task.submissions?.filter((item: any) => item.user?.id === user.id) || [];
    return { ...task, mySubmissions, submissions: undefined };
  });
};

export const getTaskDetailMentors = async (
  workspaceId: string,
  taskId: number
) => {
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

  const isMember = workspace.users?.some((u) => u.id === user.id);
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

  const isMentor = workspace.mentors?.some((u) => u.id === user.id);
  const isAdmin = workspace.admin?.id === user.id;
  if (!isMentor && !isAdmin) throw new Error(forbidden);

  if (!task) throw new Error(notfound);

  return task;
};

export const getTaskDetailMentees = async (
  workspaceId: string,
  taskId: number
) => {
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

  const isMember = workspace.users?.some((u) => u.id === user.id);
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

  const isMentee = !!task?.mentees?.some((u) => u.id === user.id);
  const isMentor = workspace.mentors?.some((u) => u.id === user.id);
  const isAdmin = workspace.admin?.id === user.id;

  console.log(isMentee, isMentor, isAdmin);

  if (!isMentee && !isMentor && !isAdmin) throw new Error(forbidden);

  if (!task) throw new Error(notfound);

  const mySubmissions =
    task.submissions?.filter((item) => item.user?.id === user.id) || [];

  return { ...task, mySubmissions, submissions: undefined };
};

export const updateTask = async (workspaceId: string, taskId: number, content: TaskDTO) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const user = await userRepo.findOneBy({ email: session.user.email });

  if(!user) throw new Error(unauthorized);

  const workspaceRepo = db.getRepository(Workspace);
  const taskRepo = db.getRepository("Task");

  const mentor = await userRepo.findOneBy({ email: session.user.email });
  if (!mentor) throw new Error(notfound);

  const workspace = await workspaceRepo.findOne({
    where: { id: workspaceId },
    relations: ["mentors", "users"],
  });
  if (!workspace) throw new Error(notfound);

  const isMentor = workspace.mentors?.some((u) => u.id === mentor.id);
  if (!isMentor) throw new Error(forbidden);

  if (!content.startDate || !content.endDate) {
    throw new Error(forbidden);
  }

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

  const isAdmin = workspace.admin?.id === user.id;
  if (!isMentor && !isAdmin) throw new Error(forbidden);

  if (!task) throw new Error(notfound);

  task.title = content.title;
  task.description = content.description;
  task.mentees = content.mentees;
  task.startDate = new Date(content.startDate);
  task.endDate = new Date(content.endDate);

  await taskRepo.save(task);
  return task;
};

export const createTask = async (workspaceId: string, content: TaskDTO) => {
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
    relations: ["mentors", "users"],
  });
  if (!workspace) throw new Error(notfound);

  const isMentor = workspace.mentors?.some((u) => u.id === mentor.id);
  if (!isMentor) throw new Error(forbidden);

  if (!content.startDate || !content.endDate) {
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
    endDate: new Date(content.endDate),
  });

  await taskRepo.save(task);
  return task;
};

export const submitTask = async (
  taskId: number,
  submitData: SubmittedFile[]
) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const user = await userRepo.findOneBy({ email: session.user.email });
  if (!user) throw new Error(notfound);

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
    .getOne();

  if (!task) throw new Error(notfound);

  console.log(task);

  const isMentee = task.mentees?.some((u) => u.id === user.id);
  if (!isMentee) throw new Error(forbidden);

  const taskSubmission = db.getRepository(TaskSubmission).create({
    files: [],
    isSubmitted: true,
    task,
    user,
  });

  const submissions: TaskSubmissionFile[] = [];

  const taskSubmissionFileRepo = db.getRepository(TaskSubmissionFile);

  for (const submit of submitData) {
    const taskSubmissionFile = taskSubmissionFileRepo.create({
      originalName: submit.filename,
      submission: taskSubmission,
      url: submit.url,
    });

    const saved = await taskSubmissionFileRepo.save(taskSubmissionFile);
    submissions.push(saved);
  }
  taskSubmission.files = submissions;

  const newTaskSubmission = await db
    .getRepository(TaskSubmission)
    .save(taskSubmission);
  return newTaskSubmission;
};

export const cancelSubmit = async (submissionId: number) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const user = await userRepo.findOneBy({ email: session.user.email });
  if (!user) throw new Error(notfound);

  const taskSubmissionRepo = db.getRepository(TaskSubmission);
  await db
    .getRepository(TaskSubmissionFile)
    .delete({ submission: { id: submissionId } });

  return await taskSubmissionRepo.delete(submissionId);
};

export const getIsMentee = async (taskId: number) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const user = await userRepo.findOneBy({ email: session.user.email });
  if (!user) throw new Error(notfound);

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
    .getOne();

  if (!task) throw new Error(notfound);

  console.log(task);

  const isMentee = task.mentees?.some((u) => u.id === user.id);

  return !!isMentee;
};

export const editTask = async (
  workspaceId: string,
  taskId: number,
  content: TaskDTO
) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const workspaceRepo = db.getRepository(Workspace);
  const taskRepo = db.getRepository(Task);

  const mentor = await userRepo.findOneBy({ email: session.user.email });
  if (!mentor) throw new Error(notfound);

  const workspace = await workspaceRepo.findOne({
    where: { id: workspaceId },
    relations: ["mentors", "users"],
  });
  if (!workspace) throw new Error(notfound);

  const isMentor = workspace.mentors?.some((u) => u.id === mentor.id);
  if (!isMentor) throw new Error(forbidden);

  if (!content.startDate || !content.endDate) {
    throw new Error(forbidden);
  }

  const task = await taskRepo.findOne({
    where: { id: taskId },
    relations: ["workspace", "mentor", "mentees"],
  });
  if (!task) throw new Error(notfound);

  task.title = content.title;
  task.description = content.description;
  task.mentor = mentor;
  task.workspace = workspace;
  task.mentees = content.mentees;
  task.isDone = false;
  task.startDate = new Date(content.startDate);
  task.endDate = new Date(content.endDate);

  await taskRepo.save(task);
  return task;
};

export const deleteTask = async (workspaceId: string, taskId: number) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const workspaceRepo = db.getRepository(Workspace);
  const taskRepo = db.getRepository(Task);
  const submissionRepo = db.getRepository(TaskSubmission);
  const fileRepo = db.getRepository(TaskSubmissionFile);

  const user = await userRepo.findOneBy({ email: session.user.email });
  if (!user) throw new Error(notfound);

  const workspace = await workspaceRepo.findOne({
    where: { id: workspaceId },
    relations: ["admin", "mentors"]
  });
  if (!workspace) throw new Error(notfound);

  const isAdmin = workspace.admin?.id === user.id;
  const isMentor = workspace.mentors?.some(m => m.id === user.id);
  if (!isAdmin && !isMentor) throw new Error(forbidden);

  const task = await taskRepo.findOne({
    where: { id: taskId, workspace: { id: workspaceId } }
  });
  if (!task) throw new Error(notfound);

  const submissions = await submissionRepo.find({
    where: { task: { id: taskId } },
    relations: ["files"],
  });

  for (const submission of submissions) {
    if (submission.files?.length) {
      await fileRepo.remove(submission.files);
    }
  }

  if (submissions.length) {
    await submissionRepo.remove(submissions);
  }

  await taskRepo.remove(task);

  return { success: true };
};
