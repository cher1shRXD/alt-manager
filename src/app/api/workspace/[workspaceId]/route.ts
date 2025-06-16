import { forbidden, notfound } from "@/constants/errorEnum";
import { deleteWorkspace, getWorkspace, updateWorkspace } from "@/services/workspaceService";
import { WorkspaceDTO } from "@/types/dto/WorkspaceDTO";
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
    }else if (e === forbidden) {
      return NextResponse.json({ message: forbidden }, { status: 403 });
    }

    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string }> }) => {
  try{
    const data: WorkspaceDTO = await req.json();
    const { workspaceId } = await params;
    const workspace = await updateWorkspace(data, workspaceId);

    return NextResponse.json({ workspace }, { status: 200 });
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

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ workspaceId: string }> }) => {
  try{
    const { workspaceId } = await params;
    const workspace = await deleteWorkspace(workspaceId);

    return NextResponse.json({ workspace }, { status: 200 });
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