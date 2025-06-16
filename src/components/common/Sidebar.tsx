import { ArrowLeftRight, ClipboardPenLine, Home, Scroll, UsersRound } from "lucide-react"
import NavigationItem from "./NavigationItem"
import CustomLink from "./CustomLink"
import { isSessionExist } from "@/utilities/isSessionExist"
import { redirect } from "next/navigation"
import CurrentWorkspace from "../CurrentWorkspace"

const Sidebar = async () => {
  const session = await isSessionExist();

  if(!session) {
    redirect("/login");
  }

  return (
    <div className="w-[var(--sidebar-width)] fixed top-4 left-4 h-[calc(100vh-32px)] bg-container border border-border rounded-xl backdrop-blur-xs p-2 flex flex-col gap-1">
      <div className="w-full flex flex-col gap-1 text-sm">
        <NavigationItem title="홈" href="/" icon={<Home size={20} />} />
        <NavigationItem title="과제" href="/task" icon={<ClipboardPenLine size={20} />} />
        <NavigationItem title="성과 보고" href="/report" icon={<Scroll size={20} />} />
        <NavigationItem title="워크스페이스 정보" href="/workspace" icon={<UsersRound size={20} />} />
      </div>
      <div className="flex-1" />
      <p className="text-xs">현재 워크스페이스: <CurrentWorkspace /></p>
      <CustomLink href="/choose-workspace" className="w-full bg-border rounded-lg py-2 flex gap-1 items-center justify-center text-xs">워크스페이스 변경 <ArrowLeftRight size={16} /></CustomLink>
    </div>
  )
}

export default Sidebar