import { toast } from "@/components/provider/ToastProvider";
import { ErrorResponse } from "@/types/ErrorResponse";
import { customFetch } from "@/utilities/customFetch";
import { useState } from "react";
import { useCustomRouter } from "../useCustomRouter";

export const useDeleteReport = (workspaceId: string | null, reportId: number) => {
  const [loading, setLoading] = useState(false);
  const router = useCustomRouter();

  const submit = async () => {
    if(loading) return;
    try{
      setLoading(true);
      const { report } = await customFetch.delete<{ report: Report }>(`/api/report/${workspaceId}/${reportId}`);
      if(report) {
        toast.success("보고서 삭제 완료")
        router.replace(`/report?workspace=${workspaceId}`);
      }
    }catch(e){
      toast.error((e as ErrorResponse).message);
      setLoading(false);
    }
  }

  return {
    submit,
    loading
  }
}