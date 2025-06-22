"use client";

import CustomLink from "@/components/common/CustomLink";
import { useGetUser } from "@/hooks/useGetUser";
import { useManageMember } from "@/hooks/workspace/useManageMemeber";
import { useSearchParams } from "next/navigation";

const RemoveMember = () => {
  const searchParams = useSearchParams();
  const username = useGetUser(searchParams.get("userId"));
  const { deleteSubmit, loading } = useManageMember(searchParams.get("workspace"), searchParams.get("userId"));

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 bg-container border border-border p-4 rounded-lg">
        <p className="lg:text-3xl">{username}</p>
        <p className="text-lg text-semibold text-center break-keep">유저를 워크스페이스에서 삭제합니다.</p>
        <p className="text-xs text-primary">이 작업은 되돌릴 수 없습니다.</p>
        <div className="w-full flex items-center gap-2 mt-2">
          <CustomLink href={`/workspace?workspace=${searchParams.get("workspace")}`} className="flex-1 text-center p-2 text-xs bg-container border border-border rounded text-red-500">취소</CustomLink>
          <button onClick={deleteSubmit} className="flex-1 p-2 text-xs bg-container border border-border rounded text-red-500" disabled={loading}>{loading ? "삭제 중..." : "삭제"}</button>
        </div>
      </div>
    </div>
  )
}

export default RemoveMember