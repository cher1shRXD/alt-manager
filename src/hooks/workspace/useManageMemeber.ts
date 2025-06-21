import { Workspace } from "@/entities/Workspace";
import { customFetch } from "@/utilities/customFetch";
import { useCustomRouter } from "../useCustomRouter";
import { toast } from "@/components/provider/ToastProvider";
import { ErrorResponse } from "@/types/ErrorResponse";
import { useState } from "react";

export const useManageMember = (workspaceId: string | null, userId: string | null) => {
  const router = useCustomRouter();
  const [loading, setLoading] = useState(false);

  const updateSubmit = async () => {
    try{
      setLoading(true);
      const { workspace } = await customFetch.patch<{ workspace: Workspace }>(`/api/workspace/${workspaceId}/${userId}`, {});
      if(workspace) {
        router.replace(`/workspace?workspace=${workspace.id}`);
      }
    }catch(e){
      toast.error((e as ErrorResponse).message);
      router.back();
    }finally{
      setLoading(false);
    }
  }

  const setMentorSubmit = async () => {
    try{
      setLoading(true);
      const { workspace } = await customFetch.patch<{ workspace: Workspace }>(`/api/workspace/${workspaceId}/${userId}/mentor`, {});
      if(workspace) {
        router.replace(`/workspace?workspace=${workspace.id}`);
      }
    }catch(e){
      toast.error((e as ErrorResponse).message);
      router.back();
    } finally{
      setLoading(false);
    }
  }

  const unsetMentorSubmit = async () => {
    try{
      setLoading(true);
      const { workspace } = await customFetch.delete<{ workspace: Workspace }>(`/api/workspace/${workspaceId}/${userId}/mentor`);
      if(workspace) {
        router.replace(`/workspace?workspace=${workspace.id}`);
      }
    }catch(e){
      toast.error((e as ErrorResponse).message);
      router.back();
    }finally{
      setLoading(false);
    }
  }

  const deleteSubmit = async () => {
    try{
      setLoading(true);
      const { workspace } = await customFetch.delete<{ workspace: Workspace }>(`/api/workspace/${workspaceId}/${userId}`);
      if(workspace) {
        router.replace(`/workspace?workspace=${workspace.id}`);
      }
    }catch(e){
      toast.error((e as ErrorResponse).message);
      router.back();
    }finally{
      setLoading(false);
    }
  }

  return {
    deleteSubmit,
    updateSubmit,
    setMentorSubmit,
    unsetMentorSubmit,
    loading
  }
}