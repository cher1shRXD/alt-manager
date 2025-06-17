"use client"

import { useCustomRouter } from "@/hooks/useCustomRouter"

const GoBack = () => {
  const router = useCustomRouter();

  return (
    <button className="px-3 py-2 border border-border bg-container rounded-lg cursor-pointer text-sm" onClick={router.back}>이전으로</button>
  )
}

export default GoBack