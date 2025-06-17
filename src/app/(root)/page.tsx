import CustomLink from "@/components/common/CustomLink";
import { getMe } from "@/services/getMe"
import { getNextMonday } from "@/utilities/getNextMondy";
import { redirect } from "next/navigation";

const Home = async ({ searchParams }: SearchParamProps) => {
  const user = await getMe();
  const keyword = await searchParams;

  if(!keyword.workspace) {
    redirect("/choose-workspace");
  }

  return (
    <div className="w-full grid grid-cols-16 grid-rows-[repeat(10,40px)] gap-4">
      <div className="col-[1/8] row-[1/6] bg-container border border-border rounded-lg">
        새로운 과제
      </div>
      <div className="col-[8/13] row-[1/6] bg-container border border-border rounded-lg flex flex-col gap-1 p-4">
        <div className="w-full flex flex-col gap-1 items-center my-10">
          <p className="text-sm">다음 성과보고서 제출까지</p>
          <p className="text-4xl text-primary font-semibold px-4 py-2 rounded-lg bg-bg">D-{getNextMonday().daysLeft}</p>
        </div>
        <div className="flex-1" />
        <p className="text-xs">마감일: <span className="text-sm text-primary font-semibold">{getNextMonday().nextMonday}</span></p>
        <CustomLink href={`/report/write?workspace=${keyword.workspace}`} className="p-2 text-xs bg-primary rounded-sm text-center">성과보고서 작성하기</CustomLink>
      </div>
      <div className="col-[13/-1] row-[1/7] bg-container border border-border rounded-lg p-4">
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>
      <div className="col-[1/13] row-[6/10] bg-container border border-border rounded-lg">
        총 과제 진척도
      </div>
    </div>
  )
}
export default Home