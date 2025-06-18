"use client";

import CustomLink from "@/components/common/CustomLink";
import { useGetWorkspace } from "@/hooks/workspace/useGetWorkspace";
import { useManageWorkspace } from "@/hooks/workspace/useManageWorkspace";
import { useSearchParams } from "next/navigation";

const EditWorkspace = () => {
  const searchParams = useSearchParams();
  const workspace = useGetWorkspace(searchParams.get("workspace"));
  const { updateSubmit, handleNewTitle, newTitle } = useManageWorkspace(searchParams.get("workspace"));

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 bg-container border border-border p-4 rounded-lg">
        <p className="text-3xl font-anton tracking-[1.6]">{workspace?.name}</p>
        <p className="text-lg text-semibold text-center">워크스페이스명 수정</p>
        <input type="text" className="w-full min-w-56 p-2 text-sm rounded-lg bg-container border border-border outline-none mt-1" onChange={handleNewTitle} value={newTitle} placeholder={workspace?.name} />
        <div className="w-full flex items-center gap-2 mt-2">
          <CustomLink href={`/workspace?workspace=${searchParams.get("workspace")}`} className="flex-1 text-center p-2 text-xs bg-container border border-border rounded text-red-500 cursor-pointer">취소</CustomLink>
          <button onClick={updateSubmit} className="flex-1 p-2 text-xs bg-primary rounded cursor-pointer">수정</button>
        </div>
      </div>
    </div>
  )
}

export default EditWorkspace