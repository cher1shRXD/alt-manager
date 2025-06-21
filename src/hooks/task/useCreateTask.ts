import { toast } from "@/components/provider/ToastProvider";
import { Task } from "@/entities/Task";
import { User } from "@/entities/User";
import { TaskDTO } from "@/types/dto/TaskDTO";
import { ErrorResponse } from "@/types/ErrorResponse";
import { customFetch } from "@/utilities/customFetch";
import { useState } from "react"
import { useCustomRouter } from "../useCustomRouter";

export const useCreateTask = (workspaceId: string | null) => {
  const [taskData, setTaskData] = useState<TaskDTO>({ title: "", description: "", endDate: "", startDate: "", mentees: [] });
  const router = useCustomRouter();
  const [loading, setLoading] = useState(false);

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

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if(value !== "placeholder") {
      handleMentees(JSON.parse(value));
    }
    e.target.value = "placeholder"
  }

  const submit = async () => {
    if(!workspaceId || loading) return;
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
      setLoading(true);
      const { task } = await customFetch.post<{ task: Task }>(`/api/task/${workspaceId}`, taskData);
      if(task) {
        toast.success("과제가 생성되었습니다.");
        router.replace(`/task/${task.id}/mentors?workspace=${workspaceId}`);
      }
    }catch(e){
      toast.error((e as ErrorResponse).message)
    } finally {
      setLoading(false);
    }
  } 

  return {
    taskData,
    handleData,
    submit,
    handleMentees,
    handleSelect,
    loading
  }
}