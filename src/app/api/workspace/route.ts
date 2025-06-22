import { createWorkspace } from "@/services/workspaceService"
import { WorkspaceDTO } from "@/types/dto/WorkspaceDTO";
import { ErrorResponse } from "@/types/ErrorResponse";
import { errorHandler } from "@/utilities/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try{
    const data: WorkspaceDTO = await req.json();
    const workspace = await createWorkspace(data);

    return NextResponse.json({ workspace }, { status: 201 });
  }catch(e){
    return errorHandler((e as ErrorResponse).message);
  }
}