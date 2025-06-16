import { redirect } from "next/navigation";

const Report = async ({ searchParams }: SearchParamProps) => {
  const keyword = await searchParams;

  if(!keyword.workspace) {
    redirect("/choose-workspace");
  }
  return (
    <div>Report</div>
  )
}

export default Report