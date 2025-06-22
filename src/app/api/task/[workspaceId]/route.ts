import { createTask } from "@/services/taskService";
import { TaskDTO } from "@/types/dto/TaskDTO";
import { errorHandler } from "@/utilities/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string }> }) => {
  try{
    const data: TaskDTO = await req.json();
    const { workspaceId } = await params;

    const task = await createTask(workspaceId, data);

    return NextResponse.json({ task }, { status: 201 });
  }catch(e){
    console.log(e);
    return errorHandler(e as string)
  }
}