import { forbidden, notfound, unauthorized } from "@/constants/errorEnum";
import { createWorkspace } from "@/services/workspaceService"
import { WorkspaceDTO } from "@/types/dto/WorkspaceDTO";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try{
    const data: WorkspaceDTO = await req.json();
    const workspace = await createWorkspace(data);

    return NextResponse.json({ workspace }, { status: 201 });
  }catch(e){
    if(e === unauthorized) {
      return NextResponse.json({ message: unauthorized }, { status: 401 });
    }else if (e === notfound) {
      return NextResponse.json({ message: notfound }, { status: 404 });
    }else if (e === forbidden) {
      return NextResponse.json({ message: forbidden }, { status: 403 });
    }

    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}