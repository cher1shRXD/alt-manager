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
import { TaskMentee } from "@/entities/TaskMentee";

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
    .leftJoinAndSelect("task.mentees", "taskMentees")
    .leftJoinAndSelect("taskMentees.mentee", "menteeUser")
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
    .leftJoinAndSelect("user.menteeTask", "taskMentee")
    .leftJoinAndSelect("taskMentee.task", "task")
    .leftJoinAndSelect("task.workspace", "workspace")
    .leftJoinAndSelect("task.mentor", "mentor")
    .leftJoinAndSelect("task.mentees", "taskMentees")
    .leftJoinAndSelect("taskMentees.mentee", "menteeUser")
    .leftJoinAndSelect("task.submissions", "submissions")
    .leftJoinAndSelect("submissions.user", "submissionUser")
    .leftJoinAndSelect("submissions.files", "submissionFiles")
    .where("user.id = :userId", { userId: user.id })
    .andWhere("task.workspace = :workspaceId", { workspaceId })
    .getOne();

  const tasks = userWithTasks?.menteeTask?.map((tm) => tm.task) || [];

  return tasks.map((task) => {
    const mySubmissions = task?.submissions?.filter((item) => item.user?.id === user.id) || [];
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
    .leftJoinAndSelect("task.mentees", "taskMentees")
    .leftJoinAndSelect("taskMentees.mentee", "menteeUser")
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
    .leftJoinAndSelect("task.mentees", "taskMentees")
    .leftJoinAndSelect("taskMentees.mentee", "menteeUser")
    .leftJoinAndSelect("task.submissions", "submissions")
    .leftJoinAndSelect("submissions.user", "submissionUser")
    .leftJoinAndSelect("submissions.files", "submissionFiles")
    .where("task.id = :taskId", { taskId })
    .andWhere("workspace.id = :workspaceId", { workspaceId })
    .getOne();

  const isMentee = !!task?.mentees?.some((tm: TaskMentee) => tm.mentee?.id === user.id);
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
    .leftJoinAndSelect("task.mentees", "taskMentees")
    .leftJoinAndSelect("taskMentees.mentee", "menteeUser")
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
  task.startDate = new Date(content.startDate!);
  task.endDate = new Date(content.endDate!);

  await db.getRepository(Task).save(task);

  const taskMenteeRepo = db.getRepository(TaskMentee);
  await taskMenteeRepo.delete({ task: { id: taskId } });

  if (content.mentees && content.mentees.length > 0) {
    const menteeEntities = content.mentees.map((mentee) => {
      return taskMenteeRepo.create({ task, mentee });
    });
    await taskMenteeRepo.save(menteeEntities);
  }

  const updatedTask = await db
    .getRepository(Task)
    .createQueryBuilder("task")
    .leftJoinAndSelect("task.workspace", "workspace")
    .leftJoinAndSelect("task.mentor", "mentor")
    .leftJoinAndSelect("task.mentees", "taskMentees")
    .leftJoinAndSelect("taskMentees.mentee", "menteeUser")
    .leftJoinAndSelect("task.submissions", "submissions")
    .leftJoinAndSelect("submissions.user", "submissionUser")
    .leftJoinAndSelect("submissions.files", "submissionFiles")
    .where("task.id = :taskId", { taskId })
    .andWhere("workspace.id = :workspaceId", { workspaceId })
    .getOne();

  return updatedTask;
};

export const createTask = async (workspaceId: string, content: TaskDTO) => {
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
    relations: ["mentors"],
  });

  if (!workspace) throw new Error(notfound);

  const isMentor = workspace.mentors?.some((u) => u.id === mentor.id);
  if (!isMentor) throw new Error(forbidden);

  if (!content.startDate || !content.endDate) {
    throw new Error(forbidden);
  }

  const baseWorkspace = await workspaceRepo.findOneBy({ id: workspaceId });
  if (!baseWorkspace) throw new Error(notfound);


  const task = taskRepo.create({
    title: content.title,
    description: content.description,
    mentor,
    workspace: baseWorkspace,
    isDone: false,
    startDate: new Date(content.startDate!),
    endDate: new Date(content.endDate!),
  });
  const savedTask = await taskRepo.save(task);

  if (content.mentees && content.mentees.length > 0) {
    const taskMenteeRepo = db.getRepository(TaskMentee);
    const menteeEntities = content.mentees.map((mentee) => {
      return taskMenteeRepo.create({ task: savedTask, mentee });
    });
    await taskMenteeRepo.save(menteeEntities);
  }

  return savedTask;
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
    .leftJoinAndSelect("task.mentees", "taskMentees")
    .leftJoinAndSelect("taskMentees.mentee", "menteeUser")
    .leftJoinAndSelect("task.submissions", "submissions")
    .leftJoinAndSelect("submissions.user", "submissionUser")
    .leftJoinAndSelect("submissions.files", "submissionFiles")
    .where("task.id = :taskId", { taskId })
    .getOne();

  if (!task) throw new Error(notfound);

  const isMentee = task.mentees?.some((tm: TaskMentee) => tm.mentee?.id === user.id);
  if (!isMentee) throw new Error(forbidden);

  const taskSubmissionRepo = db.getRepository(TaskSubmission);
  const taskEntity = await db.getRepository(Task).findOneBy({ id: taskId });
  if (!taskEntity) throw new Error(notfound);

  const taskSubmission = taskSubmissionRepo.create({
    files: [],
    isSubmitted: true,
    task: taskEntity,
    user,
  });
  const savedSubmission = await taskSubmissionRepo.save(taskSubmission);

  const taskSubmissionFileRepo = db.getRepository(TaskSubmissionFile);
  const submissions: TaskSubmissionFile[] = [];
  for (const submit of submitData) {
    const taskSubmissionFile = taskSubmissionFileRepo.create({
      originalName: submit.filename,
      submission: savedSubmission,
      url: submit.url,
    });
    const saved = await taskSubmissionFileRepo.save(taskSubmissionFile);
    submissions.push(saved);
  }
  
  savedSubmission.files = submissions;
  await taskSubmissionRepo.save(savedSubmission);

  return savedSubmission;
};

export const cancelSubmit = async (submissionId: number) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) throw new Error(unauthorized);

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const user = await userRepo.findOneBy({ email: session.user.email });
  if (!user) throw new Error(notfound);

  await db
    .getRepository(TaskSubmissionFile)
    .createQueryBuilder("task_submission_file")
    .delete()
    .where("task_submission_file.submissionId = :submissionId", { submissionId })
    .execute();

  return await db.getRepository(TaskSubmission)
    .createQueryBuilder("task_submission")
    .delete()
    .where("task_submission.id = :submissionId", { submissionId })
    .execute();
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
    .leftJoinAndSelect("task.mentees", "taskMentees")
    .leftJoinAndSelect("taskMentees.mentee", "menteeUser")
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
