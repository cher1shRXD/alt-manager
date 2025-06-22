import { DataSource } from "typeorm";
import "dotenv/config";
import "reflect-metadata"
import { User } from "@/entities/User";
import { Task } from "@/entities/Task";
import { Workspace } from "@/entities/Workspace";
import { Report } from "@/entities/Report";
import { TaskSubmission } from "@/entities/TaskSubmission";
import { TaskSubmissionFile } from "@/entities/TaskSubmissionFile";
import { TaskMentee } from "@/entities/TaskMentee";

const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User, Workspace, Report, Task, TaskSubmission, TaskSubmissionFile, TaskMentee],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  logging: ["error", "warn", "info", "log"],
  logger: "advanced-console",
});

export default AppDataSource