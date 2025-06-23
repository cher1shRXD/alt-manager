"use client";

import { ChevronUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import CustomLink from "./common/CustomLink";
import { EditReportProps } from "@/types/props/EditReportProps";
import { useEditReport } from "@/hooks/report/useEditReport";
import { useDeleteReport } from "@/hooks/report/useDeleteReport";

const EditReport = ({ initContent, reportId }: EditReportProps) => {
  const searchParams = useSearchParams();
  const { content, handleContent, submit, loading } = useEditReport(searchParams.get("workspace"), reportId, initContent);
  const { submit: deleteReport, loading: deleteLoading } = useDeleteReport(searchParams.get("workspace"), reportId);

  return (
    <div className="w-full flex items-center flex-col gap-4 pb-4 px-1">
      <div className="w-full max-w-140 h-200 bg-white relative p-10">
        <ChevronUp className="rotate-45 absolute bottom-6 left-5" color="#CCC" size={32} strokeWidth={1} />
        <ChevronUp className="rotate-315 absolute bottom-6 right-5" color="#CCC" size={32} strokeWidth={1} />
        <ChevronUp className="rotate-135 absolute top-6 left-5" color="#CCC" size={32} strokeWidth={1} />
        <ChevronUp className="rotate-225 absolute top-6 right-5" color="#CCC" size={32} strokeWidth={1} />
        <textarea className="w-full h-full outline-none text-black border-none resize-none text-xs lg:text-base" placeholder="이번주엔 무엇을 했나요?" onChange={handleContent} value={content} />
      </div>
      <div className="w-full max-w-140 flex gap-2 justify-end items-center">
        <CustomLink href={`/report?workspace=${searchParams.get("workspace")}`} className="p-2 text-xs bg-container border border-border rounded-lg text-center">성과보고서 목록으로</CustomLink>
        <button onClick={submit} className="p-2 text-xs bg-primary rounded-lg text-center disabled:bg-gray-300" disabled={loading || deleteLoading}>{loading ? "저장 중..." : "저장"}</button>
        <button onClick={deleteReport} className="p-2 text-xs bg-container border border-red-500 rounded-lg text-center text-red-500" disabled={loading || deleteLoading}>{deleteLoading ? "삭제 중..." : "삭제"}</button>
      </div>
    </div>
  )
}

export default EditReport