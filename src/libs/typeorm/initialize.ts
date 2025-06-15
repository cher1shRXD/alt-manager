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

  return dataSourceInstance;
};
