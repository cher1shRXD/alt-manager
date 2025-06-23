import { useState } from "react";
import { customFetch } from "@/utilities/customFetch";
import { toast } from "@/components/provider/ToastProvider";
import { ErrorResponse } from "@/types/ErrorResponse";

export const useEditReport = (workspaceId: string | null, reportId: number, initContent: string) => {
  const [content, setContent] = useState(initContent);
  const [loading, setLoading] = useState(false);

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const submit = async () => {
    if(loading) return;
    try{
      setLoading(true);
      const { report } = await customFetch.patch<{ report: Report }>(`/api/report/${workspaceId}/${reportId}`, { content });
      if(report) {
        toast.success("보고서 저정완료")
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