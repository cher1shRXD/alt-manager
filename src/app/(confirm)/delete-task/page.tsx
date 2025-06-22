"use client";

import CustomLink from "@/components/common/CustomLink";
import { useDeleteTask } from "@/hooks/task/useDeleteTask";
import { useGetTask } from "@/hooks/task/useGetTask";
import { useSearchParams } from "next/navigation";

const DeleteTask = () => {
  const searchParams = useSearchParams();
  const task = useGetTask(searchParams.get("workspace"), parseInt(searchParams.get("taskId") || "0"));
  const { deleteSubmit, loading } = useDeleteTask(searchParams.get("workspace"), parseInt(searchParams.get("taskId") || "0"));

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="lg:min-w-80 flex flex-col items-center justify-center gap-2 bg-container border border-border p-4 rounded-lg">
        <p className="xl:text-3xl ">{task?.title}</p>
        <p className="text-lg text-semibold text-center">과제를 삭제하시겠습니까?</p>
        <p className="text-xs text-primary">이 작업은 되돌릴 수 없습니다.</p>
        <div className="w-full flex items-center gap-2 mt-2">
          <CustomLink href={`/task/${searchParams.get("taskId")}/mentors?workspace=${searchParams.get("workspace")}`} className="flex-1 text-center p-2 text-xs bg-container border border-border rounded text-red-500">취소</CustomLink>
          <button onClick={deleteSubmit} className="flex-1 p-2 text-xs bg-container border border-border rounded text-red-500 disabled:bg-gray-300" disabled={loading}>{loading ? "삭제 중..." : "삭제"}</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteTask