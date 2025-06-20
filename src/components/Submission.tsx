"use client";

import { useSubmission } from "@/hooks/task/useSubmission";
import { SubmissionProps } from "@/types/props/SubmissionProps";
import { SubmittedFile } from "@/types/SubmittedFile";
import { getFileExtension } from "@/utilities/getFileExtension";
import { File, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { IMAGE_EXT } from "@/constants/exts";

const Submission = ({ taskId, submissions }: SubmissionProps) => {
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

  return (
    <div className="w-full max-w-80 bg-container border border-border rounded-xl p-2 flex flex-col gap-4 sticky top-4">
      <p>과제 제출하기</p>
      <div className="w-full min-h-24 flex flex-col gap-1">
        {files.length > 0 ? (
          files.map((item, idx) => {
            const extension = getFileExtension(item.url);
            const isImage = IMAGE_EXT.includes(extension);

            return (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 bg-container border border-border rounded-lg">
                {isImage ? (
                  <img
                    src={item.url}
                    alt={item.filename}
                    className="w-8 h-8 object-cover rounded"
                  />
                ) : (
                  <File className="w-8 h-8 text-gray-400" />
                )}
                <p className="text-xs">{item.filename}</p>
                <div className="flex-1" />
                {
                  !isSubmitted && (
                    <X
                      onClick={() => handleRemoveFile(item.url)}
                      strokeWidth={2}
                      className="text-red-500 cursor-pointer"
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
          !isSubmitted && (
            <button
              className="p-2 text-xs border border-primary bg-container rounded-lg text-center text-primary cursor-pointer"
              onClick={openFileSelector}>
              파일선택
            </button>
          )
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
              className={`p-2 text-xs rounded-lg text-center cursor-pointer ${ isSubmitted ? "border border-primary bg-container text-primary" : "bg-primary" } disabled:bg-container`}
              disabled={loading}
              onClick={submit}>
              {isSubmitted ? loading ? "취소중..." : "제출 취소" : loading ? "제출중..." : "제출하기"}
            </button>
          )
        }
        
      </div>
    </div>
  );
};

export default Submission;
