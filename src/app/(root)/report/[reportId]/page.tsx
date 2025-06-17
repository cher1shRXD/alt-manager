import CustomLink from "@/components/common/CustomLink";
import { getReportDetail } from "@/services/reportService";
import { ChevronUp } from "lucide-react";
import { redirect } from "next/navigation";

const ReportDetail = async ({ params, searchParams }: { params: Promise<{ reportId: string }> } & SearchParamProps) => {
  const { reportId } = await params;
  const keyword = await searchParams;

  if(!keyword) {
    redirect("/choose-workspace");
  }

  const report = await getReportDetail(parseInt(reportId), keyword.workspace as string);


  return (
    <div className="w-full flex items-center flex-col gap-4 pb-4">
      <div className="w-full max-w-140 h-200 bg-white relative p-10">
        <ChevronUp className="rotate-45 absolute bottom-6 left-5" color="#CCC" size={32} strokeWidth={1} />
        <ChevronUp className="rotate-315 absolute bottom-6 right-5" color="#CCC" size={32} strokeWidth={1} />
        <ChevronUp className="rotate-135 absolute top-6 left-5" color="#CCC" size={32} strokeWidth={1} />
        <ChevronUp className="rotate-225 absolute top-6 right-5" color="#CCC" size={32} strokeWidth={1} />
        <textarea className="w-full h-full outline-none text-black border-none resize-none" value={report.content} readOnly />
      </div>
      <div className="w-full max-w-140 flex gap-2 justify-end items-center">
        <CustomLink href={`/report?workspace=${keyword.workspace}`} className="p-2 text-xs bg-container border border-border rounded-lg text-center">성과보고서 목록으로</CustomLink>
      </div>
    </div>
  )
}

export default ReportDetail