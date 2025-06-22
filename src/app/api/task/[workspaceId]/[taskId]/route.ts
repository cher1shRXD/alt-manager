import { deleteTask, getIsMentee, getTaskDetailMentees, getTaskDetailMentors, submitTask, updateTask } from "@/services/taskService";
import { TaskDTO } from "@/types/dto/TaskDTO";
import { ErrorResponse } from "@/types/ErrorResponse";
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
    console.log((e as ErrorResponse).message);
    return errorHandler((e as ErrorResponse).message);
  }
}

export const GET = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string, taskId: string }> }) => {
  try{
    const { workspaceId, taskId } = await params;

    const isMentee = await getIsMentee(parseInt(taskId));
    const task = isMentee ? await getTaskDetailMentees(workspaceId, parseInt(taskId)) : await getTaskDetailMentors(workspaceId, parseInt(taskId));

    return NextResponse.json({ task }, { status: 201 });
  }catch(e){
    return errorHandler((e as ErrorResponse).message);
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string, taskId: string }> }) => {
  try{
    const data: TaskDTO = await req.json();
    const { workspaceId, taskId } = await params;

    const task = await updateTask(workspaceId, parseInt(taskId), data);

    return NextResponse.json({ task }, { status: 201 });
  }catch(e){
    return errorHandler((e as ErrorResponse).message);
  }
}

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string, taskId: string }> }) => {
  try{
    const { workspaceId, taskId } = await params;

    const task = await deleteTask(workspaceId, parseInt(taskId));

    return NextResponse.json({ task }, { status: 201 });
  }catch(e){
    return errorHandler((e as ErrorResponse).message);
  }
}
