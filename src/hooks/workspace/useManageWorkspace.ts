import { toast } from "@/components/provider/ToastProvider";
import { Workspace } from "@/entities/Workspace";
import { customFetch } from "@/utilities/customFetch";
import { useState } from "react"
import { useCustomRouter } from "../useCustomRouter";
import { ErrorResponse } from "@/types/ErrorResponse";

export const useManageWorkspace = (workspaceId:string | null) => {
  const [newTitle, setNewTitle] = useState("");
  const router = useCustomRouter();

  const handleNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  }

  const updateSubmit = async () => {
    if(newTitle.trim().length <= 0) {
      toast.warning("워크스페이스 이름을 한글자 이상 입력해주세요.")
      return;
    }

    try{
      const { workspace } = await customFetch.patch<{ workspace: Workspace }>(`/api/workspace/${workspaceId}`, { title: newTitle });
      if(workspace) {
        router.replace(`/workspace?workspace=${workspace.id}`);
      }
    }catch(e){
      toast.error((e as ErrorResponse).message);
      router.replace(`/workspace?workspace=${workspaceId}`);
    } 
  }

  const deleteSubmit = async () => {
    try{
      const { workspace } = await customFetch.delete<{ workspace: Workspace }>(`/api/workspace/${workspaceId}`);
      if(workspace) {
        router.replace(`/choose-workspace`);
      }
    }catch(e){
      toast.error((e as ErrorResponse).message);
      router.replace(`/workspace?workspace=${workspaceId}`);
    } 
  }

  return {
    newTitle,
    handleNewTitle,
    updateSubmit,
    deleteSubmit
  }
}