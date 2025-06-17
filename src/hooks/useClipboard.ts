import { toast } from "@/components/provider/ToastProvider";

export const useClipboard = () => {
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("클립보드에 복사되었습니다.");
    } catch {
      toast.error("복사 실패");
    }
  };

  return { copy };
};