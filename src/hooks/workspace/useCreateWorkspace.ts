import { Workspace } from "@/entities/Workspace";
import { customFetch } from "@/utilities/customFetch";
import { useState } from "react"
import { useCustomRouter } from "../useCustomRouter";
import { toast } from "@/components/provider/ToastProvider";
import { ErrorResponse } from "@/types/ErrorResponse";

export const useCreateWorkspace = () => {
  const [title, setTitle] = useState("");
  const router = useCustomRouter();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const submit = async () => {
    if(title.trim().length <= 0) {
      toast.warning("워크스페이스 이름을 한글자 이상 입력해주세요.")
      return;
    }
    try{
      const { workspace } = await customFetch.post<{ workspace: Workspace }>("/api/workspace", { title });
      if(workspace) {
        router.replace(`/?workspace=${workspace.id}`);
      }
    }catch(e){
      toast.error((e as ErrorResponse).message);
    } 
  }

  return {
    title,
    handleTitle,
    submit
  }
}