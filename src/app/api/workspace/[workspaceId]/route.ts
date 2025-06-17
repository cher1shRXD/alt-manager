import { deleteWorkspace, getWorkspace, updateWorkspace } from "@/services/workspaceService";
import { WorkspaceDTO } from "@/types/dto/WorkspaceDTO";
import { errorHandler } from "@/utilities/errorHandler";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string }> }) => {
  try{
    const { workspaceId } = await params;
    const workspace = await getWorkspace(workspaceId);

    return NextResponse.json({ workspace }, { status: 200 });
  }catch(e){
    return errorHandler(e as string);
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string }> }) => {
  try{
    const data: WorkspaceDTO = await req.json();
    const { workspaceId } = await params;
    const workspace = await updateWorkspace(data, workspaceId);

    return NextResponse.json({ workspace }, { status: 200 });
  }catch(e){
    return errorHandler(e as string);
  }
}

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string }> }) => {
  try{
    const { workspaceId } = await params;
    const workspace = await deleteWorkspace(workspaceId);

    return NextResponse.json({ workspace }, { status: 200 });
  }catch(e){
    return errorHandler(e as string);
  }
}