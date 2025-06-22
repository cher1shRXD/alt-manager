import CustomLink from "@/components/common/CustomLink";
import { getMe } from "@/services/getMe";
import { getMyTasks, getTasks } from "@/services/taskService";
import { getWorkspace } from "@/services/workspaceService";
import { SearchParamProps } from "@/types/props/SearchParamProps";
import { parseDate } from "@/utilities/parseDate";
import { redirect } from "next/navigation";

const Task = async ({ searchParams }: SearchParamProps) => {
  const keyword = await searchParams;

  if(!keyword.workspace) {
    redirect("/choose-workspace");
  }

  const workspace = await getWorkspace(keyword.workspace as string);
  const allTasks = await getTasks(keyword.workspace as string);
  const myTasks = await getMyTasks(keyword.workspace as string)
  const user = await getMe();

  const isMentor = !!workspace.mentors?.some(m => m.id === user?.id) || workspace.admin?.id === user?.id;

  return (
    <div className="w-full flex flex-col lg:flex-row items-start gap-4 mb-16">
      <div className="w-full lg:w-min lg:flex-1 p-2 bg-container rounded-xl border border-border flex flex-col gap-2">
        <p className="w-full text-center">과제 목록</p>
        <div className="w-full flex flex-col gap-1">
          {
            isMentor ? allTasks.length > 0 ? allTasks.map(item => (
              <CustomLink href={`/task/${item.id}/mentors?workspace=${workspace.id}`} className="w-full bg-container border border-border rounded-lg p-2 flex flex-col gap-1" key={item.id}>
                <p className="text-sm lg:text-base text-nowrap overflow-hidden whitespace-nowrap text-ellipsis">{item.title}</p>
                <p className="text-xs lg:text-sm text-nowrap overflow-hidden whitespace-nowrap text-ellipsis">{parseDate(item.startDate)} ~ {parseDate(item.endDate)}</p>
                <div className="w-full flex items-start flex-wrap gap-1">
                  {
                    item.mentees?.map(mentee => (
                      <div className="px-2 py-0.5 bg-primary rounded" key={mentee.id}>
                        <p className="text-[10px]">{mentee.name}</p>
                      </div>
                    ))
                  }
                </div>
                <div className="w-full flex items-center justify-between gap-2">
                  <p className="text-xs text-gray-500 text-nowrap">출제자: {item.mentor?.name}</p>
                  <p className="text-xs text-gray-500 text-nowrap overflow-hidden whitespace-nowrap text-ellipsis">출제일: {parseDate(item.createdAt)}</p>
                </div>
              </CustomLink>
            )) : <p className="text-gray-500 w-full text-center">과제가 없습니다.</p> 
            : myTasks.length > 0 ? myTasks.map(item => (
              <CustomLink href={`/task/${item.id}/mentees?workspace=${workspace.id}`} className="w-full bg-container border border-border rounded-lg p-2 flex flex-col gap-1" key={item.id}>
                <p>{item.title}</p>
                <p className="text-sm">{parseDate(item.startDate)} ~ {parseDate(item.endDate)}</p>
                <div className="w-full flex items-center justify-between gap-2">
                  <p className="text-xs text-gray-500">출제자: {item.mentor?.name}</p>
                  <p className="text-xs text-gray-500">출제일: {parseDate(item.createdAt)}</p>
                </div>
              </CustomLink>
            )) : <p className="text-gray-500 w-full text-center">과제가 없습니다.</p> 
          }
        </div>
      </div>
      <div className="w-full lg:max-w-80 bg-container border border-border rounded-xl p-2 flex flex-col gap-4 sticky top-4">
        <p className="text-lg">과제 정보</p>
        <div className="w-full flex flex-col gap-1">
          <p>{isMentor ? "총 과제 수" : "내 과제 수"}: <span className="text-primary">{isMentor ? workspace.tasks?.length : user?.menteeTask?.length}개</span></p>
        </div>
        <div className="w-full flex flex-col gap-1">
          <p>등록된 멘토</p>
          <div className="w-full flex items-start flex-wrap gap-2">
            {
              workspace.mentors?.map((item) => (
                <div className="px-3 py-1 bg-container rounded" key={item.id}>
                  <p className="text-xs">{item.name}</p>
                </div>
              ))
            }
          </div>
        </div>
        {
          isMentor && <CustomLink href={`/task/create?workspace=${keyword.workspace}`} className="p-2 text-xs bg-primary rounded-lg text-center">과제 생성하기</CustomLink>
        }
      </div>
    </div>
  )
}

export default Task