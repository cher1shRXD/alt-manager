import { getTaskDetailMentees } from "@/services/taskService";
import { SearchParamProps } from "@/types/props/SearchParamProps"
import { redirect } from "next/navigation";

const TaskMentee = async ({ params, searchParams }: { params: Promise<{ taskId: string }> } & SearchParamProps) => {
  const { taskId } = await params;
  const keyword = await searchParams;

  if(!keyword) {
    redirect("/choose-workspace");
  }

  const task = await getTaskDetailMentees(keyword.workspace as string, parseInt(taskId));
  console.log(task);

  return (
    <div>TaskMentee</div>
  )
}

export default TaskMentee