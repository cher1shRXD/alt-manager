import CustomLink from "@/components/common/CustomLink";
import { getNextMonday } from "@/utilities/getNextMondy";
import { redirect } from "next/navigation";

const Report = async ({ searchParams }: SearchParamProps) => {
  const keyword = await searchParams;

  if(!keyword.workspace) {
    redirect("/choose-workspace");
  }
  return (
    <div className="w-full flex flex-col gap-8">
      <p className="text-xl">성과보고서 목록</p>
      <div className="w-full flex items-start gap-4">
        <div className="flex-1 flex flex-col gap-8">
          <div className="w-full flex flex-col gap-2 bg-container border border-border rounded-xl p-2">
            <p>홍길동</p>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>

            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-container border border-border rounded-xl p-2">
            <p>홍길동</p>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>

            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-container border border-border rounded-xl p-2">
            <p>홍길동</p>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>

            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-container border border-border rounded-xl p-2">
            <p>홍길동</p>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>

            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-container border border-border rounded-xl p-2">
            <p>홍길동</p>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>

            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-container border border-border rounded-xl p-2">
            <p>홍길동</p>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>

            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-container border border-border rounded-xl p-2">
            <p>홍길동</p>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>

            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-container border border-border rounded-xl p-2">
            <p>홍길동</p>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>

            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-container border border-border rounded-xl p-2">
            <p>홍길동</p>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>

            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-container border border-border rounded-xl p-2">
            <p>홍길동</p>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>

            </div>
          </div>
          <div className="w-full flex flex-col gap-2 bg-container border border-border rounded-xl p-2">
            <p>홍길동</p>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>
              <div className="w-full h-14 bg-container border border-border rounded-lg"></div>

            </div>
          </div>
        </div>
        
        <div className="w-full max-w-80 bg-container border border-border rounded-xl p-2 flex flex-col gap-1 sticky top-4">
          <div className="w-full flex flex-col gap-1 items-center my-8">
            <p className="text-sm">다음 성과보고서 제출까지</p>
            <p className="text-4xl text-primary font-semibold px-4 py-2 rounded-lg bg-bg">D-{getNextMonday().daysLeft}</p>
          </div>
          <p className="text-xs">마감일: <span className="text-sm text-primary font-semibold">{getNextMonday().nextMonday}</span></p>
          <CustomLink href={`/write-report?workspace=${keyword.workspace}`} className="p-2 text-xs bg-primary rounded-lg text-center">성과보고서 작성하기</CustomLink>
          
        </div>
      </div>
      
    </div>    
  )
}

export default Report