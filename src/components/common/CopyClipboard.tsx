"use client"

import { useClipboard } from "@/hooks/useClipboard"
import { CopyClipboardProps } from "@/types/props/CopyClipboardProps"
import { Clipboard } from "lucide-react"

const CopyClipboard = ({ text }: CopyClipboardProps) => {
  const { copy } = useClipboard();

  return (
    <Clipboard className="absolute right-2 top-7.5 cursor-pointer text-gray-500" size={18} onClick={() => copy(text)} />
  )
}

export default CopyClipboard