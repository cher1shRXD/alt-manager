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
    try{
      const data = await customFetch.post<{ workspace: Workspace }>("/api/workspace", { title });
      if(data && data.workspace.id) {
        router.replace(`/?workspace=${data.workspace.id}`);
      }
    }catch(e){
      console.log(e);
      toast.error((e as ErrorResponse).message);
    } 
  }

  return {
    title,
    handleTitle,
    submit
  }
}