"use client"

import { useGetWorkspace } from "@/hooks/workspace/useGetWorkspace";
import { useSearchParams } from "next/navigation"

const CurrentWorkspace = () => {
  const searchParams = useSearchParams();
  const workspaceName = useGetWorkspace(searchParams.get("workspace") as string | null);

  if(searchParams.get("workspace")) return (
    <span className="font-black text-sm">{workspaceName}</span>
  )
}

export default CurrentWorkspace