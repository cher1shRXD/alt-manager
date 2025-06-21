"use client";

import { UserItemProps } from "@/types/props/UserItemProps";
import CustomLink from "./common/CustomLink";

const UserItem = ({ data, adminId, currentUserId, workspaceId, isMentor }: UserItemProps) => {
  return (
    <div className="w-full flex items-center bg-container p-2 rounded-lg border border-border">
      <div className="flex-1 flex flex-col gap-1 ">
        <p>{data.name}</p>
        <p className="text-xs text-gray-500">{data.email}</p>
      </div>
      {
        (adminId === currentUserId && currentUserId !== data.id) && (
          <div className="flex items-center gap-2">
            <CustomLink href={`/remove-member?workspace=${workspaceId}&userId=${data.id}`} className="p-2 text-xs bg-container border border-border rounded text-red-500">퇴출</CustomLink>
            <CustomLink href={`/${isMentor ? "unset" : "set"}-mentor?workspace=${workspaceId}&userId=${data.id}`} className="p-2 text-xs bg-container border border-border rounded text-red-500">{isMentor ? "멘토 박탈" : "멘토로 등록"}</CustomLink>
            <CustomLink href={`/transfer-admin?workspace=${workspaceId}&userId=${data.id}`} className="p-2 text-xs bg-container border border-border rounded text-red-500">관리자 위임</CustomLink>
          </div>
        )
      }
      
    </div>
  )
}

export default UserItem