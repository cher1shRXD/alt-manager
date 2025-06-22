import CustomLink from "@/components/common/CustomLink";
import { Task } from "@/entities/Task";
import { TaskMentee } from "@/entities/TaskMentee";
import { TaskSubmission } from "@/entities/TaskSubmission";
import { User } from "@/entities/User";
import { TaskListItemProps } from "@/types/props/TaskListItemProps";

const TaskListItem = ({ task, workspaceId, isMentee }: TaskListItemProps) => {
  const mySubmissions = isMentee
    ? ((task as Task & { mySubmissions: TaskSubmission[] }).mySubmissions as { isSubmitted: boolean }[] | undefined) || []
    : [];
  let completedCount = 0;
  let menteeCount = 0;
  if (!isMentee) {
    const mentees = (task.mentees || []) as TaskMentee[];
    menteeCount = mentees.length;
    completedCount = mentees.filter((tm) => {
      const mentee = tm.mentee as User | undefined;
      if (!mentee) return false;
      return task.submissions?.some(
        (s: TaskSubmission) => s.user?.id === mentee.id && s.isSubmitted
      );
    }).length;
  }
  return (
    <CustomLink
      href={`/task/${task.id}/${isMentee ? "mentees" : "mentors"}?workspace=${workspaceId}`}
      key={task.id}
      className="border-b border-border pb-2 mb-2 last:border-0 last:mb-0"
    >
      <p className="font-semibold text-sm lg:text-base mb-1 text-nowrap overflow-hidden whitespace-nowrap text-ellipsis">{task.title}</p>
      <div className="w-full flex items-center justify-between">
        <p className="text-xs text-gray-500 text-nowrap overflow-hidden whitespace-nowrap text-ellipsis">
          {task.startDate?.toLocaleDateString()} ~ {task.endDate?.toLocaleDateString()}
        </p>
        {isMentee ? (
          <p
            className={`text-xs mt-1 text-nowrap ${
              mySubmissions.some((s) => s.isSubmitted)
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {mySubmissions.some((s) => s.isSubmitted) ? "제출 완료" : "미제출"}
          </p>
        ) : (
          <p className="text-xs mt-1 text-gray-700 text-nowrap">
            제출: <span className="text-primary font-semibold">{completedCount}</span> / {menteeCount}
          </p>
        )}
      </div>
    </CustomLink>
  );
};

export default TaskListItem;
