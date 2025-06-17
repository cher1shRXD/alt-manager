"use client"

import CustomLink from "@/components/common/CustomLink"
import { useCreateReport } from "@/hooks/report/useCreateReport"
import { ChevronUp } from "lucide-react"
import { useSearchParams } from "next/navigation"

const WriteReport = () => {
  const searchParams = useSearchParams();
  const { content, handleContent, submit } = useCreateReport(searchParams.get("workspace"));

  return (
    <div className="w-full flex items-center flex-col gap-4 pb-4">
      <div className="w-full max-w-140 h-200 bg-white relative p-10">
        <ChevronUp className="rotate-45 absolute bottom-6 left-5" color="#CCC" size={32} strokeWidth={1} />
        <ChevronUp className="rotate-315 absolute bottom-6 right-5" color="#CCC" size={32} strokeWidth={1} />
        <ChevronUp className="rotate-135 absolute top-6 left-5" color="#CCC" size={32} strokeWidth={1} />
        <ChevronUp className="rotate-225 absolute top-6 right-5" color="#CCC" size={32} strokeWidth={1} />
        <textarea className="w-full h-full outline-none text-black border-none resize-none" placeholder="이번주엔 무엇을 했나요?" onChange={handleContent} value={content} />
      </div>
      <div className="w-full max-w-140 flex gap-2 justify-end items-center">
        <CustomLink href={`/report?workspace=${searchParams.get("workspace")}`} className="p-2 text-xs bg-container border border-border rounded-lg text-center text-red-500">성과보고서 목록으로</CustomLink>
        <button onClick={submit} className="p-2 text-xs bg-primary rounded-lg text-center">작성완료</button>
      </div>
    </div>
  )
}

export default WriteReport