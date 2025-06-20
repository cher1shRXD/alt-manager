"use client";

import { CODE_EXT, IMAGE_EXT, VIDEO_EXT } from "@/constants/exts";
import { useDialogStore } from "@/stores/dialogStore";
import { SubmittedItemProps } from "@/types/props/SubmittedItemProps";
import { getFileExtension } from "@/utilities/getFileExtension";
import { parseDate } from "@/utilities/parseDate";
import { Code2, File, Video } from "lucide-react";

const SubmittedItem = ({ file }: SubmittedItemProps) => {
  const { setFile } = useDialogStore();
  const extension = getFileExtension(file.url || "");
  const isImage = IMAGE_EXT.includes(extension);
  const isVideo = VIDEO_EXT.includes(extension);
  const isCode = CODE_EXT.includes(extension);

  return (
    <div
      key={file.id}
      className="flex flex-col items-start gap-2 p-2 bg-container border border-border rounded-lg cursor-pointer"
      onClick={() => (file && file.url && file.originalName) && setFile({ url: file.url, name: file.originalName })}
    >
      <div className="flex-1" />
      {isImage ? (
        <img
          src={file.url}
          alt={file.originalName}
          className="w-full rounded"
        />
      ) : isVideo ? (
        <div className="w-full h-32 flex items-center justify-center">
          <Video className="w-8 h-8 text-gray-400" />
        </div>
      ) : isCode ? (
        <div className="w-full h-32 flex items-center justify-center">
          <Code2 className="w-8 h-8 text-gray-400" />
        </div>
      ) : (
        <div className="w-full h-32 flex items-center justify-center">
          <File className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <div className="flex-1" />
      <div className="flex flex-col gap-1">
        <p className="text-xs">{file.originalName}</p>
        <p className="text-xs text-gray-500">{parseDate(new Date(file.uploadedAt || "00-00-00"))}</p>
      </div>
    </div>
  );
};

export default SubmittedItem;
