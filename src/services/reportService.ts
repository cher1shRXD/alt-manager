import { forbidden, notfound, unauthorized } from "@/constants/errorEnum";
import { Report } from "@/entities/Report";
import { User } from "@/entities/User";
import { authOptions } from "@/libs/next-auth/auth"
import { initializeDataSource } from "@/libs/typeorm/initialize";
import { getServerSession } from "next-auth"
import { getWorkspace } from "./workspaceService";
import { ReportDTO } from "@/types/dto/ReportDTO";
import { Workspace } from "@/entities/Workspace";

export const getMyReports = async (workspaceId: string) => {
  const session = await getServerSession(authOptions);

  if(!session || !session.user.email) {
    throw new Error(unauthorized);
  }

  const db = await initializeDataSource();
  const user = await db.getRepository(User).findOneBy({ email: session.user.email });

  if(!user){
    throw new Error(notfound);
  }

  const reports = await db
    .getRepository(Report)
    .createQueryBuilder("report")
    .leftJoin("report.author", "user")
    .leftJoin("report.workspace", "workspace")
    .where("user.id = :userId", { userId: user.id })
    .andWhere("workspace.id = :workspaceId", { workspaceId })
    .getMany();

  return reports;
}

export const getReportsInWorkspace = async (workspaceId: string) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email) {
    throw new Error(unauthorized);
  }

  const db = await initializeDataSource();
  const userRepo = db.getRepository(User);
  const reportRepo = db.getRepository(Report);

  const user = await userRepo.findOneBy({ email: session.user.email });
  if (!user) {
    throw new Error(notfound);
  }

  const workspace = await getWorkspace(workspaceId);
  const adminId = workspace.admin?.id;

  const reports = await reportRepo
    .createQueryBuilder("report")
    .leftJoinAndSelect("report.author", "author")
    .leftJoin("report.workspace", "workspace")
    .where("workspace.id = :workspaceId", { workspaceId })
    .getMany();

  const grouped = reports.reduce((acc, report) => {
    const author = report.author;
    if (!author) return acc;
    if (author.id === adminId) return acc;

    const key = author.id;

    if(!key) {
      throw new Error(notfound);
    }

    if (!acc.has(key)) {
      acc.set(key, { user: author, reports: [] });
    }
    acc.get(key)!.reports.push(report);

    return acc;
  }, new Map<string, { user: User; reports: Report[] }>());

  return Array.from(grouped.values());
};

export const getReportDetail = async (reportId: number, workspaceId: string) => {
  const session = await getServerSession(authOptions);

  if(!session || !session.user.email) {
    throw new Error(unauthorized);
  }

  const db = await initializeDataSource();
  const report = await db.getRepository(Report).findOne({ where: { id: reportId }, relations: ["author", "workspace"] });

  if(!report) {
    throw new Error(notfound);
  }

  if(report.workspace?.id !== workspaceId) {
    throw new Error(forbidden);
  }

  return report;
}

export const createReport = async (data: ReportDTO, workspaceId: string) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email) {
    throw new Error(unauthorized);
  }

  const db = await initializeDataSource();
  const user = await db.getRepository(User).findOneBy({ email: session.user.email });
  const workspace = await db.getRepository(Workspace).findOne({
    where: { id: workspaceId },
    relations: ["users"],
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

  const reportRepo = db.getRepository(Report);

  const newReport = reportRepo.create({
    ...data,
    author: user,
    workspace,
    createdAt: new Date(),
  });

  const savedReport = await reportRepo.save(newReport);

  return savedReport;
};