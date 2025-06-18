import { User } from "@/entities/User";

export interface TaskDTO {
  title: string;
  description: string;
  mentees: User[];
  startDate?: string;
  endDate?: string;
}
