import CustomLink from "@/components/common/CustomLink";
import { getMe } from "@/services/getMe";
import { getMyReports, getReportsInWorkspace } from "@/services/reportService";
import { getWorkspace } from "@/services/workspaceService";
import { SearchParamProps } from "@/types/props/SearchParamProps";
import { getNextMonday } from "@/utilities/getNextMondy";
import { parseDate } from "@/utilities/parseDate";
import { redirect } from "next/navigation";

const Report = async ({ searchParams }: SearchParamProps) => {
  const keyword = await searchParams;
  const user = await getMe();

  if(!keyword.workspace) {
    redirect("/choose-workspace");
  }

  const workspace = await getWorkspace(keyword.workspace as string);
  const allReports = await getReportsInWorkspace(keyword.workspace as string);
  const myReports = await getMyReports(keyword.workspace as string);

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-xl">성과보고서 목록</p>
      <div className="w-full flex items-start flex-col lg:flex-row gap-4">
        <div className={`w-full lg:w-min lg:flex-1 flex flex-col ${user?.id === workspace.admin?.id ? "gap-8" : "gap-2"} `}>
          {
            user?.id === workspace.admin?.id ? (
              allReports.length > 0 ? allReports.reverse().map((item) => (
                <div className="w-full flex flex-col gap-2 bg-container border border-border rounded-xl p-2" key={item.user.id}>
                  <p>{item.user.name}</p>
                  <div className="w-full flex flex-col gap-1">
                    {
                      item.reports.reverse().map((report) => (
                        <CustomLink href={`/report/${report.id}?workspace=${keyword.workspace}`} className="w-full p-2 bg-container border border-border rounded-lg" key={report.id}>
                          <p>{parseDate(report.createdAt)} 성과보고서</p>
                          <p className="text-xs text-gray-500">글자수: {report.content?.trim().length}자</p>
                        </CustomLink>
                      ))
                    }
                  </div>
                </div>
              )) : <p className="text-gray-500 w-full text-center">작성된 성과보고서가 없습니다.</p>
            ) : (
              myReports.length > 0 ? myReports.reverse().map((item) => (
                <CustomLink href={`/report/${item.id}?workspace=${keyword.workspace}`} className="wfull flex flex-col gap-1 p-2 bg-container border border-border rounded-lg" key={item.id}>
                  <p>{parseDate(item.createdAt)} 성과보고서</p>
                  <p className="text-xs text-gray-500">글자수: {item.content?.trim().length}자</p>
                </CustomLink>
              )) : <p className="text-gray-500 w-full text-center">작성한 성과보고서가 없습니다.</p>
            )
          }
        </div>
        
        <div className="w-full lg:max-w-80 bg-container border border-border rounded-xl p-2 flex flex-col gap-1 sticky top-4">
          <div className="w-full flex flex-col gap-1 items-center my-8">
            <p className="text-sm">다음 성과보고서 제출까지</p>
            <p className="text-4xl text-primary font-semibold px-4 py-2 rounded-lg bg-bg">D-{getNextMonday().daysLeft}</p>
          </div>
          <p className="text-xs">마감일: <span className="text-sm text-primary font-semibold">{getNextMonday().nextMonday}</span></p>
          {
            workspace.admin?.id !== user?.id && <CustomLink href={`/report/write?workspace=${keyword.workspace}`} className="p-2 text-xs bg-primary rounded-lg text-center">성과보고서 작성하기</CustomLink>
          }
        </div>
      </div>
      
    </div>    
  )
}

export default Report