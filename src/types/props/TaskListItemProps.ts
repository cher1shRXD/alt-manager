import { Task } from "@/entities/Task";

export interface TaskListItemProps {
  task: Task
  workspaceId: string;
  isMentee: boolean;
}