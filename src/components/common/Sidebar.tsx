import {
  ArrowLeftRight,
  ClipboardPenLine,
  Home,
  Scroll,
  UsersRound,
} from "lucide-react";
import NavigationItem from "./NavigationItem";
import CustomLink from "./CustomLink";
import { isSessionExist } from "@/utilities/isSessionExist";
import { redirect } from "next/navigation";
import CurrentWorkspace from "../CurrentWorkspace";

const Sidebar = async () => {
  const session = await isSessionExist();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="w-[var(--sidebar-width)] fixed bottom-2 left-2 z-50 xl:top-4 xl:left-4 xl:h-[calc(100vh-32px)] bg-container border border-border rounded-xl backdrop-blur-xs p-2 flex xl:flex-col xl:gap-1 justify-evenly xl:justify-start">
      <NavigationItem title="홈" href="/" icon={<Home size={20} />} />
      <NavigationItem
        title="과제"
        href="/task"
        icon={<ClipboardPenLine size={20} />}
      />
      <NavigationItem
        title="성과보고"
        href="/report"
        icon={<Scroll size={20} />}
      />
      <NavigationItem
        title="워크스페이스 정보"
        href="/workspace"
        icon={<UsersRound size={20} />}
      />
      <div className="flex-1 hidden xl:block" />
      <p className="text-xs big:text-base hidden xl:block">
        현재 워크스페이스: <CurrentWorkspace />
      </p>
      <CustomLink
        href="/choose-workspace"
        className="xl:w-full xl:bg-border rounded-lg px-2 xl:px-0 py-2 flex gap-1 items-center justify-center text-xs big:text-lg">
        <p className="hidden xl:block">워크스페이스 변경</p>
        <ArrowLeftRight size={20} />
      </CustomLink>
    </div>
  );
};

export default Sidebar;
