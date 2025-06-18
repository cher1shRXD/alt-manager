"use client"

import { useGetWorkspace } from "@/hooks/workspace/useGetWorkspace";
import { useSearchParams } from "next/navigation"

const CurrentWorkspace = () => {
  const searchParams = useSearchParams();
  const workspace = useGetWorkspace(searchParams.get("workspace") as string | null);

  if(searchParams.get("workspace")) return (
    <span className="font-black text-sm big:text-xl">{workspace?.name}</span>
  )
}

export default CurrentWorkspace