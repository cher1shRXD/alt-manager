"use client";

import CustomLink from "@/components/common/CustomLink";
import { useGetWorkspace } from "@/hooks/workspace/useGetWorkspace";
import { useManageWorkspace } from "@/hooks/workspace/useManageWorkspace";
import { useSearchParams } from "next/navigation";

const DeleteWorkspace = () => {
  const searchParams = useSearchParams();
  const workspaceName = useGetWorkspace(searchParams.get("workspace"));
  const { deleteSubmit } = useManageWorkspace(searchParams.get("workspace"), workspaceName);

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-1">
      <p className="text-2xl text-semibold">워크스페이스 "{workspaceName}"를 삭제하시겠습니까?</p>
      <p>되돌릴 수 없습니다.</p>
      <div className="flex items-center gap-2 mt-2">
        <CustomLink href={`/workspace?workspace=${searchParams.get("workspace")}`} className="p-2 text-xs bg-container border border-border rounded text-red-500 cursor-pointer">취소</CustomLink>
        <button onClick={deleteSubmit} className="p-2 text-xs bg-container border border-border rounded text-red-500 cursor-pointer">삭제</button>
      </div>
    </div>
  )
}

export default DeleteWorkspace