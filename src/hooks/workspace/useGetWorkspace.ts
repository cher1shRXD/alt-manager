import { Workspace } from "@/entities/Workspace";
import { customFetch } from "@/utilities/customFetch"
import { useEffect, useState } from "react";

export const useGetWorkspace = (workspaceId: string | null) => {
  const [workspaceName, setWorkspaceName] = useState("");

  const get = async () => {
    if(!workspaceId) return;
    const { workspace } = await customFetch.get<{ workspace: Workspace }>(`/api/workspace/${workspaceId}`);
    if(workspace) {
      setWorkspaceName(workspace.name || "");
    }
  }

  useEffect(() => {
    get();
  }, [workspaceId]);

  return workspaceName
}