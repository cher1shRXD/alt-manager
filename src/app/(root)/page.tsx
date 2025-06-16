import { getMe } from "@/services/getMe"
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
      <div className="col-[8/13] row-[1/6] bg-container border border-border rounded-lg">
        성과 보고 마감일
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