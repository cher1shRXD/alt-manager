import { getMe } from "@/services/getMe";
import { getWorkspace } from "@/services/workspaceService";
import { SearchParamProps } from "@/types/props/SearchParamProps";
import { redirect } from "next/navigation";

const Task = async ({ searchParams }: SearchParamProps) => {
  const keyword = await searchParams;

  if(!keyword.workspace) {
    redirect("/choose-workspace");
  }

  const workspace = await getWorkspace(keyword.workspace as string);
  const user = await getMe();

  const isMentor = workspace.mentors?.some(m => m.id === user?.id);

  return (
    <div className="w-full flex items-start gap-4 mb-4">
      <div className="flex-1 p-2 bg-container rounded-xl border border-border">
        
      </div>
      <div className="w-full max-w-80 bg-container border border-border rounded-xl p-2 flex flex-col gap-4 sticky top-4">
        <div className="w-full flex flex-col gap-1">
          <p>{isMentor ? "총 과제 수" : "내 과제 수"}</p>
          <p className="text-sm">{isMentor ? workspace.tasks?.length : user?.menteeTask?.length}개</p>
        </div>
        <div className="w-full flex flex-col gap-1">
          <p>등록된 멘토</p>
          <div className="w-full flex items-start flex-wrap gap-2">
            {
              workspace.mentors?.map((item) => (
                <div className="px-3 py-1 bg-primary rounded" key={item.id}>
                  <p className="text-xs">{item.name}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Task