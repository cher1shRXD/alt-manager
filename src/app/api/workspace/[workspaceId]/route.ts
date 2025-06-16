import { notfound } from "@/constants/errorEnum";
import { getWorkspace } from "@/services/workspaceService";
import { unauthorized } from "next/navigation";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string }> }) => {
  try{
    const { workspaceId } = await params;
    const workspace = await getWorkspace(workspaceId);

    return NextResponse.json({ workspace }, { status: 200 });
  }catch(e){
    if(e === unauthorized) {
      return NextResponse.json({ message: unauthorized }, { status: 401 });
    }else if (e === notfound) {
      return NextResponse.json({ message: notfound }, { status: 404 });
    }

    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}