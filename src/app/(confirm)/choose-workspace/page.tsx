import CustomLink from "@/components/common/CustomLink";
import { getMyWorkspaces } from "@/services/workspaceService";
import { SquareArrowOutUpRight } from "lucide-react";

const ChooseWorkspace = async () => {
  const workspaces = await getMyWorkspaces();
  console.log(workspaces);

  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-120 h-100 bg-container border border-border rounded-xl flex flex-col items-center px-4">
        <p className="w-full py-1 pt-3 text-center">워크스페이스 선택</p>
        <div className="w-full flex-1 overflow-y-scroll">
          <div className="w-full flex flex-col gap-2 py-2">
            {
              workspaces.length > 0 ? workspaces.map((item) => (
                <CustomLink href={`/?workspace=${item.id}`} key={item.id} className="w-full flex items-center bg-container p-2 rounded-lg border border-border">
                  <div className="flex-1 flex flex-col gap-1 ">
                    <p className="font-anton tracking-[1.6] text-xl">{item.name}</p>
                    <p className="text-xs text-gray-500">참가 인원: {item.users?.length}</p>
                  </div>
                  <SquareArrowOutUpRight size={20} />
                </CustomLink>
              )) : (
                <div className="w-full py-4">
                  <p className="text-gray-500 text-center">워크스페이스가 없습니다.</p>
                </div>
              )
            }
          </div>
        </div>
        <CustomLink href="/make-workspace" className="w-full py-2 text-sm bg-primary rounded-lg text-center mb-1">워크스페이스 생성</CustomLink>
        <CustomLink href="/join-workspace" className="w-full py-2 text-sm bg-container rounded-lg text-white border border-border text-center mb-4">워크스페이스 참가</CustomLink>
      </div>
    </div>
  )
}
export default ChooseWorkspace