"use client";

import { useCreateWorkspace } from "@/hooks/workspace/useCreateWorkspace";

const MakeWorkspace = () => {
  const { title, handleTitle, submit } = useCreateWorkspace();

  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <form className="w-full max-w-120 h-56 bg-container border border-border rounded-xl flex flex-col items-center px-4" onSubmit={(e) => {e.preventDefault(); submit();}}>
        <p className="w-full py-3 border-b border-border text-center">새 워크스페이스 생성</p>
        <div className="w-full flex-1 flex flex-col py-3">
          <p className="text-sm">워크스페이스 이름</p>
          <input type="text" className="w-full p-2 text-sm rounded-lg bg-container border border-border outline-none mt-1" onChange={handleTitle} value={title} />
        </div>
        <button type="submit" className="w-full py-2 text-sm bg-primary rounded-lg text-center mb-4 cursor-pointer">
          워크스페이스 생성
        </button>
      </form>
    </div>
  )
}

export default MakeWorkspace