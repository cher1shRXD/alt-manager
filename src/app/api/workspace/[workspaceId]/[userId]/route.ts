import { removeMemberFromWorkspace, transferWorkspaceAdmin } from "@/services/workspaceService";
import { ErrorResponse } from "@/types/ErrorResponse";
import { errorHandler } from "@/utilities/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string, userId: string }> }) => {
  try{
    const { workspaceId, userId } = await params;

    const workspace = await removeMemberFromWorkspace(workspaceId, userId);

    return NextResponse.json({ workspace }, { status: 200 });
  }catch(e){
    return errorHandler((e as ErrorResponse).message);
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string, userId: string }> }) => {
  try{
    const { workspaceId, userId } = await params;

    const workspace = await transferWorkspaceAdmin(workspaceId, userId);
    return NextResponse.json({ workspace }, { status: 200 });
  }catch(e){
    return errorHandler((e as ErrorResponse).message);
  }
}