import { toast } from "@/components/provider/ToastProvider";
import { Workspace } from "@/entities/Workspace";
import { ErrorResponse } from "@/types/ErrorResponse";
import { customFetch } from "@/utilities/customFetch"
import { useEffect, useState } from "react";
import { useCustomRouter } from "../useCustomRouter";

export const useGetWorkspace = (workspaceId: string | null) => {
  const [workspace, setWorkspace] = useState<Workspace>();
  const router = useCustomRouter();

  const get = async () => {
    if(!workspaceId) return;
    try{
      const { workspace } = await customFetch.get<{ workspace: Workspace }>(`/api/workspace/${workspaceId}`);
      if(workspace) {
        setWorkspace(workspace);
      }
    }catch(e){
      toast.error((e as ErrorResponse).message);
      router.replace(`/choose-workspace`);
    }
  }

  useEffect(() => {
    get();
  }, [workspaceId]);

  return workspace
}