import { DataSource } from "typeorm";
import "dotenv/config";
import "reflect-metadata"
import { User } from "@/entities/User";
import { Task } from "@/entities/Task";
import { Workspace } from "@/entities/Workspace";
import { Report } from "@/entities/Report";


const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User, Task, Workspace, Report],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
});

export default AppDataSource