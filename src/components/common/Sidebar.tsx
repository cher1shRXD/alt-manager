import { ClipboardPenLine, Home, MessageCircle, Scroll, UsersRound } from "lucide-react"
import NavigationItem from "./NavigationItem"

const Sidebar = () => {
  return (
    <div className="w-[var(--sidebar-width)] fixed top-4 left-4 h-[calc(100vh-32px)] bg-container border border-border rounded-xl backdrop-blur-xs p-2">
      <div className="w-full flex flex-col gap-1 text-sm">
        <NavigationItem title="홈" href="/" icon={<Home size={20} />} />
        <NavigationItem title="채팅" href="/chat" icon={<MessageCircle size={20} />} />
        <NavigationItem title="과제" href="/task" icon={<ClipboardPenLine size={20} />} />
        <NavigationItem title="성과 보고" href="/report" icon={<Scroll size={20} />} />
        <NavigationItem title="동아리 관리" href="/club" icon={<UsersRound size={20} />} />
      </div>
    </div>
  )
}

export default Sidebar