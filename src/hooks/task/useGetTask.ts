import { toast } from "@/components/provider/ToastProvider";
import { Task } from "@/entities/Task";
import { ErrorResponse } from "@/types/ErrorResponse";
import { customFetch } from "@/utilities/customFetch";
import { useCustomRouter } from "../useCustomRouter";
import { useEffect, useState } from "react";

export const useGetTask = (workspaceId: string | null, taskId: number) => {
  const router = useCustomRouter();
  const [task, setTask] = useState<Task>();

  const get = async () => {
    if(!taskId) router.back();
    try{
      const { task } = await customFetch.get<{ task: Task }>(`/api/task/${workspaceId}/${taskId}`);
      if(task) {
        setTask(task);
      }
    }catch(e){
      toast.success((e as ErrorResponse).message);
      router.back();
    }
  }

  useEffect(() => {
    get();
  }, [workspaceId, taskId]);

  return task;
}