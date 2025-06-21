import { toast } from "@/components/provider/ToastProvider";
import { Workspace } from "@/entities/Workspace";
import { ErrorResponse } from "@/types/ErrorResponse";
import { customFetch } from "@/utilities/customFetch";
import { useState } from "react"
import { useCustomRouter } from "../useCustomRouter";

export const useJoinWorkspace = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useCustomRouter();

  const handleCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  }

  const join = async () => {
    if(loading) return;
    setLoading(true);
    if(code.trim().length <= 0) {
      toast.warning("참가코드를 입력해주세요.");
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  } 

  return {
    code,
    handleCode,
    join,
    loading
  }
}