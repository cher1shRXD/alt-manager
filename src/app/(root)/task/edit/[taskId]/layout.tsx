import { PropsWithChildren, Suspense } from "react"

const TaskEditLayout = ({ children }: PropsWithChildren) => {
  return (
    <Suspense>{children}</Suspense>
  )
}

export default TaskEditLayout