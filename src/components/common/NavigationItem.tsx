"use client";

import { NavigationItemProps } from "@/types/props/NavigationItemProps"
import CustomLink from "./CustomLink"
import { usePathname } from "next/navigation";

const NavigationItem = ({ href, icon, title }: NavigationItemProps) => {
  const pathname = usePathname();

  return (
    <CustomLink href={href} className={`w-full flex gap-2 items-center transition-all p-2 rounded-lg ${ pathname === href ? "bg-primary": "hover:bg-container" }`}>
      {icon}
      <p>{title}</p>
    </CustomLink>
  )
}

export default NavigationItem