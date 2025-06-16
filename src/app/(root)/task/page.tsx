import { redirect } from "next/navigation";

const Task = async ({ searchParams }: SearchParamProps) => {
  const keyword = await searchParams;

  if(!keyword.workspace) {
    redirect("/choose-workspace");
  }

  return (
    <div>Task</div>
  )
}

export default Task