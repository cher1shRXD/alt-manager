import { PropsWithChildren, Suspense } from "react"

const ConfirmLayout = ({ children }: PropsWithChildren) => {
  return (
    <Suspense>{children}</Suspense>
  )
}

export default ConfirmLayout