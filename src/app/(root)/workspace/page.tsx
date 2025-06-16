import CustomLink from "@/components/common/CustomLink";
import UserItem from "@/components/UserItem";
import { getMe } from "@/services/getMe";
import { getWorkspace } from "@/services/workspaceService";
import { redirect } from "next/navigation";

const Workspace = async ({ searchParams }: SearchParamProps) => {
  const keyword = await searchParams;
  const user = await getMe();

  if(!keyword.workspace) {
    redirect("/choose-workspace");
  }

  const workspace = await getWorkspace(keyword.workspace as string);
  console.log(workspace);

  return (
    <div className="w-full flex items-start gap-4 mb-4">
      <div className="flex-1 p-2 bg-container rounded-xl border border-border">
        <p className="mb-2 text-sm w-full text-center py-1">워크스페이스 멤버</p>
        <div className="w-full flex flex-col gap-2">
          {
            workspace.users?.map((item) => (
              <UserItem data={{ ...item }} currentUserId={user?.id} adminId={workspace.admin?.id} key={item.id} />
            ))
          }
        </div>
      </div>
      
      <div className="w-full max-w-80 bg-container border border-border rounded-xl p-2 flex flex-col gap-4 sticky top-2">
        <p className="font-anton tracking-[1.6] text-3xl text-center py-2">{workspace.name}</p>
        <div className="flex flex-col gap-1">
          <p className="text-xs">워크스페이스 관리자</p>
          <div className="p-2 border border-border bg-container rounded-lg">
            <p className="text-sm">{workspace.admin?.name}</p>
            <p className="text-xs text-gray-500">{workspace.admin?.email}</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-1">
          <CustomLink href="/edit-workspace" className="p-2 text-xs bg-primary border border-border rounded-lg text-center">워크스페이스 정보 수정</CustomLink>
          <CustomLink href="/remove-workspace" className="p-2 text-xs bg-container border border-border rounded-lg text-red-500 text-center">워크스페이스 삭제</CustomLink>
        </div>
        
      </div>
    </div>
  )
}

export default Workspace