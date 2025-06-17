"use client"

import CustomLink from "@/components/common/CustomLink"
import { useJoinWorkspace } from "@/hooks/workspace/useJoinWorkspace"

const JoinWorkspace = () => {
  const { code, handleCode, join } = useJoinWorkspace();
  
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 bg-container border border-border p-4 rounded-lg">
        <p className="text-lg text-semibold text-center">워크스페이스 참가</p>
        <input type="text" className="w-full min-w-56 p-2 text-sm rounded-lg bg-container border border-border outline-none mt-1" onChange={handleCode} value={code} placeholder="참가코드" />
        <div className="w-full flex items-center gap-2 mt-2">
          <CustomLink href={`/choose-workspace`} className="flex-1 text-center p-2 text-xs bg-container border border-border rounded text-red-500 cursor-pointer">취소</CustomLink>
          <button onClick={join} className="flex-1 p-2 text-xs bg-primary rounded cursor-pointer">참가</button>
        </div>
      </div>
    </div>
  )
}

export default JoinWorkspace