import { ProgressBarProps } from "@/types/props/ProgressBarProps";

const ProgressBar = ({ value, max, label, completedLabel }: ProgressBarProps) => {
  return (
    <div className="w-full flex-1 flex flex-col">
      <div className="flex-1" />
      <div className="w-full bg-border rounded-full h-4 overflow-hidden">
        <div
          className="bg-primary h-4 rounded-full transition-all"
          style={{ width: `${max ? (value / max) * 100 : 0}%` }}
        />
      </div>
      <div className="flex-2" />
      <p className="mt-2 text-sm text-center">
        {completedLabel}
        <span className="text-primary font-semibold">{value}</span> / {max}
      </p>
    </div>
  );
};

export default ProgressBar;
