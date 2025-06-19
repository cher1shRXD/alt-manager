import { toast } from "@/components/provider/ToastProvider";
import { TaskSubmission } from "@/entities/TaskSubmission";
import { ErrorResponse } from "@/types/ErrorResponse";
import { SubmittedFile } from "@/types/SubmittedFile";
import { customFetch } from "@/utilities/customFetch";
import { useRef, useState } from "react"

export const useSubmission = (workspaceId: string | null, taskId: number, submitted: boolean, submittedFiles: SubmittedFile[], submittedId: number) => {
  const [files, setFiles] = useState<SubmittedFile[]>(submittedFiles);
  const [isSubmitted, setIsSubmitted] = useState(submitted);
  const inputRef = useRef<HTMLInputElement>(null);
  const [submissionId, setSubmissionId] = useState(submittedId);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files;
    if(fileArr) {
      const formData = new FormData();
      formData.append("file", fileArr[0]);
      const response = await fetch(`${process.env.NEXT_PUBLIC_UPLOAD_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const { url, filename } = await response.json();
      
      if(url) {
        setFiles(prev => [...prev, { filename, url }]);
      }
    }

    if (e.target) e.target.value = "";
  }

  const handleRemoveFile = async (url: string) => {
    await customFetch.delete(`${process.env.NEXT_PUBLIC_UPLOAD_API_URL}/upload/${url.replace(`${process.env.NEXT_PUBLIC_UPLOAD_API_URL}/uploads/`, "")}`);
    setFiles(prev => prev.filter(item => item.url !== url));
  }

  const openFileSelector = () => {
    inputRef.current?.click();
  }

  const submit = async () => {
    if(!workspaceId) return;
    if(files.length <= 0) {
      toast.warning("파일을 업로드 해주세요.");
      return;
    }
    try{
      if(!isSubmitted) {
        const { taskSubmission } = await customFetch.post<{ taskSubmission: TaskSubmission }>(`/api/task/${workspaceId}/${taskId}`, files);
        if(taskSubmission) {
          toast.success("제출 완료");
          setSubmissionId(taskSubmission.id || 0);
          setIsSubmitted(true);
        }
      }else{
        const { taskSubmission } = await customFetch.delete<{ taskSubmission: TaskSubmission }>(`/api/task/${workspaceId}/${taskId}/${submissionId}`);
        if(taskSubmission) {
          toast.success("제출 취소 완료");
          setIsSubmitted(false);
        }
      }
      
    }catch(e){
      toast.error((e as ErrorResponse).message)
    }
  }

  return {
    files,
    handleFiles,
    handleRemoveFile,
    openFileSelector,
    inputRef,
    submit,
    isSubmitted
  }
}