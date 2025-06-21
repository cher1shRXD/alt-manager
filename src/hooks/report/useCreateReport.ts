import { Report } from "@/entities/Report";
import { customFetch } from "@/utilities/customFetch";
import { useState } from "react"
import { useCustomRouter } from "../useCustomRouter";
import { toast } from "@/components/provider/ToastProvider";
import { ErrorResponse } from "@/types/ErrorResponse";

export const useCreateReport = (workspaceId: string | null) => {
  const [content, setContent] = useState("");
  const router = useCustomRouter();
  const [loading, setLoading] = useState(false);

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const submit = async () => {
    if(loading) return;
    try{
      setLoading(true);
      const { report } = await customFetch.post<{ report: Report }>(`/api/workspace/${workspaceId}/report`, { content });
      if(report) {
        toast.success("보고서 저정완료")
        router.replace(`/report?workspace=${workspaceId}`);
      }
    }catch(e){
      toast.error((e as ErrorResponse).message);
    }finally{
      setLoading(false);
    }
  }

  return {
    content,
    handleContent,
    submit,
    loading
  }
}