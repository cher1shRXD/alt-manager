import { PropsWithChildren, Suspense } from "react"

const TaskCreateLayout = ({ children }: PropsWithChildren) => {
  return (
    <Suspense>{children}</Suspense>
  )
}

export default TaskCreateLayout