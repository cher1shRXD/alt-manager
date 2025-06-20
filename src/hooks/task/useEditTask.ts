import { TaskDTO } from "@/types/dto/TaskDTO";
import { useEffect, useState } from "react";
import { useCustomRouter } from "../useCustomRouter";
import { User } from "@/entities/User";
import { toast } from "@/components/provider/ToastProvider";
import { customFetch } from "@/utilities/customFetch";
import { Task } from "@/entities/Task";
import { ErrorResponse } from "@/types/ErrorResponse";

export const useEditTask = (workspaceId: string | null, taskId: number) => {
  const [taskData, setTaskData] = useState<TaskDTO>({ title: "", description: "", endDate: "", startDate: "", mentees: [] });
  const router = useCustomRouter();

  const handleData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;

    setTaskData(prev => ({ ...prev, [name]: value }));
  }

  const handleMentees = (user: User) => {
    setTaskData(prev => {
      const exists = prev.mentees?.some(m => m.id === user.id);
      return {
        ...prev,
        mentees: exists
          ? prev.mentees?.filter(m => m.id !== user.id)
          : [...(prev.mentees || []), user]
      };
    });
  };

  const getTask = async () => {
    try{
      const { task } = await customFetch.get<{ task: Task }>(`/api/task/${workspaceId}/${taskId}`);
      console.log(task);
      if(task) {
        setTaskData({ description: task.description || "", mentees: task.mentees || [], title: task.title || "", endDate: `${task.endDate}`.split("T")[0], startDate: `${task.startDate}`.split("T")[0]})
      }
    }catch(e){
      toast.error((e as ErrorResponse).message);
      router.back();
    }
  }

  useEffect(() => {
    if(workspaceId && taskId) {
      getTask();
    }
  }, [workspaceId, taskId]);

  const submit = async () => {
    if(!workspaceId) return;
    const { title, description, mentees, startDate, endDate } = taskData;
    if (
      !title || title.length < 1 ||
      !description || description.length < 1 ||
      !mentees || mentees.length < 1 ||
      !startDate || !endDate
    ) {
      toast.warning("모든 필드를 올바르게 입력해주세요.");
      return;
    }
    if (startDate > endDate) {
      toast.warning("시작일은 종료일보다 미래일 수 없습니다.");
      return;
    }
    
    try{
      const { task } = await customFetch.patch<{ task: Task }>(`/api/task/${workspaceId}/${taskId}`, taskData);
      if(task) {
        toast.success("과제가 수정되었습니다.");
        router.replace(`/task/${task.id}/mentors?workspace=${workspaceId}`);
      }
    }catch(e){
      toast.error((e as ErrorResponse).message)
    }
  } 

  return {
    taskData,
    handleData,
    submit,
    handleMentees
  }
}