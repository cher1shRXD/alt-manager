"use client";

import { NavigationItemProps } from "@/types/props/NavigationItemProps"
import CustomLink from "./CustomLink"
import { usePathname, useSearchParams } from "next/navigation";

const NavigationItem = ({ href, icon, title }: NavigationItemProps) => {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const currentParams = searchParams.toString();

  return (
    <CustomLink href={`${href}/?${currentParams}`} className={`w-full flex gap-2 items-center transition-all p-2 rounded-lg ${ (href === "/" ? pathname === href : pathname.includes(href)) ? "bg-primary": "hover:bg-container" } big:text-lg`}>
      {icon}
      <p>{title}</p>
    </CustomLink>
  )
}

export default NavigationItem