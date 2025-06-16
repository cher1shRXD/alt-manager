import { notfound, unauthorized } from "@/constants/errorEnum";
import { createWorkspace } from "@/services/workspaceService"
import { CreateWorkspaceDTO } from "@/types/dto/CreateWorkspaceDTO";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: CreateWorkspaceDTO = await req.json();
  console.log(data);

  try{
    const workspace = await createWorkspace(data);

    return NextResponse.json({ workspace }, { status: 201 });
  }catch(e){
    if(e === unauthorized) {
      return NextResponse.json({ message: unauthorized }, { status: 401 });
    }else if (e === notfound) {
      return NextResponse.json({ message: notfound }, { status: 404 });
    }

    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}