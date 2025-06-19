import { submitTask } from "@/services/taskService";
import { SubmittedFile } from "@/types/SubmittedFile";
import { errorHandler } from "@/utilities/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: Promise<{ taskId: string }> }) => {
  try{
    const data: SubmittedFile[] = await req.json();
    const { taskId } = await params;

    const taskSubmission = await submitTask(parseInt(taskId), data);

    return NextResponse.json({ taskSubmission }, { status: 201 });
  }catch(e){
    return errorHandler(e as string);
  }
}

