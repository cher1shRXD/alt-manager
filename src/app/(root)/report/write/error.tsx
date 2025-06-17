"use client"

import GoBack from "@/components/common/GoBack"
import { parseError } from "@/utilities/parseError"

const error = ({ error }: { error: Error }) => {
  return (
    <div className="w-full py-20 text-center text-2xl flex flex-col items-center justify-center gap-4">
      {parseError(error.message)}
      <GoBack />
    </div>
  )
}

export default error