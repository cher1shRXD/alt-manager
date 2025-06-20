"use client";

import React, { useEffect, useRef } from "react";
import FilePreview from "./FilePreview";
import { useDialogStore } from "@/stores/dialogStore";

const Dialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { file, setFile } = useDialogStore();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (file && !dialog.open) {
      dialog.showModal();
    } else if (!file && dialog.open) {
      dialog.close();
    }

    const handleClose = () => setFile(null);
    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, [file]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFile(null);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/50 rounded h-[700px] m-auto outline-none bg-bg"
      onClick={(e) => {
        const dialog = dialogRef.current;
        if (dialog && e.target === dialog) {
          dialog.close();
        }
      }}
    >
      {
        file && (
          <FilePreview url={file.url} name={file.name} />
        )
      }
    </dialog>
  );
}

export default Dialog