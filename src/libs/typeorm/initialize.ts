import AppDataSource from "./AppDataSource";
import { DataSource } from "typeorm";

let dataSourceInstance: DataSource | null = null;

export const initializeDataSource = async () => {
  if (!dataSourceInstance) {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    dataSourceInstance = AppDataSource;
  }

  console.log(AppDataSource.entityMetadatas.map(e => e.name)); // 👈 배열이 비어있다면 문제 있음

  return dataSourceInstance;
};
