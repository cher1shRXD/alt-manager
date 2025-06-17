"use client";

import { UserItemProps } from "@/types/props/UserItemProps";
import CustomLink from "./common/CustomLink";

const UserItem = ({ data, adminId, currentUserId, workspaceId }: UserItemProps) => {
  return (
    <div className="w-full flex items-center bg-container p-2 rounded-lg border border-border">
      <div className="flex-1 flex flex-col gap-1 ">
        <p className="font-anton tracking-[1.6]">{data.name}</p>
        <p className="text-xs text-gray-500">{data.email}</p>
      </div>
      <div className="flex items-center gap-2">
        {
          (adminId === currentUserId && currentUserId !== data.id) && <CustomLink href={`/remove-member?workspace=${workspaceId}&userId=${data.id}`} className="p-2 text-xs bg-container border border-border rounded text-red-500 cursor-pointer">퇴출</CustomLink>
        }
        {
          (adminId === currentUserId && currentUserId !== data.id) && <CustomLink href={`/transfer-admin?workspace=${workspaceId}&userId=${data.id}`} className="p-2 text-xs bg-container border border-border rounded text-red-500 cursor-pointer">관리자로 임명</CustomLink>
        }
      </div>
    </div>
  )
}

export default UserItem