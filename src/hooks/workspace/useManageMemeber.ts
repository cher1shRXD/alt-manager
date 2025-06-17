import { Workspace } from "@/entities/Workspace";
import { customFetch } from "@/utilities/customFetch";
import { useCustomRouter } from "../useCustomRouter";
import { toast } from "@/components/provider/ToastProvider";
import { ErrorResponse } from "@/types/ErrorResponse";

export const useManageMember = (workspaceId: string | null, userId: string | null) => {
  const router = useCustomRouter();

  const updateSubmit = async () => {
    try{
      const { workspace } = await customFetch.patch<{ workspace: Workspace }>(`/api/workspace/${workspaceId}/${userId}`, {});
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
      const { workspace } = await customFetch.delete<{ workspace: Workspace }>(`/api/workspace/${workspaceId}/${userId}`);
      if(workspace) {
        router.replace(`/workspace?workspace=${workspace.id}`);
      }
    }catch(e){
      toast.error((e as ErrorResponse).message);
      router.replace(`/workspace?workspace=${workspaceId}`);
    } 
  }

  return {
    deleteSubmit,
    updateSubmit
  }
}