"use client";

import CustomLink from "@/components/common/CustomLink";
import { useGetUser } from "@/hooks/useGetUser";
import { useManageMember } from "@/hooks/workspace/useManageMemeber";
import { useSearchParams } from "next/navigation";

const TransfreAdmin = () => {
  const searchParams = useSearchParams();
  const username = useGetUser(searchParams.get("userId"));
  const { updateSubmit } = useManageMember(searchParams.get("workspace"), searchParams.get("userId"));

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 bg-container border border-border p-4 rounded-lg">
        <p className="text-3xl">{username}</p>
        <p className="text-lg text-semibold text-center">워크스페이스의 관리자 권한을 부여합니다.</p>
        <p className="text-xs text-primary">이 작업은 되돌릴 수 없으며 앞으로 관리자의 역할을 잃게됩니다.</p>
        <div className="w-full flex items-center gap-2 mt-2">
          <CustomLink href={`/workspace?workspace=${searchParams.get("workspace")}`} className="flex-1 text-center p-2 text-xs bg-container border border-border rounded text-red-500 cursor-pointer">취소</CustomLink>
          <button onClick={updateSubmit} className="flex-1 p-2 text-xs bg-container border border-border rounded text-red-500 cursor-pointer">확인</button>
        </div>
      </div>
    </div>
  )
}

export default TransfreAdmin