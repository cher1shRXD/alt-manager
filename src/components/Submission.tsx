"use client";

import { useSubmission } from "@/hooks/task/useSubmission";
import { SubmissionProps } from "@/types/props/SubmissionProps";
import { SubmittedFile } from "@/types/SubmittedFile";
import { getFileExtension } from "@/utilities/getFileExtension";
import { Code2, File, Image, Video, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { CODE_EXT, IMAGE_EXT, VIDEO_EXT } from "@/constants/exts";
import { useDialogStore } from "@/stores/dialogStore";

const Submission = ({ taskId, submissions, isInDeadline }: SubmissionProps) => {
  const searchParams = useSearchParams();
  const submitted = submissions.length > 0 ? !!submissions[submissions.length - 1].isSubmitted : false;
  const submittedFiles: SubmittedFile[] = submissions.length > 0 ? submissions[submissions.length - 1].files?.map(item => ({ url: item.url || "", filename: item.originalName || "" })) || [] : [];
  const submissionId = submissions.length > 0 ? submissions[submissions.length - 1].id || 0 : 0;
  const {
    files,
    handleFiles,
    handleRemoveFile,
    inputRef,
    openFileSelector,
    submit,
    isSubmitted,
    loading
  } = useSubmission(searchParams.get("workspace"), taskId, submitted, submittedFiles, submissionId);
  const { setFile } = useDialogStore();
  

  return (
    <div className="w-full max-w-80 bg-container border border-border rounded-xl p-2 flex flex-col gap-4 sticky top-4">
      <p>과제 제출하기</p>
      <div className="w-full min-h-24 flex flex-col gap-1">
        {files.length > 0 ? (
          files.map((item, idx) => {
            const extension = getFileExtension(item.url);
            const isImage = IMAGE_EXT.includes(extension);
            const isVideo = VIDEO_EXT.includes(extension);
            const isCode = CODE_EXT.includes(extension);
            
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-2 bg-container border border-border rounded-lg"
                onClick={() => setFile({ url: item.url, name: item.filename })}
              >
                {isImage ? (
                  <Image className="text-gray-400" size={36} />
                ) : isVideo ? (
                  <Video className="text-gray-400" size={36} />
                ) : isCode ? (
                  <Code2 className="text-gray-400" size={36} />
                ) : (
                  <File className="text-gray-400" size={36} />
                )}
                <p className="text-xs">{item.filename}</p>
                <div className="flex-1" />
                {
                  !isSubmitted && (
                    <X
                      onClick={() => handleRemoveFile(item.url)}
                      strokeWidth={2}
                      className="text-red-500 curosr-pointer"
                      size={20}
                    />
                  )
                }
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm">제출한 파일이 없습니다.</p>
        )}
      </div>
      <div className="w-full flex flex-col gap-2">
        {
          isInDeadline ? !isSubmitted && (
            <button
              className="p-2 text-xs border border-primary bg-container rounded-lg text-center text-primary"
              onClick={openFileSelector}>
              파일선택
            </button>
          ) : <p className="p-2 text-xs border border-border bg-container rounded-lg text-center text-border">제출 할 수 없는 기간입니다.</p>
        }
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleFiles}
        />
        {
          files.length > 0 && (
            <button
              className={`p-2 text-xs rounded-lg text-center ${ isSubmitted ? "border border-primary bg-container text-primary" : "bg-primary" } disabled:bg-container`}
              disabled={loading}
              onClick={submit}>
              {isSubmitted ? loading ? "취소 중..." : "제출 취소" : loading ? "제출 중..." : "제출하기"}
            </button>
          )
        }
        
      </div>
    </div>
  );
};

export default Submission;
