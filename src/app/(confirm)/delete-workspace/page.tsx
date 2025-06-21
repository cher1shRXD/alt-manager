"use client";

import CustomLink from "@/components/common/CustomLink";
import { useGetWorkspace } from "@/hooks/workspace/useGetWorkspace";
import { useManageWorkspace } from "@/hooks/workspace/useManageWorkspace";
import { useSearchParams } from "next/navigation";

const DeleteWorkspace = () => {
  const searchParams = useSearchParams();
  const workspace = useGetWorkspace(searchParams.get("workspace"));
  const { deleteSubmit } = useManageWorkspace(searchParams.get("workspace"));

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 bg-container border border-border p-4 rounded-lg">
        <p className="text-3xl font-anton tracking-[1.6]">{workspace?.name}</p>
        <p className="text-lg text-semibold text-center">워크스페이스를 삭제하시겠습니까?</p>
        <p className="text-xs text-primary">이 작업은 되돌릴 수 없습니다.</p>
        <div className="w-full flex items-center gap-2 mt-2">
          <CustomLink href={`/workspace?workspace=${searchParams.get("workspace")}`} className="flex-1 text-center p-2 text-xs bg-container border border-border rounded text-red-500">취소</CustomLink>
          <button onClick={deleteSubmit} className="flex-1 p-2 text-xs bg-container border border-border rounded text-red-500">삭제</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteWorkspace