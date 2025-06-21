import { Task } from "@/entities/Task";
import { customFetch } from "@/utilities/customFetch";
import { useCustomRouter } from "../useCustomRouter";
import { toast } from "@/components/provider/ToastProvider";
import { ErrorResponse } from "@/types/ErrorResponse";
import { useState } from "react";

export const useDeleteTask = (workspaceId: string | null, taskId: number) => {
  const router = useCustomRouter();
  const [loading, setLoading] = useState(false);

  const deleteSubmit = async () => {
    if (loading) return;
    setLoading(true);
    try{
      const { task } = await customFetch.delete<{ task: Task }>(`/api/task/${workspaceId}/${taskId}`);
      if(task) {
        router.replace(`/task?workspace=${workspaceId}`);
        toast.success("과제가 삭제되었습니다.");
      }
    }catch(e){
      toast.error((e as ErrorResponse).message);
      router.back();
    } finally {
      setLoading(false);
    }
  }

  return {
    deleteSubmit,
    loading
  };
}