import CustomLink from "@/components/common/CustomLink";
import Logout from "@/components/common/Logout";
import { getMe } from "@/services/getMe";
import { getTasks, getMyTasks } from "@/services/taskService";
import { getWorkspace } from "@/services/workspaceService";
import { SearchParamProps } from "@/types/props/SearchParamProps";
import { getNextMonday } from "@/utilities/getNextMondy";
import { redirect } from "next/navigation";
import TaskListItem from "@/components/TaskListItem";
import ProgressBar from "@/components/ProgressBar";

const Home = async ({ searchParams }: SearchParamProps) => {
  const user = await getMe();
  const keyword = await searchParams;

  if (!keyword.workspace) {
    redirect("/choose-workspace");
  }

  const workspace = await getWorkspace(keyword.workspace as string);
  const isAdmin = workspace.admin?.id === user?.id;
  const isMentor = workspace.mentors?.some((m) => m.id === user?.id);
  const isMentee = !isAdmin && !isMentor;

  const allTasks = isMentee ? [] : await getTasks(keyword.workspace as string);
  const myTasks = isMentee ? await getMyTasks(keyword.workspace as string) : [];

  let totalSubmissions = 0;
  let totalPossibleSubmissions = 0;
  if (!isMentee) {
    for (const task of allTasks) {
      totalSubmissions += task.submissions?.length || 0;
      totalPossibleSubmissions += task.mentees?.length || 0;
    }
  }

  let myCompleted = 0;
  if (isMentee) {
    myCompleted = myTasks.filter((task) =>
      (task.mySubmissions as { isSubmitted: boolean }[] | undefined)?.some(
        (s) => s.isSubmitted
      )
    ).length;
  }


  return (
    <div className="w-full flex flex-col lg:grid lg:grid-cols-16 lg:grid-rows-[repeat(10,40px)] gap-4">
      <div className="col-[1/8] row-[1/6] bg-container border border-border rounded-lg p-4 flex flex-col gap-2">
        <p className="font-bold mb-2 text-lg">
          {isMentee ? "내 과제 현황" : "최근 출제된 과제"}
        </p>
        {(isMentee ? myTasks : allTasks).slice(0, 3).map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            workspaceId={workspace.id ?? ""}
            isMentee={isMentee}
          />
        ))}
      </div>
      <div className="col-[8/13] row-[1/6] bg-container border border-border rounded-lg flex flex-col gap-1 p-4">
        <div className="w-full flex flex-col gap-1 items-center my-10">
          <p className="text-sm">다음 성과보고서 제출까지</p>
          <p className="text-4xl text-primary font-semibold px-4 py-2 rounded-lg bg-bg">
            D-{getNextMonday().daysLeft}
          </p>
        </div>
        <div className="flex-1" />
        <p className="text-xs">
          마감일:{" "}
          <span className="text-sm text-primary font-semibold">
            {getNextMonday().nextMonday}
          </span>
        </p>
        {
          !isAdmin && (
            <CustomLink
              href={`/report/write?workspace=${keyword.workspace}`}
              className="p-2 text-xs bg-primary rounded-sm text-center">
              성과보고서 작성하기
            </CustomLink>
          )
        }
      </div>
      <div className="col-[13/-1] row-[1/7] bg-container border border-border rounded-lg p-4 flex flex-col gap-2 text-sm">
        <p className="font-bold mb-2 text-lg">내 정보</p>
        <p>이름: {user?.name}</p>
        <p>이메일: {user?.email}</p>
        <p>역할: {isAdmin ? "관리자" : isMentor ? "멘토" : "멘티"}</p>
        <div className="flex-1" />
        <Logout />
      </div>
      <div className="col-[1/13] row-[6/10] bg-container border border-border rounded-lg p-4 flex flex-col gap-4">
        <p className="font-bold mb-2 text-lg">
          {isMentee ? "내 과제 진척도" : "전체 과제 진척도"}
        </p>
        {isMentee ? (
          <ProgressBar
            value={myCompleted}
            max={myTasks.length}
            completedLabel="완료한 과제: "
          />
        ) : (
          <ProgressBar
            value={totalSubmissions}
            max={totalPossibleSubmissions}
            completedLabel="전체 제출 수: "
          />
        )}
      </div>
    </div>
  );
};
export default Home;
