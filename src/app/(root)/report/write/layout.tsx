import { PropsWithChildren, Suspense } from "react"

const ReportWriteLayout = ({ children }: PropsWithChildren) => {
  return (
    <Suspense>{children}</Suspense>
  )
}

export default ReportWriteLayout