"use client"

import CustomLink from "@/components/common/CustomLink";
import { useGetUser } from "@/hooks/useGetUser";
import { useManageMember } from "@/hooks/workspace/useManageMemeber";
import { useSearchParams } from "next/navigation";

const UnsetMentor = () => {
  const searchParams = useSearchParams();
  const username = useGetUser(searchParams.get("userId"));
  const { unsetMentorSubmit, loading } = useManageMember(searchParams.get("workspace"), searchParams.get("userId"));

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 bg-container border border-border p-4 rounded-lg">
        <p className="text-3xl">{username}</p>
        <p className="text-lg text-semibold text-center">워크스페이스의 멘토 권한을 박탈합니다</p>
        <p className="text-xs text-primary">멘토 권한은 관리자만이 관리할 수 있습니다.</p>
        <div className="w-full flex items-center gap-2 mt-2">
          <CustomLink href={`/workspace?workspace=${searchParams.get("workspace")}`} className="flex-1 text-center p-2 text-xs bg-container border border-border rounded text-red-500">취소</CustomLink>
          <button onClick={unsetMentorSubmit} className="flex-1 p-2 text-xs bg-container border border-border rounded text-red-500 disabled:bg-gray-300" disabled={loading}>{loading ? "권한 변경 중..." : "확인"}</button>
        </div>
      </div>
    </div>
  )
}

export default UnsetMentor