import { FilePreviewProps } from "@/types/props/FilePreviewProps";
import { create } from "zustand";

interface DialogStore {
  file: FilePreviewProps | null,
  setFile: (file: FilePreviewProps | null) => void;
}

export const useDialogStore = create<DialogStore>(set => ({
  file: null,
  setFile: (file) => set({ file })
}));