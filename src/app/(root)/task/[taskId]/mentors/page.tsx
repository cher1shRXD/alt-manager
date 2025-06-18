import { getTaskDetailMentors } from "@/services/taskService";
import { SearchParamProps } from "@/types/props/SearchParamProps";
import { parseDate } from "@/utilities/parseDate";
import { redirect } from "next/navigation";

const TaskMentor = async ({ params, searchParams }: { params: Promise<{ taskId: string }> } & SearchParamProps) => {
  const { taskId } = await params;
  const keyword = await searchParams;

  if(!keyword) {
    redirect("/choose-workspace");
  }

  const task = await getTaskDetailMentors(keyword.workspace as string, parseInt(taskId));

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-xl">과제 내용</p>
      <div className="w-full flex items-start gap-4 mb-4">
        <div className="flex-1 p-2 bg-container rounded-xl border border-border flex flex-col gap-4 items-start">
          <p className="p-2 min-w-40 bg-container border border-border rounded-lg text-xl">{task.title}</p>
          <textarea value={task.description} readOnly className="w-full outline-none min-h-80 p-2 resize-none bg-container border border-border rounded-lg" />
          <div className="w-full flex flex-col gap-1">
            <p>과제 대상</p>
            <div className="w-full flex items-start gap-1 flex-wrap">
              {
                task.mentees?.map((item) => (
                  <div className="px-2 py-0.5 bg-primary rounded" key={item.id}>
                    <p className="text-sm">{item.name}</p>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 items-start">
            <p>과제 마감일</p>
            <p className="p-2 bg-container border border-border rounded-lg text-sm">{parseDate(task.startDate)} ~ {parseDate(task.endDate)}</p>
          </div>
          <div className="w-full flex flex-col gap-1 items-start">
            <p className="text-sm">출제일 / 출제자</p>
            <p className="p-2 bg-container border border-border rounded-lg text-xs text-gray-500">{parseDate(task.createdAt)} / {task.mentor?.name}</p>
          </div>
        </div>
        <div className="w-full max-w-80 bg-container border border-border rounded-xl p-2 flex flex-col gap-4 sticky top-4">

        </div>
      </div>
    </div>
    
  )
}

export default TaskMentor