import { joinWorkspace } from "@/services/workspaceService";
import { ErrorResponse } from "@/types/ErrorResponse";
import { errorHandler } from "@/utilities/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try{
    const { workspaceId } = await req.json();
    const workspace = await joinWorkspace(workspaceId);

    return NextResponse.json({ workspace }, { status: 201 });
  }catch(e){
    return errorHandler((e as ErrorResponse).message);
  }
}