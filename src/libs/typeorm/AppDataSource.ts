import { DataSource } from "typeorm";
import "dotenv/config";
import "reflect-metadata"
import { User } from "@/entities/User";
import { Task } from "@/entities/Task";
import { Workspace } from "@/entities/Workspace";
import { Report } from "@/entities/Report";
import { TaskSubmission } from "@/entities/TaskSubmission";
import { TaskSubmissionFile } from "@/entities/TaskSubmissionFile";


const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User, Task, Workspace, Report, TaskSubmission, TaskSubmissionFile],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  logging: true
});

export default AppDataSource