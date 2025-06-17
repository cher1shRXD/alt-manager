import { notfound } from "@/constants/errorEnum";
import { joinWorkspace } from "@/services/workspaceService";
import { forbidden, unauthorized } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try{
    const { workspaceId } = await req.json();
    const workspace = await joinWorkspace(workspaceId);

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