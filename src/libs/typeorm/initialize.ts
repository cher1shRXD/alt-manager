import AppDataSource from "./AppDataSource";
import { DataSource } from "typeorm";

let dataSourceInstance: DataSource | null = null;

export const initializeDataSource = async () => {
  if (!dataSourceInstance) {
    if (!AppDataSource.isInitialized) {
      try {
        await AppDataSource.initialize();
        console.log("✅ DB 초기화 완료");
      } catch (err) {
        console.log(AppDataSource.options.entities);

        console.error("❌ DB 초기화 실패:", err);
        throw err;
      }
    }
    dataSourceInstance = AppDataSource;
  }

  return dataSourceInstance;
};
