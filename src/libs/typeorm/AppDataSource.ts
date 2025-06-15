import { DataSource } from "typeorm";
import "dotenv/config";
import "reflect-metadata"
import { User } from "@/entities/User";


const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: process.env.NODE_ENV !== "production",
  entities: [User],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
});

export default AppDataSource