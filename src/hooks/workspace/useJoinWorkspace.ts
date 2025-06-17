import { toast } from "@/components/provider/ToastProvider";
import { Workspace } from "@/entities/Workspace";
import { ErrorResponse } from "@/types/ErrorResponse";
import { customFetch } from "@/utilities/customFetch";
import { useState } from "react"
import { useCustomRouter } from "../useCustomRouter";

export const useJoinWorkspace = () => {
  const [code, setCode] = useState("");
  const router = useCustomRouter();

  const handleCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  }

  const join = async () => {
    if(code.trim().length <= 0) {
      toast.warning("참가코드를 입력해주세요.");
      return;
    }
    try{
      const { workspace } = await customFetch.post<{ workspace: Workspace }>("/api/join", { workspaceId: code });
      if(workspace && workspace.id) {
        toast.success("워크스페이스에 등록되었습니다.");
        router.replace(`/?workspace=${workspace.id}`);
      }
    }catch(e){
      toast.error((e as ErrorResponse).message);
    }
  } 

  return {
    code,
    handleCode,
    join
  }
}