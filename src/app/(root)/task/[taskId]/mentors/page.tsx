import SubmittedItem from "@/components/SubmittedItem";
import { CODE_EXT, IMAGE_EXT, VIDEO_EXT } from "@/constants/exts";
import { getTaskDetailMentors } from "@/services/taskService";
import { SearchParamProps } from "@/types/props/SearchParamProps";
import { getFileExtension } from "@/utilities/getFileExtension";
import { parseDate } from "@/utilities/parseDate";
import { Code2, File, Video } from "lucide-react";
import { redirect } from "next/navigation";

const TaskMentor = async ({
  params,
  searchParams,
}: { params: Promise<{ taskId: string }> } & SearchParamProps) => {
  const { taskId } = await params;
  const keyword = await searchParams;

  if (!keyword) {
    redirect("/choose-workspace");
  }

  const task = await getTaskDetailMentors(
    keyword.workspace as string,
    parseInt(taskId)
  );

  console.log(task);

  return (
    <div className="w-full flex flex-col gap-4 mb-4">
      <p className="text-xl">과제 내용</p>
      <div className="w-full p-2 bg-container rounded-xl border border-border flex flex-col gap-4 items-start mb-8">
        <p className="p-2 w-full bg-container border border-border rounded-lg text-xl">
          {task.title}
        </p>
        <textarea
          value={task.description}
          readOnly
          className="w-full outline-none min-h-80 p-2 resize-none bg-container border border-border rounded-lg"
        />
        <div className="w-full flex flex-col gap-1">
          <p>과제 대상</p>
          <div className="w-full flex items-start gap-1 flex-wrap">
            {task.mentees?.map((item) => (
              <div className="px-2 py-0.5 bg-primary rounded" key={item.id}>
                <p className="text-sm">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-1 items-start">
          <p>과제 마감일</p>
          <p className="p-2 bg-container border border-border rounded-lg text-sm">
            {parseDate(task.startDate)} ~ {parseDate(task.endDate)}
          </p>
        </div>
        <div className="w-full flex flex-col gap-1 items-start">
          <p className="text-sm">출제일 / 출제자</p>
          <p className="p-2 bg-container border border-border rounded-lg text-xs text-gray-500">
            {parseDate(task.createdAt)} / {task.mentor?.name}
          </p>
        </div>
        <div className="w-full flex items-center justify-end">
          
        </div>
      </div>
      <p className="text-xl">과제 제출 현황</p>
      <div className="w-full flex flex-col gap-2">
        {task.submissions && task.submissions.length > 0 ? (
          task.submissions.map((item) => (
            <div key={item.id} className="border border-border bg-container rounded-xl p-2">
              <p className="mb-2">{item.user?.name}</p>
              <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {item.files?.map((file) => (
                  <SubmittedItem file={JSON.parse(JSON.stringify(file))} key={file.id} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">제출된 파일이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default TaskMentor;
