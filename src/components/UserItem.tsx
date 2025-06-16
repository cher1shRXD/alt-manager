"use client";

import { UserItemProps } from "@/types/props/UserItemProps";

const UserItem = ({ data, adminId, currentUserId }: UserItemProps) => {
  return (
    <div className="w-full flex items-center bg-container p-2 rounded-lg border border-border">
      <div className="flex-1 flex flex-col gap-1 ">
        <p className="font-anton tracking-[1.6]">{data.name}</p>
        <p className="text-xs text-gray-500">{data.email}</p>
      </div>
      <div className="flex items-center gap-2">
        {
          (adminId !== currentUserId || currentUserId !== data.id) && <button className="p-2 text-xs bg-container border border-border rounded text-red-500 cursor-pointer">퇴출</button>
        }
        {
          adminId !== currentUserId && <button className="p-2 text-xs bg-container border border-border rounded text-red-500 cursor-pointer">관리자로 임명</button>
        }
      </div>
    </div>
  )
}

export default UserItem