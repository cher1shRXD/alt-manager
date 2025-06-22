import { Task } from "@/entities";

export interface TaskListItemProps {
  task: Task;
  workspaceId: string;
  isMentee: boolean;
}