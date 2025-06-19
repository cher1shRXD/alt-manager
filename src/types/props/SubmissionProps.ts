import { TaskSubmission } from "@/entities/TaskSubmission";

export interface SubmissionProps {
  taskId: number;
  submissions: TaskSubmission[];
}