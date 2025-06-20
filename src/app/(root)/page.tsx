import CustomLink from "@/components/common/CustomLink";
import Logout from "@/components/common/Logout";
import { User } from "@/entities/User";
import { getMe } from "@/services/getMe";
import { getTasks, getMyTasks } from "@/services/taskService";
import { getWorkspace } from "@/services/workspaceService";
import { SearchParamProps } from "@/types/props/SearchParamProps";
import { getNextMonday } from "@/utilities/getNextMondy";
import { redirect } from "next/navigation";

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

  console.log(allTasks);

  return (
    <div className="w-full grid grid-cols-16 grid-rows-[repeat(10,40px)] gap-4">
      <div className="col-[1/8] row-[1/6] bg-container border border-border rounded-lg p-4 flex flex-col gap-2">
        <p className="font-bold mb-2 text-lg">
          {isMentee ? "내 과제 현황" : "최근 출제된 과제"}
        </p>
        {(isMentee ? myTasks : allTasks).slice(0, 3).map((task) => {
          const mySubmissions = isMentee
            ? (task.mySubmissions as { isSubmitted: boolean }[] | undefined) ||
              []
            : [];
          let completedCount = 0;
          let menteeCount = 0;
          if (!isMentee) {
            menteeCount = task.mentees?.length || 0;
            completedCount = (task.mentees || []).filter((mentee: User) =>
              task.submissions?.some(
                (s: any) => s.user?.id === mentee.id && s.isSubmitted
              )
            ).length;
          }
          return (
            <CustomLink
              href={`/task/${task.id}/${
                isMentee ? "mentees" : "mentors"
              }?workspace=${workspace.id}`}
              key={task.id}
              className="border-b border-border pb-2 mb-2 last:border-0 last:mb-0">
              <p className="font-semibold">{task.title}</p>
              <div className="w-full flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {task.startDate?.toLocaleDateString()} ~{" "}
                  {task.endDate?.toLocaleDateString()}
                </p>
                {isMentee ? (
                  <p
                    className={`text-xs mt-1 ${
                      mySubmissions.some((s) => s.isSubmitted)
                        ? "text-green-600"
                        : "text-red-500"
                    }`}>
                    {mySubmissions.some((s) => s.isSubmitted)
                      ? "제출 완료"
                      : "미제출"}
                  </p>
                ) : (
                  <p className="text-xs mt-1 text-gray-700">
                    제출:{" "}
                    <span className="text-primary font-semibold">
                      {completedCount}
                    </span>{" "}
                    / {menteeCount}
                  </p>
                )}
              </div>
            </CustomLink>
          );
        })}
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
        <CustomLink
          href={`/report/write?workspace=${keyword.workspace}`}
          className="p-2 text-xs bg-primary rounded-sm text-center">
          성과보고서 작성하기
        </CustomLink>
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
          <div className="w-full flex-1 flex flex-col">
            <div className="flex-1" />
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-primary h-4 rounded-full transition-all"
                style={{
                  width: `${
                    myTasks.length ? (myCompleted / myTasks.length) * 100 : 0
                  }%`,
                }}
              />
            </div>
            <div className="flex-2" />
            <p className="mt-2 text-sm text-center">
              완료한 과제:{" "}
              <span className="text-primary font-semibold">{myCompleted}</span>{" "}
              / {myTasks.length}
            </p>
          </div>
        ) : (
          <div className="w-full flex-1 flex flex-col">
            <div className="flex-1" />
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-primary h-4 rounded-full transition-all"
                style={{
                  width: `${
                    totalPossibleSubmissions
                      ? (totalSubmissions / totalPossibleSubmissions) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
            <div className="flex-2" />
            <p className="mt-2 text-sm text-center">
              전체 제출 수:{" "}
              <span className="text-primary font-semibold">
                {totalSubmissions}
              </span>{" "}
              / {totalPossibleSubmissions}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
