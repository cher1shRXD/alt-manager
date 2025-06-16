import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { ReactNode } from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="w-full pl-[calc(var(--sidebar-width)+32px)] pt-3 px-4 flex flex-col gap-4 items-center">
      <Header />
      <Sidebar />
      <div className="w-full max-w-300 pt-4">{children}</div>
    </div>
  )
}

export default MainLayout